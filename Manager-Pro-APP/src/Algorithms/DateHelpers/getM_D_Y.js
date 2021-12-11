//Destructure a passed date mm/dd/yyyy into its month, day and year
//M_D_Y has "m", "d", "y"
function getM_D_Y(M_D_Y, date){
    if(M_D_Y === "m"){
        return parseInt(date.substring(0,date.indexOf("/")))
    }
    else if(M_D_Y === "d"){
        let stringDay = date
        stringDay = stringDay.substring(date.indexOf("/")+1)
        return parseInt(stringDay.substring(0,date.indexOf("/") ))
    }
    else{
        let stringYear = date
        stringYear = stringYear.substring(date.indexOf("/")+1)
        return parseInt(stringYear.substring(stringYear.indexOf("/")+1))
    }
    
}
export default getM_D_Y