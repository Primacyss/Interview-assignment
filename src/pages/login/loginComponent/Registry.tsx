
import { Button, Form, Input, message } from 'antd';
import request from '../../../utils/request'


const Registry = () => {

    const onFinish = (values: { usename: string, password: string, password1: string }) => {
        console.log('Success:', values);
        request.post('/api/login', values).then(res => {
            if (res.data.code === 202) {
                message.success('注册成功')
                localStorage.setItem('user', JSON.stringify(res.data.user))
            } else {
                message.error('该账户已存在')
            }
        })
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/500c1180a96859e5c54a5359f024a397.svg" alt="" className='login_img2' />
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="账&emsp;&emsp;号"
                    name="username"
                    hasFeedback
                    rules={[{ required: true, message: '请输入账户' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="密&emsp;&emsp;码"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码',
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password1"
                    label="确认密码"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: '请再次确认密码',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次输入的密码不一样'));
                            },
                        }),
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        注册
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default Registry