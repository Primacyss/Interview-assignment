import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Button, Modal, Form, Input, Select, message } from 'antd';
import { RootDispatch } from '../utils/type';
import { addData, EditData } from '../../src/store/actions'
const { Option } = Select;

type Props = {}

const My_modal = ({ isModalOpen, handleOk, handleCancel, Title, EditState, datas }: any) => {
    const [forms] = Form.useForm()
    const dispatch: RootDispatch = useDispatch()
    useEffect(() => {
        if (Title === '编辑') {
            forms.setFieldsValue({ ...EditState })
        } else {
            forms.setFieldsValue({
                name: '',
                classify: '',
                price: ''
            })
        }
    }, [EditState])

    const onFinish = (values: any) => {
        if (EditState.id) {
            values.id = EditState.id
            dispatch(EditData(values))
            message.success('编辑成功');
        } else {
            let num = ''
            //生成随机id
            for (var i = 0; i < 18; i++) { num += Math.floor(Math.random() * 10); }
            values.id = num
            dispatch(addData(values))
            message.success('新增成功');
        }
        handleCancel()
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Modal title={Title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                keyboard
                footer={null}
            >
                <Form
                    form={forms}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"

                >
                    <Form.Item
                        label="药品名称"
                        name="name"
                        rules={[{ required: true, message: '不能为空!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="药品价格"
                        name="price"
                        rules={[{ required: true, message: '不能为空!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="药品分类"
                        name="classify"
                        rules={[{ required: true, message: '不能为空!' }]}
                    >
                        <Select
                            placeholder="选择药品分类"
                            allowClear
                        >
                            <Option value="中药">中药</Option>
                            <Option value="西药">西药</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default My_modal