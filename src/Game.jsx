import { useState } from 'react'
import Tablero from './componentes/Tablero'
import './style/game.css'
function Game() {

  return (
    <div className="game">
      <h1 className="text">Batalla Navals</h1>
      <div className="button-p-2">
      </div>
      <Tablero />
    </div>
  );
}
export default Game
