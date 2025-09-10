import axios from "axios"
const baseUrl = "/api/persons/"

const getAll = () => {
    return axios.get(baseUrl)
    .then(res => res.data)
}

const addPerson = (name, number) => {
    const personObject = {
    "name": name,
    "number": number
    }
    return axios.post(baseUrl, personObject)
    .then(res => res.data)
}

const editNumber = (id, newObject) => {
    return axios.put(baseUrl + id, newObject)
    .then(res => res.data)
}

const deletePerson = (id) => {
    return axios.delete(baseUrl+ "delete/" + id)
    .then(res => res.data)
}

export default {getAll, addPerson, deletePerson, editNumber}