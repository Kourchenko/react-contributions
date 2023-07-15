import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import HasuraTable from './HasuraTable';

import { Tooltip, Layout, Menu, Card, Table, Row, Col, Avatar, Divider, Dropdown, Menu as AntMenu } from 'antd';

import {
    FileAddTwoTone,
    DeleteTwoTone,
    MessageTwoTone,
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined
} from '@ant-design/icons';
import UserBadges from './UserBadges';

const { Header, Content, Sider } = Layout;


const App = () => {
    const { REACT_APP_HASURA_ADMIN_SECRET } = process.env;
    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);
    const [stats, setStats] = useState([]);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 2500);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    'https://charming.hasura.app/v1/graphql',
                    {
                        query: `
                            query {
                                commits(order_by: {github_author_date: desc}) {
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
                            }`,
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
        };

        const fetchUserStats = async () => {
            try {
                const response = await axios.post(
                    'https://charming.hasura.app/v1/graphql',
                    {
                        query: `
                            query {
                                user_stats {
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
    }, []);

    const icons = [
        {
            id: 1,
            type: 'CrownTwoTone',
            title: 'King of the Castle',
            color: '#f5222d',
        },
        {
            id: 2,
            type: 'DeleteTwoTone',
            title: "Are you sure you didn't need that?",
            color: '#73d13d',
        },
        {
            id: 3,
            type: 'MessageTwoTone',
            title: "Write it down now, forget later.",
            color: '#4096ff',
        }
    ];

    const numberWithCommas = (x) => {
        if (!x) return 0;
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
                                        <Avatar src={user.github_avatar_url} size={64} icon={<UserOutlined />} style={{ marginRight: '16px' }} />
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
                                    <Divider />
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
