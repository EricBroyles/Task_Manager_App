import getM_D_Y from "./DateHelpers/getM_D_Y"
import DateToString from "./DateHelpers/DateToString"


//incDec contains either: "increase" or "decrease"
//viewType has "month", "week", "task"
//help APP change the date passed into View
function IncDecView(incDec, viewType, date){


    let month = getM_D_Y("m",date)
    let year = getM_D_Y("y",date)
    

    //returns a new date properly formatted
    const handleIncrView = () => {
        let newM = ""
        let newD = ""
        let newY = DateToString(year, "year")
        if(viewType === "month"){
            newD = "01"
            if(month === 12){
                newM = "01"
                newY = DateToString(year+1, "year")
            }
            else{
                newM = DateToString(month+1, "month")
            }
            return newM + "/" + newD + "/" + newY
        }
    }
    const handleDecrView = () => {
        let newM = ""
        let newD = ""
        let newY = DateToString(year, "year")
        if(viewType === "month"){
            newD = "01"
            if(month === 1){
                newM = "12"
                newY = DateToString(year-1, "year")
            }
            else{
                newM = DateToString(month-1, "month")
            }
            return newM + "/" + newD + "/" + newY
        }
    }
    //RETURN
    if(viewType === "task"){
        return(date) //no changes to the date can be made in task view
    }else if(incDec === "increase"){
        return(handleIncrView()) //returns a new date properly formatted
    }else{
        return(handleDecrView()) //returns a new date properly formatted
    }
}



export default IncDecView






  