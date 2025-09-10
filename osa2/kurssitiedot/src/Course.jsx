import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = (props) => {
    const course = props.course
return (
    <>
        <Header name={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts}></Total>
    </>
)
}
export default Course