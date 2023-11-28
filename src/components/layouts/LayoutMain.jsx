import React from "react";
import "./style.css"

const LayoutMain = ({ children }) => {
    return (
        <div className="main">
            <div className="row" style={{ width: '100%' }}>
                <div className="navbar col-2">
                    
                </div>
                <div className="content col-10">
                 {children}
                </div>
            </div>
    </div>
    )
};

export default LayoutMain;
