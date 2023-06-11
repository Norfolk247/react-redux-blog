import axios from "axios";

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    method: "get"
})

export const getAllPosts = async () => {
    try {
        const {data} = await instance.get('posts')
        return data ?? []
    } catch (e) {
        console.log(e.message)
        return []
    }
}
export const getPostComments = async (id) => {
    try {
        const {data} = await instance.get(`posts/${id}/comments`)
        return data ?? []
    } catch (e) {
        console.log(e.message)
        return []
    }
}
export const getUser = async (id) => {
    try {
        const {data} = await instance.get(`users/${id}`)
        return data ?? {}
    } catch (e) {
        console.log(e.message)
        return {}
    }
}