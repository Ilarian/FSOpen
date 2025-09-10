const Content = (props) => {

    return (
        <>
        {props.parts.map((part) => {
            return <Part key={part.id} part={part.name} exercises={part.exercises} />
            })
        }
        </>
    )
}

const Part = (props) => {
    return <p>{props.part} {props.exercises}</p>
}

/*
<Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
<Part part={props.parts[1].name} exercises={props.parts[1].exercises}/>
<Part part={props.parts[2].name} exercises={props.parts[2].exercises}/>
*/

export default Content