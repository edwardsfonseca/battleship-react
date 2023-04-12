import React from 'react'

function Casilla({ status, handleClick }) {
    let className = "cell";
    if (status === 1) {
        className += " ship";
    } else if (status === 2) {
        className += " hit";
    } else if (status === 3) {
        className += " miss";
    }
    return <div className={className} onClick={handleClick}>2</div>;
}

export default Casilla