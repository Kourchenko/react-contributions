import React from 'react';
import { Button, Typography, Row, Col, Divider } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const LandingPage = ({ onLogin }) => {

    return (
        <div style={{ padding: '50px' }}>
            <Row justify="center" align="middle" style={{ height: '80vh' }}>
                <Col span={24}>
                    <div style={{ textAlign: 'center' }}>
                        <Title level={2}>Welcome to GitHub Contributions</Title>
                        <Title level={3}>A place to view your contributions.</Title>
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ textAlign: 'center' }}>
                        <Button
                            type="primary"
                            icon={<GoogleOutlined />}
                            size="large"
                            block
                            onClick={() => onLogin()}
                        >
                            Sign in with Google
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default LandingPage;