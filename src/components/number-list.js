import React from "react"
import ListItem from "./list-item"

export default (props) => {
    const listItems = props.data.map((node) => {
        return <ListItem 
                 key={node.id}
                 value={node.country} /> 
    })

    return (
        <ul>
            {listItems}
        </ul>
    )
}
