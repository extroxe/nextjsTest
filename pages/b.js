import React, {useState, useReducer, useContext, useEffect} from "react"
import MyContext from "../lib/my-context"

const countReducer = (state, action) => {
    switch (action.type) {
        case "add":
            return state + 1
        case "minus":
            return state - 1
        default:
            return state
    }
}

const MyCount = () => {
    // const [count, setCount] = useState(0)
    const [counts, dispatchCounts] = useReducer(countReducer, 0)
    const context = useContext(MyContext)
    useEffect(() => {
        console.log(context)
        /*const count = setInterval(() => {
            dispatchCounts({type: "add"})
        }, 1000)*/
        return () => {
            if (count) {
                clearInterval(count)
            }
        }
    })
    return <div>b</div>
}

export default MyCount