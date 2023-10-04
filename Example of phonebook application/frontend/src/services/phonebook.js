/* eslint-disable import/no-anonymous-default-export */
import axios from "axios"
const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const del = (person) => {
    return axios.delete(`${baseUrl}/`+ person)
}

export default {
    getAll,
    create,
    update,
    del
}