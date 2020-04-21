import React from 'react'
import loader from "./loader.gif"
export default () => {
    return (
        <div>
            <img className="img img-fluid" style={{display:"block", margin:"auto", width:"20%" }} src={loader} alt="Loading..."/>
        </div>
    )
}
