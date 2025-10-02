import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/'

const login = async (username, password) => {
  try{
    const response = await axios.post(baseUrl+'login', { username, password })
    return response.data
  }catch(err){
    if(err.status === 401){
      throw new Error('invalid username or password')
    }

  }

}

export default { login }