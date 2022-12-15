
import { useEffect, useState } from 'react'
import { userInfo } from '../../utils/type'
import useLogin from '../../utils/useLogin'
import { useNavigate } from 'react-router-dom'

type Props = {}

const HomePage = (props: Props) => {
    const navigate = useNavigate()
    const [token] = useLogin()
    const [values, setValues] = useState<userInfo>({})
    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
        setValues(JSON.parse(localStorage.getItem('value') ? localStorage.getItem('value') : {} as any))
    }, [])
    return (
        <div>
            {
                <h1 >您好，{values.row === 2 ? `尊敬的${values.username}管理员` : `亲爱的${values.username}访客`}</h1>
            }


        </div>
    )
}

export default HomePage

