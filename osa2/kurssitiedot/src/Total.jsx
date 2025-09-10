const Total = (props) => {
    const initial = 0
    return <p>Number of exercises {props.parts.reduce((prev, curr) =>  prev + curr.exercises, initial)}</p>
}

export default Total