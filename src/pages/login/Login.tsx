import { Tabs } from 'antd';
import LoginView from './loginComponent/LoginView';
import Registry from './loginComponent/Registry';
type Props = {}
const Login = (props: Props) => {

    return (
        <div className='login'>

            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="登录" key="1">
                    <LoginView ></LoginView>
                </Tabs.TabPane>
                <Tabs.TabPane tab="注册" key="2">
                    <Registry></Registry>
                </Tabs.TabPane>
            </Tabs>


        </div>
    )
}

export default Login