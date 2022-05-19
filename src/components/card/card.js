import React from "react";
import "./card.css"

const card=({details}) =>{
    return (
        <>
            
            <div className="card" >
                <div className="card-image">
                    <img src="https://foodeiz.com/wp-content/uploads/2021/05/Food-Of-Andhra-Pradesh-2.jpg"/>
                    
                </div>
                <div>
                    {details.res_name && <>
                    <p className="card-title">{details.res_name}</p>
                    <p className="description">
                        {details.res_location}
                    </p></> }
                    {details.attr_name && <>
                    <p className="card-title">{details.attr_name}</p><p className="description">
                        {details.attr_loc}
                    </p></> }
                </div>
            </div>
            
        </>
    );
    

}



export default card;