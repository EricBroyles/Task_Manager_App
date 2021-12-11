import React,{useState} from "react";

function Task(props){
    return(
        <div className = "CSS_Task">
            <h4>Priority: {props.tags}</h4>
            <h4>{props.nameAssignment}</h4>
            <hr/>
            <h4>Details: {props.nameClass}</h4>
            <h4>Due: {props.date}</h4>
            <h5 style ={{fontSize:"10px"}}>{props.taskID}</h5>
                    
        </div>
    )
           
}
export default Task

