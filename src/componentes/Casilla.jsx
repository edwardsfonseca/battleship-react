import React from 'react'
import '../style/casilla.css'
function Casilla({ status, handleClick }) {
    let className = "cell";
    if (status === 1) {
        className += " ship";
    } else if (status === 2) {
        className += " hit";
    } else if (status === 3) {
        className += " miss";
    }
    return <div className={className} onClick={handleClick}></div>;
}

export default Casilla