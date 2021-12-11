import React, { useState, useEffect } from "react";
import getM_D_Y from "../Algorithms/DateHelpers/getM_D_Y";
import DateToString from "../Algorithms/DateHelpers/DateToString";


const monthDaysList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

//Props - taskList = the list of Tasks date = some passed date to format around viewType = "month" or "week"
//taskList: {keyVal: unique #, id: 1, nameAssignment: "", nameClass: "", inputDate: "mm/dd/yyyy", actualDate: -1, tags: ""}
function View(props){
    //needs a day index, a task index and the value to set it to, line-through
    const [updateLine, setUpdateLine] = useState({day: null, task: null})

    //Functionality
    //this will be used to make the table from viewList for either a month viewType or a week
    //tableType: "month", "week"
    //viewList: 2D array of day Lists contianing task objects, where the 1st obj is just the date for that day
    const makeTable = (tableType, viewList) => {
            //viewList has a list of 35 days, each day has a list of objects
            //each row has 7 days, and each <td> has <h5> of all the objects in that day
        return(
            <div>
                <table>
                    <tr>
                        <th>Sunday</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                    </tr>
                    {assembleTableRow(viewList, 1)}
                    {assembleTableRow(viewList, 2)}
                    {assembleTableRow(viewList, 3)}
                    {assembleTableRow(viewList, 4)}
                    {assembleTableRow(viewList, 5)}
                </table>
            </div>
        )
    }
    //viewList is just the 2D array of stuff
    //rowNum: 1 to 5, index is to be lessthan rowNum * 7 but greater than rowNum-1 * 7
    //this will return one row of viewList in table format based on the given rowNum
    const assembleTableRow = (viewList, rowNum) => {
        return(
            <tr>
            {viewList.map((day, index) => {
                if(index >= (rowNum-1) *7 && index < rowNum * 7){
                    return(
                        <td>
                        {day.map((task, i) => {
                            if(i === 0){
                                return <p> {task.date} </p>
                            }else{
                                return(
                                    <div 
                                        className = "view-task-wrapper" 
                                        onClick = {() => (setPopupInfo({openPopup: true, openEdit:false, day: index, task: i}))
                                    }>
                                        <p>
                                            {task.nameClass} {task.nameAssignment}
                                                <br/>
                                            Priority: {task.tags}
                                        </p>
                                    </div>
                                )
                            }
                        })}
                        </td>
                    )
                }
            })}
            </tr>
        )
    }

    //gets passed dataList with all the items in it, and the viewList with its initial dates set to the
    //corresponding indexes
    //checks if an item in dataList has a date matching one in viewList, if so it assigns it
    const populateViewList = (dataList, viewList) => {

        //if I know the month or m+1 and the year or year+1 that can elimate some/most
        //if month and year match bingo
        //if day within range, month correct, and year correct then bingo its a relevant task
        //make list of only relevant tasks
        
        let properM = getM_D_Y("m",viewList[0][0].date)
        let properY = getM_D_Y("y", viewList[0][0].date)
        
        dataList.map((item) => {
            let m = getM_D_Y("m", item.date)
            let y = getM_D_Y("y", item.date)
            let d = getM_D_Y("d", item.date)
            if(m === properM && y === properY){
                let placeIndex = d-1
                viewList[placeIndex].push(item)
            }else if(properM === 12 && m === 1 && y === properY+1 && d <= daysBeyondMonth(viewList[0][0].date)){
                let placeIndex = monthDaysList[properM -1] + d -1
                viewList[placeIndex].push(item)
            }else if(m === properM +1 && d <= daysBeyondMonth(viewList[0][0].date)){
                let placeIndex = monthDaysList[properM -1] + d -1
                viewList[placeIndex].push(item)
            }
        })
    }
    //set each of the 35 day lists in viewList with an obj containing that indexes appropriate date
    const initializeViewList = (passedDate) => {
        let specKeyVal = -1 //only gets more negetive and only used for these initial dates given to dataList
            
        let newList = new Array(36)
        for(var i = 0; i< newList.length; i++){
            newList[i] = new Array(1)
        }
        
        //d = i+1 in the following loop
        let m = getM_D_Y("m", passedDate)
        let y = getM_D_Y("y", passedDate)

        //1. add dates for the dates in the m 
        for(var i = 0; i < 35; i++){
            let d = i+1
            let dateToAssign = DateToString(m, "month") + "/" + DateToString(d, "day") + "/" + DateToString(y, "year")
            let nextDateToAssign;
            if(m === 12){
                nextDateToAssign = DateToString(1, "month") + "/" + DateToString(1+(i-monthDaysList[m-1]), "day") + "/" +DateToString(y+1, "year")
            }else{
                nextDateToAssign = DateToString(m+1, "month") + "/" + DateToString(1+(i-monthDaysList[m-1]), "day") + "/" +DateToString(y, "year")
            }
            if(i < monthDaysList[m-1]){
                newList[i][0] = {
                    keyVal: specKeyVal, 
                    nameAssignment: "", 
                    nameClass: "", 
                    date: dateToAssign, 
                    tags: ""
                }
                specKeyVal = specKeyVal -1
            }else{
                //2. add dates for the dates beyond m taking into acount month change, and possible year change
                newList[i][0] = {
                    keyVal: specKeyVal, 
                    nameAssignment: "", 
                    nameClass: "", 
                    date: nextDateToAssign, 
                    tags: ""
                }
                specKeyVal = specKeyVal -1
            }
        }
        return newList
    }

    //takes the taskList and puts the important apects of each obj and saves them in new array
    //removes the id, actualDate, and changes the name of input date to date from the passed list which sould be taskList from props
    const reformatTaskList = (theTaskList) => {
        let newList = []
            theTaskList.forEach(element => {
                newList.push({
                        keyVal: element.keyVal, 
                        nameAssignment: element.nameAssignment, 
                        nameClass: element.nameClass, 
                        date: element.inputDate, 
                        tags: element.tags
                })
            })
        return newList
    } 

    //Each month that is display will contain 35 days, so there will be some days displayed in the next month
    //this returns the number of days that will be displaed in the next month
    const daysBeyondMonth = (date) => {
        let m = getM_D_Y("m",date)
        return(35 - monthDaysList[m-1])
    }
    
    //RENDERING
    //should never have to use props in the code
    let viewType = props.viewType
    let passedDate = props.date
    //dataList: keyVal: unique #, nameAssignment: "", nameClass: "", date: "00/00/000", tags: ""
    let dataList = reformatTaskList(props.taskList)

    // 2D array of 35 day list, each day is a list of obj where each object is from dataList
    //each object is a task containing keyVal, nameAssignment, nameClass, date, tags
    //keyVal is negetive and gets more negetive for the initializedViewList containing only dates
    let viewList = initializeViewList(passedDate)
    populateViewList(dataList, viewList)
    


    //Interactions
    const [popUpInfo, setPopupInfo] = useState({openPopup: false, openEdit: false, day: 0, task: 0})
    const [editedTaskDetails, setEditedTaskDetails] = useState({nameAssignment: "", nameClass: ""})
    const [updatedList, setUpdatedList] = useState(dataList)

    const makePopup = () => {
        if(popUpInfo.openPopup){
            return(
                <div className = "popup">
                    <button onClick = {() => (setPopupInfo({openPopup: false,openEdit: false, day: 0, task: 0}))}>X</button>
                    <h3>Task Details: </h3>
                    <hr></hr>
                    <h4>Due: {viewList[popUpInfo.day][[popUpInfo.task]].date}</h4>
                    <h4>{viewList[popUpInfo.day][[popUpInfo.task]].nameAssignment} {viewList[popUpInfo.day][[popUpInfo.task]].nameClass}</h4>
                    <h5>{viewList[popUpInfo.day][[popUpInfo.task]].tags}
                    <hr></hr> 
                    </h5>
                    {handleEdits()}
                    <h5>
                        <button onClick = {() => setPopupInfo({openPopup: true,openEdit: !(popUpInfo.openEdit), day: popUpInfo.day, task: popUpInfo.task})}> EDIT</button> 
                        <button onClick = {() => setUpdateLine({day: popUpInfo.day, task: popUpInfo.task})}>Complete Task</button>
                    </h5>
                </div>
            )
        }
        else{
            return(<div></div>)
        }
    }
    const handleEdits = () => {
        if(popUpInfo.openEdit){
            return(
                <div>
                    <input id="AssignmentTextInput" placeholder="Name of Assignment" onChange={handleInputs}/>
                    <input id="ClassTextInput" placeholder="Name of Class" onChange={handleInputs}/>
                </div>
            )
        }else{
            return(<div></div>)
        }
    }
    const handleInputs = (e) => {
        if(e.target.id === "AssignmentTextInput"){
            setEditedTaskDetails({nameAssignment: e.target.value, nameClass: editedTaskDetails.nameClass})
        }else if(e.target.id === "ClassTextInput"){
            setEditedTaskDetails({nameAssignment: editedTaskDetails.nameAssignment, nameClass: e.target.value})
        }
    }

    //RENDER RETURN
    if(viewType === "month"){
        return(
            <div>
                {makeTable(viewType, viewList)}
                {makePopup()}
                <div style={{textDecorationLine: 'none', textDecorationStyle: 'solid'}}>
                    <h5>{editedTaskDetails.nameAssignment} {editedTaskDetails.nameClass}</h5>
                    <h5>Day: {popUpInfo.day} Task: {popUpInfo.task}</h5>
                    <h5>Date: {props.date}</h5>
                </div> 
            </div>
        )
    }else{
        return(<div></div>) 
    }
}
export default View;