
//num: some integer, example - 1 in day or month become 01, 12 in year becomes 0012
    //IMPORTANT: this CAN be passed properly formated dates and return them again in the proper form
    //type: "day", "month", "year"

function DateToString(num, type){
    let dateString = ""
    if(type === "day" || type === "month"){
        if(num < 10){
            dateString = "0" + num
        }else{
            dateString = "" + num
        }
    }else{
        if(num < 10){
            dateString = "000" + num
        }else if(num < 100){
            dateString = "00" + num
        }else if(num < 1000){
            dateString = "0" + num
        }else{
            dateString = num
        }
    }
    return dateString
}

export default DateToString