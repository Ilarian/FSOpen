import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
    name: 'NOTIFICATION',
    initialState,
    reducers:{
        setNotification(state, action){
            return action.payload
        }
    }
})

export const {setNotification} = notificationSlice.actions

export const setNotif = (content, timer) => {
    return async dispatch => {
        dispatch(setNotification({content: content, timer: timer}))
    }
} 

export default notificationSlice.reducer