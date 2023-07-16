import React from 'react';
import { Button, Typography, Row, Col, Card, Collapse, Avatar, Progress, Divider, Tag } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Panel } = Collapse;

const LandingPage = ({ onLogin }) => {


    const data = [
        {
            id: 1,
            name: 'John Doe',
            title: 'Software Engineer',
            progressBlue: 15,
            progressGreen: 75,
            contributions: [
                {
                    id: 1,
                    title: 'Top 5 Commentor'
                },
                {
                    id: 2,
                    title: 'Bug Buster'
                },
                {
                    id: 3,
                    title: 'Testing Whiz'
                }
            ]
        },
        {
            id: 2,
            name: 'Jane Smith',
            title: 'Frontend Developer',
            progressBlue: 25,
            progressGreen: 80,
            contributions: [
                {
                    id: 1,
                    title: 'Code Ninja'
                },
                {
                    id: 2,
                    title: 'Top 10 CSS Sorcerer'
                },
                {
                    id: 3,
                    title: 'Speed Runner'
                }
            ]
        },
        {
            id: 3,
            name: 'Alice Johnson',
            title: 'UX Designer',
            progressBlue: 80,
            progressGreen: 55,
            contributions: [
                {
                    id: 1,
                    title: 'Top 5 CSS Sorcerer'
                },
                {
                    id: 2,
                    title: 'Feature Master'
                },
                {
                    id: 3,
                    title: 'Speed Runner'
                }
            ]
        },
        {
            id: 4,
            name: 'Michael Brown',
            title: 'Data Analyst',
            progressBlue: 80,
            progressGreen: 10,
            contributions: [
                {
                    id: 1,
                    title: 'Top 5% Commentor'
                },
                {
                    id: 2,
                    title: 'Analytics Whiz'
                },
                {
                    id: 3,
                    title: 'Speed Runner'
                }
            ]
        },
        {
            id: 5,
            name: 'Emily Wilson',
            title: 'Project Manager',
            progressBlue: 60,
            progressGreen: 60,
            contributions: [
                {
                    id: 1,
                    title: 'Top 5 Error Terminator'
                },
                {
                    id: 2,
                    title: 'Documentation Guru'
                },
                {
                    id: 3,
                    title: 'Error Terminator'
                }
            ]
        },
        {
            id: 6,
            name: 'David Miller',
            title: 'Software Engineer',
            progressBlue: 40,
            progressGreen: 35,
            contributions: [
                {
                    id: 1,
                    title: 'Top 5 Commentor'
                },
                {
                    id: 2,
                    title: 'Most Active'
                },
                {
                    id: 3,
                    title: 'Speed Runner'
                }
            ]
        },
        {
            id: 7,
            name: 'Olivia Martinez',
            title: 'UI Designer',
            progressBlue: 90,
            progressGreen: 85,
            contributions: [
                {
                    id: 1,
                    title: 'Top 5 Repository Owner'
                },
                {
                    id: 2,
                    title: 'Leaderboard Topper'
                },
                {
                    id: 3,
                    title: 'Speed Runner'
                }
            ]
        },
        {
            id: 8,
            name: 'William Davis',
            title: 'Backend Developer',
            progressBlue: 75,
            progressGreen: 45,
            contributions: [
                {
                    id: 1,
                    title: 'Top 5% Commentor'
                },
                {
                    id: 2,
                    title: 'Top 10 Fastest PR Merge'
                },
                {
                    id: 3,
                    title: '1 Million Commits Club'
                }
            ]
        },
        {
            id: 9,
            name: 'Sophia Thompson',
            title: 'Product Manager',
            progressBlue: 70,
            progressGreen: 20,
            contributions: [
                {
                    id: 1,
                    title: 'Top 5 Commentor'
                },
                {
                    id: 2,
                    title: 'Idea Generator'
                },
                {
                    id: 3,
                    title: '1,000 PRs Reviewed'
                }
            ]
        },
        {
            id: 10,
            name: 'Daniel Anderson',
            title: 'QA Engineer',
            progressBlue: 50,
            progressGreen: 65,
            contributions: [
                {
                    id: 1,
                    title: 'Top 5% Commentor'
                },
                {
                    id: 2,
                    title: 'Most Active'
                },
                {
                    id: 3,
                    title: 'Speed Runner'
                }
            ]
        },
        {
            id: 11,
            name: 'Ava White',
            title: 'Software Engineer',
            progressBlue: 30,
            progressGreen: 90,
            contributions: [
                {
                    id: 1,
                    title: 'Testing Whiz'
                },
                {
                    id: 2,
                    title: 'Top 1% Solved Issues'
                },
                {
                    id: 3,
                    title: 'Top 5% Reviewer'
                }
            ]
        },
        {
            id: 12,
            name: 'James Harris',
            title: 'Frontend Developer',
            progressBlue: 85,
            progressGreen: 40,
            contributions: [
                {
                    id: 1,
                    title: 'Idea Generator'
                },
                {
                    id: 2,
                    title: 'Feature Master'
                },
                {
                    id: 3,
                    title: 'Most CSS Changes'
                }
            ]
        }
    ];

    return (
        <div style={{ padding: '12px' }}>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={24} lg={24} xl={12} style={{ padding: '12px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Title level={1}>Welcome to Contributions</Title>
                        <Title level={3}>A place to view your Git Contributions</Title>
                        <Divider />
                        <Button
                            type="primary"
                            icon={<GoogleOutlined />}
                            size="large"
                            onClick={() => onLogin()}>
                            Login with Google
                        </Button>
                    </div>
                </Col>
                <Col xs={24} md={24} lg={24} xl={12} style={{ padding: '12px' }}>
                    <Row gutter={[16, 16]}>
                        <Divider orientation="left">Contributors</Divider>
                        {data.map((item) => (
                            <Col key={item.id} xs={24} md={12}>
                                <Card hoverable='true' style={{ paddingLeft: '2px', paddingRight: '2px', height: '100%' }}>
                                    <Card.Meta
                                        avatar={<Avatar>{item.name.charAt(0).toUpperCase()}</Avatar>}
                                        title={item.name}
                                        description={
                                            <>
                                                <div>{item.title}</div>
                                                <Progress percent={item.progressBlue} status="active" showInfo={false} />
                                                <Progress percent={item.progressGreen} strokeColor="#52c41a" showInfo={false} />
                                                <Collapse ghost bordered={true}>
                                                    <Panel header="Top Contributions" key="1">
                                                        {item.contributions.map((contribution) => (
                                                            <>
                                                                <Tag key={item}>
                                                                    <Typography.Text key={contribution.id} strong>{contribution.title}</Typography.Text>
                                                                </Tag>
                                                            </>
                                                        ))}
                                                    </Panel>
                                                </Collapse>
                                            </>
                                        }
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </div>
    );
};


export default LandingPage;