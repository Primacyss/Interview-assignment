import request from "../utils/request";
import { Dispatch } from "redux";
import { ListItem } from "../utils/type";

//获取数据
export const getList = () => {
    return (dispatch: Dispatch) => {
        request.get('/api/list').then(res => {
            dispatch({
                type: 'GET_LIST',
                payload: res.data.list
            })
        })
    }
}
//新增
export const addData = (values: ListItem) => {
    return {
        type: 'ADD_LIST',
        payload: values
    }

}
//编辑
export const EditData = (values: ListItem) => {
    return {
        type: 'EDIT_LIST',
        payload: values
    }
}
//删除
export const DeleteDatas = (id: string) => {
    return {
        type: 'DELETE_LIST',
        payload: id
    }
}

