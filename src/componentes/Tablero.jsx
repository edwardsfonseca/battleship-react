import React from 'react'
import { useState } from 'react'
import Casilla from './Casilla.jsx'

function Tablero() {
//-//-// Iniciamos con la funcion declarando su estado
const [gameBoard, setGameBoard] = useState(
    [[1,1,1,1,1,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0],
    [1,0,0,1,1,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,0,0,0,0,0,0]],
    generateRandomBoard());

// funcion fire
function fire(row, col) {
    let ships = document.querySelectorAll(".ship:not(.hit)");
    let newGameBoard = [...gameBoard];
    if (gameBoard[row][col] === 1) {
      newGameBoard[row][col] = 2; // Marcar como parte de un barco hundido
      // Actualizar la variable ships después de marcar una celda como parte de un barco hundido
      ships = document.querySelectorAll(".ship:not(.hit)");
      // Verificar si se ha hundido un barco
      if (ships.length -1 ===  0) {
        alert("¡Felicidades! ¡Has hundido todos los barcos!");
      }
    } else if (gameBoard[row][col] === 0) {
      alert("Tiro Errado")
      newGameBoard[row][col] = 3; // Marcar como un tiro fallido
    }
    setGameBoard(newGameBoard);
  }

  // funcion que genera aleatoriamente los barcos
  function generateRandomBoard() {
    const newBoard = [];
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        // Generar un número aleatorio entre 0 y 1
        const random = Math.floor(Math.random() *2);
        // el número es 1 y la celda no está ocupada, colocar un barco
        if (random === 0 && row.indexOf(1) === -1) {
          row.push(1); // lo devuelve a row con nuevo valor
        } else {
          row.push(0);// si lo de arriba no se cumple lo devuelve en 0
        }
      }
      newBoard.push(row); // aca actualizo la const newBoard con su nuevo valor row
    }
    return newBoard;
  }

  // Con esta llamamos a la funcion randon con su nuevo estado y la aplicamos a un boton
  function handleRandomClick() {
    setGameBoard(generateRandomBoard());
  } 
  let rows = [];
  for (let i = 0; i < 10; i++) {
    let cells = [];
    for (let j = 0; j < 10; j++) {
      cells.push(
        <Casilla
          key={`${i},${j}`}
          status={gameBoard[i][j]}
          handleClick={() => fire(i, j)}
        />
      );
    }
    rows.push(<div key={i} className="row">{cells}</div>);
  }
  return <><div className="board">{rows}
  
  </div>
  <div className='button-a'>
  <button className="contador "style={{"--clr":"#1e9bff"}} type="button" onClick={handleRandomClick} ><span><i></i>Random Position</span></button>
  
  </div>
  
  </>
}

export default Tablero