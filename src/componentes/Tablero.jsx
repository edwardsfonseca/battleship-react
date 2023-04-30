import React from 'react'
import { useState } from 'react'
import Casilla from './Casilla.jsx'
import '../style/tablero.css'

function Tablero() {
  //-//-// Iniciamos con la funcion declarando su estado en este estado tenemos el estado inicial ,y un estado ramdon que puede cambiar con un boton
  const [gameBoard, setGameBoard] = useState(
    [[1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0]],
    generateRandomBoard());
  const [addShipsManually, setAddShipsManually] = useState(false) // Estado agrega manualmente las posiciones del barco 
  const [gameStarted, setGameStarted] = useState(false); // Estado para indicar el inicio de partida
  
  // funcion fire

  function fire(row, col) {
    if (gameStarted) {
      let ships = document.querySelectorAll(".ship:not(.hit)");
      let newGameBoard = [...gameBoard];
      if (gameBoard[row][col] === 1) {
        newGameBoard[row][col] = 2;
        ships = document.querySelectorAll(".ship:not(.hit)");
        if (ships.length - 1 === 0) {
          alert("¡Felicidades! ¡Has hundido todos los barcos!");
        }
      } else if (gameBoard[row][col] === 0) {
        newGameBoard[row][col] = 3;
        alert("Tiro Errado")
        setTimeout(cpuTurn, 1000); // Llamamos a la función cpuTurn después de un segundo
      }
      setGameBoard(newGameBoard);
    }
  }
  // funcion que permite cpu dispare aleatoria
  function cpuTurn() {

    let newGameBoard = [...gameBoard];
    let ships = document.querySelectorAll(".ship:not(.hit)");
    let randomRow, randomCol;
    do {
      randomRow = Math.floor(Math.random() * 10);
      randomCol = Math.floor(Math.random() * 10);
      alert("La cpu ya ha disparado es tu turno")
    } while (newGameBoard[randomRow][randomCol] === 2 || newGameBoard[randomRow][randomCol] === 3);

    if (newGameBoard[randomRow][randomCol] === 1) {
      newGameBoard[randomRow][randomCol] = 2;

      ships = document.querySelectorAll(".ship:not(.hit)");
      if (ships.length - 1 === 0) {
        alert("¡La CPU ha hundido todos tus barcos!");

      }
    } else if (newGameBoard[randomRow][randomCol] === 0) {
      newGameBoard[randomRow][randomCol] = 3;
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
        const random = Math.floor(Math.random() * 2);
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
  /* function handleRandomClick() {
    setGameBoard(generateRandomBoard());
  } */
// con esta funcion la llamamos en un botton para permitirnos editar las posiciones del barco a nuestra voluntad
  function handleManualClick() {
    setAddShipsManually(true);
  }
  // con esta funcion elimino las casillas las dejo en  0
  function handleResetClick() {
    const newGameBoard = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => 0));
    setGameBoard(newGameBoard);
  }
// funcion seleccion de posiciones de barco 
  function handleCellClick(row, col) {
    if (addShipsManually && !gameStarted) {
      const newGameBoard = [...gameBoard];
      newGameBoard[row][col] = 1;
      setGameBoard(newGameBoard);
    }
  }
  // Funcion inicia partida 
  function startGame() {
    setGameStarted(true);
  }
  const celln = [];
  for (let i = 0; i < 10; i++) {
    const cells = [];
    for (let j = 0; j < 10; j++) {
      cells.push(
        <Casilla
          key={`${i},${j}`}
          status={gameBoard[i][j]}
          
          handleClick={() => handleCellClick(i, j)}
          
        />
        
      );
    }
    celln.push(<div key={i} className="row">{cells}</div>);
  }

  const rows = [];
  for (let i = 0; i < 10; i++) {
    const cells = [];
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

  return (
    <>
      <div className='dbtablero'>
      <div className="#">
      <h1 className="text">Battleship</h1>
      <div className="board">{rows}</div></div>
      <br/>
      <div className="game">
      <h1 className="text">Tablero de posiciones</h1>
      <div className="board">{celln}</div></div>
      </div>
      <br/>
      {!gameStarted && (
        
        <div className="buttons">
          <button className='btnship' onClick={handleManualClick}>Colocar barcos manualmente</button>
          <button className='btnship' onClick={() => setGameBoard(generateRandomBoard())}>Colocar barcos aleatoriamente</button>
          <button className='btnship' onClick={handleResetClick}>Resetear tablero</button>
          <button className='btnship' onClick={startGame}>Empezar juego</button>
        </div>
      )}
      {addShipsManually && !gameStarted && (
        <p>Haz clic en las casillas para colocar tus barcos</p>
      )}
    </>
  );
}

export default Tablero