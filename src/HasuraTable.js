import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import axios from 'axios';

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

    return <Table
        dataSource={props.data}
        columns={columns}
        rowKey={(record) => record.id}
        scroll={{ x: true }}
    />;
};

export default HasuraTable;
