import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/blogs';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const addBlog = async (blogObj) => {
    const item = await window.localStorage.getItem('user');
    const user = JSON.parse(item);
    if (user.token) {
        try {
            const request = await axios.post(baseUrl, blogObj, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            return request.data;
        } catch (err) {
            throw new Error('Invalid inputs');
        }
    } else {
        console.log('No token');
    }
};

const removeBlog = async (id, user) => {
    if (user.token) {
        try {
            const request = await axios.delete(baseUrl + '/' + id, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            return request;
        } catch (err) {
            throw new Error('Invalid inputs');
        }
    }
};

const likeBlog = async (id, likes) => {
    const item = await window.localStorage.getItem('user');
    const user = JSON.parse(item);
    if (user.token) {
        try {
            const request = await axios.put(
                baseUrl + '/' + id,
                { likes: likes + 1 },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                },
            );
            return request.data;
        } catch (err) {
            throw new Error('Invalid inputs');
        }
    } else {
        console.log('No token');
    }
};

export default { getAll, addBlog, likeBlog, removeBlog };
