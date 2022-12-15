import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Space, Table, Button, message, Popconfirm, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { read, utils, writeFileXLSX } from 'xlsx'
import type { ColumnsType } from 'antd/es/table';
import {
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { getList, DeleteDatas } from '../../store/actions';
import { ListItem, RootDispatch, States, userInfo } from '../../utils/type';
import My_modal from '../../component/My_modal'

const Index: React.FC = () => {
    const columns: ColumnsType<ListItem> = [
        {
            title: '药品编号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '药品名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '药品价格',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '药品分类',
            dataIndex: 'classify',
            key: 'classify',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => EditData(record)}><EditOutlined />编辑</Button>
                    <Popconfirm
                        title="确认删除嘛？"
                        onConfirm={() => DeleteData(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger><DeleteOutlined />删除</Button>
                    </Popconfirm>

                </Space>
            ),
        },
    ];
    const dispatch: RootDispatch = useDispatch()
    useEffect(() => {
        dispatch(getList())
    }, [dispatch])
    useEffect(() => {
        setUserInfo(JSON.parse(localStorage.getItem('value') ? localStorage.getItem('value') : [] as any))
    }, [])
    const data = useSelector((state: States) => state.data)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [EditState, setEditState] = useState({})
    const [Title, setTitle] = useState('')
    const [userInfo, setUserInfo] = useState<userInfo>({})
    const [fileList, setFileList] = useState([])
    const [uploading, setUploading] = useState(false)
    const handleUpload = () => {
        if (userInfo.row === 2) {
            setUploading(true)
            let reader = new FileReader();
            reader.readAsArrayBuffer(fileList[0]);
            reader.onload = (e: any) => {
                let workbook = read(e.target.result);
                let sheet = workbook.Sheets[workbook.SheetNames[0]];
                let arr = utils.sheet_to_json(sheet, { defval: '' });
                let newArr = arr.map((item: any) => {
                    delete item.__EMPTY
                    return item
                })
                setTimeout(() => {
                    message.success('导入成功！');
                    console.log(newArr);
                    setUploading(false)
                    setFileList([])
                    localStorage.setItem('data', JSON.stringify([...newArr.map((item, index) => ({ ...item, key: index }))]))
                    window.location.reload()
                }, 5000);
            };
        } else {
            message.error('访客无权限')
        }
    };

    const handleExport = () => {
        if (userInfo.row === 2) {
            let workbook = utils.book_new();
            let workSheet = utils.json_to_sheet(data.map((item: any) => {
                delete item.key
                return item
            }));
            utils.book_append_sheet(workbook, workSheet, 'table1')
            writeFileXLSX(workbook, '药品列表.xlsx', {
                Props: {
                    Title: "hel",
                    //@ts-ignore
                    CreatedDate: Date.now()
                }
            })
        } else {
            message.error('访客无权限')
        }

    }

    const props: UploadProps = {
        //@ts-ignore
        onRemove: (file: never) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            return {
                fileList: newFileList,
            };
        },
        beforeUpload: (file: any) => {
            let arr = file.name.split('.');
            if (arr[arr.length - 1] === 'xlsx') {
                //@ts-ignore
                setFileList([file])
            } else {
                message.warning("请选择正确的文件");

            }
            return false;
        },
        fileList,
        maxCount: 1,
    };



    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    //新增
    const addData = () => {
        if (userInfo.row === 2) {
            setIsModalOpen(true);
            setEditState({})
            setTitle('新增')
        } else {
            message.error('访客无权限')
        }

    }
    //编辑
    const EditData = (value: ListItem) => {
        if (userInfo.row === 2) {
            setIsModalOpen(true);
            setEditState(value)
            setTitle('编辑')
        } else {
            message.error('访客无权限')
        }
    }
    //删除
    const DeleteData = (id: string) => {
        if (userInfo.row === 2) {
            dispatch(DeleteDatas(id))
            message.success('删除成功');
        } else {
            message.error('访客无权限')
        }

    }
    const my_son = {
        isModalOpen,
        handleOk,
        handleCancel,
        EditState,
        Title,
        data

    }
    return (
        <div>
            <Upload {...props} disabled={uploading}>
                <Button icon={<UploadOutlined />} disabled={uploading} >Excel</Button>
            </Upload>
            <div className='boxs'>
                <div>
                    <Button onClick={handleExport}>导出</Button>
                    <Button
                        type="primary"
                        onClick={handleUpload}
                        disabled={fileList.length === 0}
                        loading={uploading}
                        style={{ marginTop: 16 }}
                    >
                        {uploading ? '正在导入...' : '开始导入'}
                    </Button>
                </div>
                <div >
                    <Button type="primary" onClick={addData}>+ 新增</Button>
                </div>
            </div>

            <Table columns={columns} dataSource={data} />
            <My_modal {...my_son} />
        </div>
    )
}

export default Index