import { useEffect, useState } from "react";
import { USER_LOGIN } from "../../queries";
import { useMutation } from "@apollo/client/react";

const Login = (props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, result] = useMutation(USER_LOGIN, {
        onError: (error) => {
            console.log(error)
        }
    })

    const flexStyle = {
        display: "flex",
        flexDirection: "column",
        width: "200px"
    };

    useEffect(() => {
        if(result.data){
            const token = result.data.login.value
            console.log(token)
            props.setToken(token)
            localStorage.setItem('user-token', token)
            props.setPage('authors')
        }
    }, [result.data])

    if(!props.show){
        return null
    }

    const handleLogin = (e) => {
        e.preventDefault()
        console.log(username, password)
        login({variables: {username, password}})
    }

    return(
        <form style={flexStyle} onSubmit={(e) => handleLogin(e)}>
            <label>username:<input onChange={(e) => setUsername(e.target.value)}></input></label>
            <label>password:<input onChange={(e) => setPassword(e.target.value)}type="password"></input></label>
            <button type="submit">Login</button>
        </form>
    )
}

export default Login