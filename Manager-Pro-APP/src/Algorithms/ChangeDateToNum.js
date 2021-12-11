import React from "react";

//Note the date will come in the form of mm/dd/yyyy
//this is recieving properly formated dates, and converts that date into the number of days from 00/00/0000 to 
//the passed date, used to compare dates easier
function ChangeDateToNum(date){
    
    let month = 0
    let day = 0
    let year = 0
    const monthDaysList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

      let toAddMonth = ""
      let toAddDay = ""
      let toAddYear = ""
    for(let i = 0; i < date.length; i++){
      
      if(i < 2){
        toAddMonth = toAddMonth + date[i]
      }
      else if(i > 2 && i < 5){
        toAddDay = toAddDay + date[i]
      }
      else if(i > 5){
        toAddYear = toAddYear + date[i]
      }
  
    }
    
    month = parseInt(toAddMonth)
    day = parseInt(toAddDay)
    year = parseInt(toAddYear) 

    let monthNum = 0
    
    year = (year * 365)

    //add every month before the month
    for(let i = 0; i < month-1; i++){
      monthNum = monthNum + monthDaysList[i]
    }

  let num = monthNum + day + year
  return(
    num
  )
    
  }
  export default ChangeDateToNum