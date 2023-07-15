import React from 'react';
import { Table, Tag, Empty } from 'antd';

const HasuraTable = (props) => {
    const columns = [
        {
            title: 'Message',
            dataIndex: 'github_message',
            key: 'github_message',
            width: 200
        },
        {
            title: 'Date',
            dataIndex: 'github_author_date',
            key: 'github_author_date',
            width: 100,
            render: (item) => (
                <Tag color='green' key={item}>
                    {item}
                </Tag>
            ),
        },
        {
            title: 'Stats Total',
            dataIndex: 'github_stats_total',
            key: 'github_stats_total',
            width: 100,
            render: (item) => (
                <Tag color='geekblue' key={item}>
                    {item}
                </Tag>
            ),
        },
        {
            title: 'Repository',
            dataIndex: ['repository', 'full_name'],
            key: 'repository.full_name',
            width: 200,
            render: (item) => (
                <Tag color='green' key={item}>
                    {item}
                </Tag>
            ),
        }
    ];

    const customLocale = {
        emptyText: 'Your email must match your GitHub email. Please make sure your email is linked to your GitHub account.', // Customize the empty text message
    };

    if (props.data.length === 0) {
        return (<Empty description="Your email must match your GitHub email. Please make sure your email is linked to your GitHub account." />);
    }
    return <Table
        dataSource={props.data}
        columns={columns}
        rowKey={(record) => record.id}
        scroll={{ x: true }}
        locale={customLocale}
    />;
};

export default HasuraTable;
