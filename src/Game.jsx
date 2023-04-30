import { useState } from 'react'
import Tablero from './componentes/Tablero'
import './style/game.css'
function Game() {

  return (
    <div className="game">
      
      <div className="button-p-2">
      </div>
      <Tablero />
    </div>
  );
}
export default Game
