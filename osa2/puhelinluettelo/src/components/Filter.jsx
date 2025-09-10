const Filter = (props) => {
    const {filter, handler} = props
 return (
    <p>
        filter shown with <input value={filter} onChange={handler}></input>
    </p>
 )
}

export default Filter