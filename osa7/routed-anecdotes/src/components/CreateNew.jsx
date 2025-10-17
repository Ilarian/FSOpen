import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

export const CreateNew = (props) => {
    /* const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [info, setInfo] = useState('') */

    const content = useField('text')
    const author = useField('text')
    const info = useField('text')

    const fields = [content, author, info]

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.input.value,
            author: author.input.value,
            info: info.input.value,
            votes: 0
        })
        navigate('/')
        props.showNotification(`a new anecdote: "${content.value}" created!`)
    }

    const clear = (e) => {
        e.preventDefault()
        fields.forEach(f => f.reset())
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input name='content' {...content.input} />
                </div>
                <div>
                    author
                    <input name='author' {...author.input} />
                </div>
                <div>
                    url for more info
                    <input name='info' {...info.input} />
                </div>
                <button>create</button>
                <button onClick={clear}>reset</button>
            </form>
        </div>
    )

}
