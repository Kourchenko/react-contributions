import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

import HasuraTable from './components/HasuraTable';

import { Tooltip, Layout, Menu, Card, Row, Col, Avatar, Divider } from 'antd';

import {
    CrownTwoTone,
    FileAddTwoTone,
    DeleteTwoTone,
    MessageTwoTone,
    UserOutlined
} from '@ant-design/icons';
import LandingPage from './pages/LandingPage';

const { Content, Sider } = Layout;

const App = () => {
    const { REACT_APP_HASURA_ADMIN_SECRET } = process.env;
    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);
    const [stats, setStats] = useState([]);
    const [avatarClickCount, setAvatarClickCount] = useState(0);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 2500);
    const [googleUser, setGoogleUser] = useState(null);
    const [googleProfile, setGoogleProfile] = useState(null);

    useEffect(() => {

        const fetchGoogleProfile = async (googleUser) => {
            if (googleUser) {
                axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${googleUser.access_token}`,
                        Accept: 'application/json'
                    }
                })
                    .then((res) => {
                        setGoogleProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        };

        const fetchData = async () => {
            if (googleProfile) {
                try {
                    const query = `
                query {
                    commits(where: {user: {email: {_eq: "${googleProfile.email}"}}}, order_by: {github_author_date: desc}) {
                        id,
                        github_message,
                        github_author_date,
                        github_stats_total
                        repository {
                            full_name
                        }
                        user {
                            name,
                            github_avatar_url
                        }
                    }
                }`;

                    const response = await axios.post(
                        'https://charming.hasura.app/v1/graphql',
                        {
                            query: query,
                        },
                        {
                            headers: {
                                'x-hasura-admin-secret': REACT_APP_HASURA_ADMIN_SECRET
                            },
                        }
                    );

                    setData(response.data.data.commits);
                    setUser(response.data.data.commits[0].user);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        const fetchUserStats = async () => {
            try {
                const response = await axios.post(
                    'https://charming.hasura.app/v1/graphql',
                    {
                        query: `
                            query {
                                user_stats(where: {user: {email: {_eq: "${googleProfile.email}"}}}) {
                                    github_stats_additions_total,
                                    github_stats_deletions_total,
                                    github_stats_total_total,
                                    github_comment_count_total
                                }
                            }`,
                    },
                    {
                        headers: {
                            'x-hasura-admin-secret': REACT_APP_HASURA_ADMIN_SECRET,
                        },
                    }
                );

                setStats(response.data.data.user_stats[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (!googleProfile) {
            fetchGoogleProfile(googleUser);
        } else {
            fetchData();
            fetchUserStats();

            const handleResize = () => {
                setIsSmallScreen(window.innerWidth < 768);
            };

            handleResize(); // Check initial screen size

            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [googleUser, googleProfile]);

    const numberWithCommas = (x) => {
        if (!x) return 0;
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setGoogleUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    const logOut = () => {
        googleLogout();
        setGoogleProfile(null);
    };

    if (!googleUser) {
        return (<LandingPage onLogin={() => login()} />)
    }

    return (

        <Layout style={{ minHeight: '100vh' }}>
            {!isSmallScreen && (
                <Sider width={200} theme="light" collapsible={true} defaultCollapsed={true} collapsedWidth={80}>
                    <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            You
                        </Menu.Item>
                        {/* <Menu.Item key="2" icon={<LaptopOutlined />}>
                            Leaderboard
                        </Menu.Item>
                        <Menu.Item key="3" icon={<NotificationOutlined />}>
                            Notifications
                        </Menu.Item> */}
                    </Menu>
                </Sider>
            )}
            <Layout>
                <Content style={{ margin: '2px' }}>
                    <div style={{ padding: '2px', background: '#fff', minHeight: 360 }}>
                        <Row justify="center" align="right" style={{ height: '100%' }}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Card title="User Profile" style={{ height: '100%' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Tooltip title={user.name}>
                                            <Avatar src={user.github_avatar_url} size={64} icon={<UserOutlined />} style={{ marginRight: '16px' }} onClick={() => setAvatarClickCount(avatarClickCount + 1)} />
                                        </Tooltip>
                                        <div>
                                            <div className="icon-container">
                                                <div className="icon-item bounce">
                                                    <Tooltip title={`${numberWithCommas(stats.github_stats_additions_total)} Lines Added`}>
                                                        <FileAddTwoTone twoToneColor='#52c41a' />
                                                    </Tooltip>
                                                </div>
                                                <div className="icon-item bounce">
                                                    <Tooltip title={`${numberWithCommas(stats.github_stats_deletions_total)} Lines Removed`}>
                                                        <DeleteTwoTone twoToneColor='#eb2f96' />
                                                    </Tooltip>
                                                </div>
                                                <div className="icon-item bounce">
                                                    <Tooltip title={`${numberWithCommas(stats.github_comment_count_total)} Commits`}>
                                                        <MessageTwoTone />
                                                    </Tooltip>
                                                </div>
                                            </div>
                                            <div>{user.name}</div>
                                            <div>Software Developer Engineer II</div>
                                        </div>
                                    </div>
                                    <Divider orientation="left">Badges</Divider>

                                    <div className="icon-container">
                                        <div className="icon-item bounce">
                                            <Tooltip title="King of the Castle">
                                                <CrownTwoTone twoToneColor='#faad14' />
                                            </Tooltip>
                                        </div>
                                        <div className="icon-item bounce">
                                            <Tooltip title="Are you sure you didn't need that?">
                                                <DeleteTwoTone twoToneColor='#faad14' />
                                            </Tooltip>
                                        </div>
                                        <div className="icon-item bounce">
                                            <Tooltip title="Write it down now, forget later.">
                                                <MessageTwoTone twoToneColor="#faad14" />
                                            </Tooltip>
                                        </div>
                                    </div>

                                    <Divider orientation="left">Commit History</Divider>
                                    <HasuraTable data={data} isSmallScreen={isSmallScreen} />
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Content>
            </Layout>
        </Layout >
    );
};

export default App;
