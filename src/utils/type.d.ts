import store from "../store";


export type RootDispatch = typeof store.dispatch


export type States = {
    data: Array<ListItem>
}

export type ListItem = {
    id: string,
    name: string,
    price: string,
    clssify: string
}
export type userInfo = {
    username?: string,
    password?: string,
    row?: number
}