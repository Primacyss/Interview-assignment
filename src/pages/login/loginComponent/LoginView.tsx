import { useEffect, useState } from 'react'
import { Button, Form, Input, message } from 'antd';
import request from '../../../utils/request'
import { useNavigate } from 'react-router-dom'
import { userInfo } from '../../../utils/type';
type Props = {}
const LoginView = (props: Props) => {
    const [usre, setUser] = useState([])
    useEffect(() => {
        localStorage.setItem('value', JSON.stringify({}))
        setUser(JSON.parse(localStorage.getItem('user') ? localStorage.getItem('user') : [] as any))
    }, [])
    const navigate = useNavigate()
    const onFinish = (values: { username: string, password: string }) => {
        console.log('Success:', values);
        request.post('/api/login', values).then(res => {
            switch (res.data.code) {
                case 200:
                    localStorage.setItem('token', res.data.token)
                    res.data.user.forEach((item: userInfo, index: number) => {
                        if (item.username === values.username) {
                            if (JSON.parse(localStorage.getItem('value') ? localStorage.getItem('value') : {} as any).username !== values.username) {
                                usre?.forEach((item: userInfo) => {
                                    if (item.username === values.username) {
                                        localStorage.setItem('value', JSON.stringify(item))
                                    }
                                });
                            }
                        }
                    })
                    message.success('登录成功')
                    navigate('/home/homes')
                    break;
                case 201:
                    message.error('账户或密码错误')
                    break;
            }
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <img src="	https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/ad7fa76844a2df5c03151ead0ce65ea6.svg" alt="" className='login_img' />
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
                    rules={[{ required: true, message: '请输入你的账号' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密&emsp;&emsp;码"
                    name="password"
                    rules={[{ required: true, message: '请输入你的密码' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default LoginView