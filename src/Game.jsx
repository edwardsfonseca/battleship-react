import { useState } from 'react'
import Tablero from './componentes/Tablero'
import './style/game.css'
function Game() {
  function updateStyles() {
    const button = document.getElementById("myButton");
    const player2 = document.querySelectorAll(".game2");
    for (let i = 0; i < player2.length; i++) {

      if (player2[i].style.display = "none") {
        player2[i].style.display = "unset"

      } else {
        player2[i].style.display = "none"
      }

      return true;
    }
    button.addEventListener("click", updateStyles);
  }

  return (
    <div className="game">
      <h1 className="text">Batalla Navals</h1>
      <div className="button-p-2">

        <button id="myButton1" className="contador " style={{ "--clr": "#1e9bff" }} type="button" onClick={updateStyles} ><span><i></i>Juega con Otro jugador</span></button></div>

      <Tablero />
      <div className="game2" style={{ "display": "none" }}>
        <Tablero />
      </div>


    </div>
  );
}

export default Game
