
import { Space, Table, Button, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { userInfo } from '../../utils/type';
import { useEffect, useState } from 'react';

type Props = {}

const Row = (props: Props) => {
    const [dataList, setDataList] = useState()
    useEffect(() => {
        setDataList(JSON.parse(localStorage.getItem('user') ? localStorage.getItem('user') : [] as any))
    }, [])
    const data = dataList ? dataList : []
    const columns: ColumnsType<userInfo> = [
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '身份',
            dataIndex: 'row',
            key: 'row',
            render: (_, record) => (
                <Space size="middle">
                    <Tag color={record.row === 2 ? "volcano" : 'green'}>{record.row === 2 ? "管理员" : '访客'}</Tag>
                </Space >
            ),
        },

        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => EditData(record)}><EditOutlined />设为管理员</Button>
                    <Button type="primary" danger onClick={() => DeleteData(record)}><DeleteOutlined />设为访客</Button>
                </Space >
            ),
        },
    ];


    //设为管理员
    const EditData = async (value: userInfo) => {
        data.forEach((item: userInfo, index: number) => {
            if (item.username === value.username) {
                item.row = 2
                if (JSON.parse(localStorage.getItem('value') ? localStorage.getItem('value') : {} as any).username === value.username) {
                    localStorage.setItem('value', JSON.stringify(item))
                }
            }
        })
        localStorage.setItem('user', JSON.stringify(data))
        await setDataList(JSON.parse(localStorage.getItem('user') ? localStorage.getItem('user') : [] as any))

    }
    //设为访客
    const DeleteData = async (value: userInfo) => {
        data.forEach((item: userInfo, index: number) => {
            if (item.username === value.username) {
                item.row = 1
                if (JSON.parse(localStorage.getItem('value') ? localStorage.getItem('value') : {} as any).username === value.username) {
                    localStorage.setItem('value', JSON.stringify(item))
                }
            }
        })
        localStorage.setItem('user', JSON.stringify(data))
        await setDataList(JSON.parse(localStorage.getItem('user') ? localStorage.getItem('user') : [] as any))
    }

    return (
        <div>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default Row