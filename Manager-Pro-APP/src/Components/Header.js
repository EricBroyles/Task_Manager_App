import React, {useState} from "react";

function Header(){
    
    return(
        <div className= "CSS_Header">
            <h3 className="CSS_Header_AppTitle">
                Task Manager 
                <div className = "CSS_Header_Btns">
                    <button className= "CSS_Header_SettingsBtn">Settings</button> 
                    <button className="CSS_Header_SignOutBtn">Sign Out</button> 
                 </div>
                
            </h3> 
            
        </div>
    )
}

export default Header 