import React, { useState, useEffect } from 'react'
import ChangeDateToNum from "./Algorithms/ChangeDateToNum"
import IncDecView from './Algorithms/IncDecView'
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import Task from "./Components/Task"
import Welcome from './Components/Welcome'
import View from './Components/View'
import getM_D_Y from "./Algorithms/DateHelpers/getM_D_Y";
import DateToString from "./Algorithms/DateHelpers/DateToString";
import './App.css';

import backgroundImage from "./Photos/backgroundImg.jpg"

function App() {
  const [textInputInfo, setTextInputInfo] = useState({btnCreateOrComplete: "Create",successMes: "", display: "hidden", displayTags: false})
  const [taskInfo, setTaskInfo] = useState({keyVal: 0, id: 1, nameAssignment: "", nameClass: "", inputDate: "00/00/0000", actualDate: -1, tags: ""})
  
  //this will toggle between Modify Task and Done
  const [modifyBtnInfo, setModifyBtnInfo] = useState("Modify Task")
  //this will hold the current task Selected by the user to be modified
  const [selectedTask, setSelectedTask] = useState({keyVal: 0, id: -1, nameAssignment: "", nameClass: "", inputDate: "00/00/0000", actualDate: -1, tags: ""})
  
  const [taskList, setTaskList] = useState([]) //The complete List of Tasks
  const [displayList, setDisplayList] = useState([]); //the List of Task that will be shown to the user
  const [sortType, setSortType] = useState("actualDate");

  //may have to change to a useState or may have to change to a let
  const current = new Date()
  const date =`${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`
  
  const [viewType, setViewType] = useState("month")


  const handleViewType = () => {
    if(viewType === "month"){
      setViewType("task")
    }
    else{
      setViewType("month")
    }
  }
  //runs the sort method on the display list, when the sort Type is changed
  //rens the sort method on the display list, when a task is added so when btnCreateOrComplete changes
  useEffect(() => {
    sortArray(sortType)
  }, [sortType, textInputInfo])
//id sorts from max to min, date sorts from max to min, and any letter based thing is min to max
  const sortArray = type => {
    const types = {id: "id", nameAssignment: "nameAssignment", nameClass: "nameClass", actualDate: "actualDate", tags: "tags"}
    const sortProperty = types[type]

    //checks to see if it is to sort alphabetically for either the name of the Assignment or the Name of the Class
    if(sortProperty === "nameAssignment" || sortProperty === "nameClass"){
      const sorted = [...taskList].sort((a,b) => {
        if(b[sortProperty] < a[sortProperty]){
          return 1
        }
        if(b[sortProperty] > a[sortProperty]){
          return -1
        }
        return 0
      })
      setDisplayList(sorted)
    }
    else if(sortProperty === "tags"){
      const sorted = [...taskList].sort((a,b) => {
        let aVal = sortHelperTags(a[sortProperty])
        let bVal = sortHelperTags(b[sortProperty])
        if(bVal < aVal){
          return 1
        }
        if(bVal > aVal){
          return -1
        }
        return 0
      })
      setDisplayList(sorted)
    }
    else{ //If the sortType is not to be sorted Alphabetically but numerically
      const sorted = [...taskList].sort((a, b) => b[sortProperty] - a[sortProperty])
      setDisplayList(sorted)
    }
  }
 //Urgent --4, High --3, Normal --2, Low--1
  const sortHelperTags = (tag) => {
    let num;
    if(tag === "Urgent"){
      num = 4
    }else if(tag === "High"){
      num =3
    }else if(tag === "Normal"){
      num =2 
    }else{
      num =1
    }
    return num
  }
  


  //this deals with the main create/add Tasks btn and if I modify task
  const handleChange = () => {
    //change the btn to Create or COmplete, set the success message, and display or hide the input items : Using textInputInfo
    if(textInputInfo.btnCreateOrComplete === "Create"){
      setTextInputInfo({btnCreateOrComplete: "Add",successMes: "Enter Task Information", display: "text", displayTags: true})
    }
    else{
      setTextInputInfo({btnCreateOrComplete: "Create", successMes: "Successfuly Created A Task", display: "hidden", displayTags: false})
      
      const prevID = taskInfo.id
      const prevKey = taskInfo.keyVal
      setTaskInfo({...taskInfo, id: prevID + 1, keyVal: prevKey + 1})
      setTaskList([...taskList, {
          keyVal: taskInfo.keyVal,
          id: taskInfo.id, 
          nameAssignment: taskInfo.nameAssignment, 
          nameClass: taskInfo.nameClass, 
          inputDate: taskInfo.inputDate, 
          actualDate: taskInfo.actualDate,
          tags: taskInfo.tags
        }])
      setDisplayList([...taskList, {
        keyVal: taskInfo.keyVal,
        id: taskInfo.id, 
        nameAssignment: taskInfo.nameAssignment, 
        nameClass: taskInfo.nameClass, 
        inputDate: taskInfo.inputDate, 
        actualDate: taskInfo.actualDate,
        tags: taskInfo.tags
      }])

    }  
  }
  //this deals with the text input regions
  const handleInputs = (e) => {
    if(e.target.id === "AssignmentTextInput"){
      setTaskInfo({...taskInfo, nameAssignment: e.target.value})
    }
    else if(e.target.id === "ClassTextInput"){
      setTaskInfo({...taskInfo, nameClass: e.target.value})
    }
    else if(e.target.id === "DateTextInput"){
      setTaskInfo({...taskInfo, inputDate: e.target.value, actualDate: ChangeDateToNum(e.target.value)})
       
    }
    
  }
  

  //task Editing btns functionality
  //need to make this btn have a toggle from modify task to done 
  const handleModifyTask = () => {
    
    if(modifyBtnInfo === "Modify Task"){
      setModifyBtnInfo("Done")
      setTextInputInfo({...textInputInfo, display: "text"}) //open the text inputs
    }
    else{
      setModifyBtnInfo("Modify Task")
      setTextInputInfo({...textInputInfo, display: "hidden"}) //close the test inputs
      const prevKey = taskInfo.keyVal
      const prevID = taskInfo.id
      
      setTaskInfo({...taskInfo, id: prevID +1, keyVal: prevKey + 1})

      const filteredList = taskList.filter((task) => task.id !== selectedTask.id)

      setTaskList([...filteredList, {
        keyVal: taskInfo.keyVal,  
        id: taskInfo.id, 
          nameAssignment: taskInfo.nameAssignment, 
          nameClass: taskInfo.nameClass, 
          inputDate: taskInfo.inputDate, 
          actualDate: taskInfo.actualDate,
          tags: taskInfo.tags
        }])
      setDisplayList([...filteredList, {
        keyVal: taskInfo.keyVal,
        id: taskInfo.id, 
        nameAssignment: taskInfo.nameAssignment, 
        nameClass: taskInfo.nameClass, 
        inputDate: taskInfo.inputDate, 
        actualDate: taskInfo.actualDate,
        tags: taskInfo.tags
      }])
    }
  }
  
  const handleDelete = () => {
    const filteredList = taskList.filter((task) => task.id !== selectedTask.id)

      setTaskList([...filteredList])
      setDisplayList([...filteredList])
  }



//this will only open the add or create Task btn given that the modify task Done option is not being displayed
  const createTaskBtnDisplay = () => {
  if(modifyBtnInfo !== "Done"){
    return(
      <div>
        <h4> <button onClick = {handleChange}>{textInputInfo.btnCreateOrComplete} Task</button> {textInputInfo.successMes}</h4>
      </div>
    )}
  }
  const displayTagsCreate = () =>{
    if(modifyBtnInfo !== "Done" && textInputInfo.displayTags)
    return(
      <div>
        <label>Tags: </label>
        <select onChange = {handleMakeTags}> 
          <option value="Urgent">Urgent</option>
          <option value="High">High</option>
          <option value ="Normal">Normal</option>
          <option value= "Low">Low</option>
        </select>
      </div>
    )
  }
  const taskBtnsDisplay = (ID) => {
    //if the ID of the given task being mapped over is the same as the selected task id then open up the btns
    if(ID === selectedTask.id)
    return(
      <div className = "CSS_TaskBtns">
        <button onClick={handleModifyTask}>{modifyBtnInfo}</button>
        <button className = "CSS_CloseBtn" onClick={handleDelete}>X</button> 
      </div> 
    )
  }
  const handleMakeTags = (e) => {
    setTaskInfo({...taskInfo, tags: e.target.value})
  }
  
  const makeTaskList = () => {
    if(viewType === "task"){
      return(
        <div className = "CSS_TaskList">
          {displayList.map((task) => (
            <div key={task.keyVal} onClick= {() => setSelectedTask({...task})}>
              {taskBtnsDisplay(task.id)}
              <Task 
                isComplete = {false}
                taskID = {task.id} 
                nameAssignment = {task.nameAssignment} 
                nameClass = {task.nameClass} 
                date = {task.inputDate}
                tags = {task.tags}
              />
            </div>
          ))}
        </div>
      )
    }else{
      return <div></div>
    }
  }



  
  const [displayDate, setDisplayDate] = useState((DateToString(getM_D_Y("m", date), "month") + "/" + DateToString(getM_D_Y("d",date), "day") + "/" + DateToString(getM_D_Y("y",date), "year")))

  return (
    <div className="CSS_App">
      <div className="CSS_HeaderRegion" style= {{backgroundImage: `url(${backgroundImage})`  }}> 
      <title>Task Manager</title>
      <Header/>
      <label>Sort By: </label>
      <select onChange={(e) => setSortType(e.target.value)}> 
        <option value="actualDate">Date</option>
        <option value="nameAssignment">Assignment</option>
        <option value="nameClass">Class</option>
        <option value = "tags">Priority</option>
        <option value ="id">id</option>
      </select>

      
      {createTaskBtnDisplay()}
      <input id="AssignmentTextInput" type={textInputInfo.display} placeholder="Name of Assignment" onChange={handleInputs}/>
      <input id="ClassTextInput" type={textInputInfo.display} placeholder="Name of Class" onChange={handleInputs}/>
      <input id="DateTextInput" type={textInputInfo.display} placeholder="mm/dd/yyyy" onChange={handleInputs}/>
      {displayTagsCreate()}
      
      <h3>
        View: <button onClick = {handleViewType}>{viewType}</button> 
        <button onClick = {() => setDisplayDate(IncDecView("decrease", viewType, displayDate))}>-</button>
        <button onClick = {() => setDisplayDate(IncDecView("increase", viewType, displayDate))}>+</button> 
      </h3>
      </div>
      
          {makeTaskList()}
          <View taskList = {taskList} date = {displayDate} viewType = {viewType}/>
          <Welcome/>
        <Footer/>
    </div>
  )
}
export default App;
