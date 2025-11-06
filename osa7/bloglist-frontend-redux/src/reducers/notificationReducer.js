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

export const setNotif = (content, timer = 3, error = false) => {
    return dispatch => {
        dispatch(setNotification({content: content, timer: timer, error: error}))
    }
} 

export default notificationSlice.reducer