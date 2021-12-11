import React, {useState} from "react";

function Welcome(){
const [openMessage,setOpenMessage] = useState(true)

const handleClick = () => {
    setOpenMessage(false)
}


if(openMessage){
    return(
        <div className = "CSS_Welcome">
            <h4>Welcome to Eric Broyles Task Manager App</h4>
            <p>
                To View a List of all added tasks and use the sort/filter methods, select the button labeled "month" to switch view modes
                <br/>
                Use: <br/>
                 * To Create A Task -- hit the button "Create Task" and add the appropriate info <br/>
                 * To Modify Task -- Create a Task, Click on the Task to open the edit menu, change details, hit done<br/>
                * TO Complete -- click on created task, hit the X <br/>
                * hit +/- buttons to change the month for the calendar
                Notice: Incomplete Feature <br/>
                   * Modify Task, and Complete Task in the Calender <br/>

                WARNING: date must be entered in the form 12/06/2021 not 12/6/2021 (00/00/0000)
            </p>
            <button onClick = {handleClick}>Okay</button>
        </div>
    )
}
else{
    return(
        <div></div>
    )
}

    
}

export default Welcome