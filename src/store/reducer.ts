import { ListItem } from "../utils/type"

const initialState = {
    data: []
}

export default (state = initialState, { type, payload }: any) => {
    let newState = JSON.parse(JSON.stringify(state))
    switch (type) {
        case "GET_LIST":
            const data = localStorage.getItem('data')
            newState.data = data ? JSON.parse(data) : payload
            localStorage.setItem('data', JSON.stringify(newState.data))
            return newState
        case "ADD_LIST":
            newState.data.push(payload)
            localStorage.setItem('data', JSON.stringify(newState.data))
            return newState
        case "EDIT_LIST":
            newState.data.forEach((item: ListItem, index: number) => {
                if (item.id === payload.id) {
                    newState.data[index] = {
                        ...payload
                    }
                }
            });
            localStorage.setItem('data', JSON.stringify(newState.data))
            return newState
        case "DELETE_LIST":
            newState.data.forEach((item: ListItem, index: number) => {
                if (item.id == payload) {
                    newState.data.splice(index, 1)
                }
            });
            localStorage.setItem('data', JSON.stringify(newState.data))
            return newState


        default:
            return newState
    }
}
