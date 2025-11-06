import { createSlice } from "@reduxjs/toolkit";
import {getUsers} from '../services/users'

const initialState = []

const usersSlice = createSlice({
    name: "USERS",
    initialState,
    reducers: {
        setUsers(state, action){
            return action.payload
        }
    }
})

export const {setUsers} = usersSlice.actions

export const initializeUsers = () => {
    return async (dispatch) => {
        const users = await getUsers()
        dispatch(setUsers(users))
    }
}

export default usersSlice.reducer