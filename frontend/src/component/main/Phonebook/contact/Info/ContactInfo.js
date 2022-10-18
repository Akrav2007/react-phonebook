import React from "react";
import './ContactInfo.css'
const ContactInfo=({showInfoPopup,children})=>{
    return(
        <section className="info-container">
            <div className="overlay">
            <div className="popup">
                {children}
                <button onClick={showInfoPopup}>x</button>
            </div>
            
        </div>
        </section>
        
    )
}
export default ContactInfo;