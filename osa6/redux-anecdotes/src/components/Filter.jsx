import { useDispatch } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const Filter = () => {

    const dispatch = useDispatch()

    const handleFilter = (event) => {
        dispatch(setFilter(event.target.value))
    }

    return (
        <div>
            <input placeholder="Filter" onChange={handleFilter}></input>
        </div>
    )

}

export default Filter