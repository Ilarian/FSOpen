import { createContext } from 'react'

const NotificationContext = createContext()

export const NotificationReducer = (state,action) => {
    switch(action.type){
        case 'MSG':
            return action.payload
        case 'NULL':
            return null
        default: 
            return state
    }
}

export default NotificationContext