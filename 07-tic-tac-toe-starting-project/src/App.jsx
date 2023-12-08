import { WINNING_COMBINATIONS } from "../winning-combinations"
import { useState } from "react"
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import GameOver from "./components/GameOver"

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function derivedActivePlayer(gameTurns) {

  let currentPlayer = 'X'

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }
  return currentPlayer
}

function deriveWinner(gameBoard, players) {
  let winner

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column]
    const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column]
    const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column]

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol]
    }

  }
  return winner
}

function deriveGameboard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])]

  for (const turn of gameTurns) {
    const { square, player } = turn
    const { row, column } = square

    gameBoard[row][column] = player
  }
  return gameBoard
}

function App() {

  const [players, setPlayers] = useState(PLAYERS)

  const [gameTurns, setGameTurns] = useState([])
  const activePlayer = derivedActivePlayer(gameTurns)
  const gameBoard = deriveGameboard(gameTurns)
  const winner = deriveWinner(gameBoard, players)
  const hasDraw = gameTurns.length === 9 && !winner

  function handleSelectSquare(rowIndex, columnIndex) {

    setGameTurns((previousTurns) => {

      const currentPlayer = derivedActivePlayer(previousTurns)
      const updatedTurns = [{ square: { row: rowIndex, column: columnIndex }, player: currentPlayer }, ...previousTurns]

      return updatedTurns
    })
  }

  function handleRestart() {
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(previousPlayers => {
      return {
        ...previousPlayers,
        [symbol]: newName
      };
    })
  }

  return <main>
    <div id='game-container'>
      <ol id='players' className='highlight-player'>
        <Player onChangeName={handlePlayerNameChange} initialName={PLAYERS.X} symbol='X' isActive={activePlayer === 'X'} />
        <Player onChangeName={handlePlayerNameChange} initialName={PLAYERS.O} symbol='O' isActive={activePlayer === 'O'} />
      </ol>
      {(winner || hasDraw) && <GameOver onRestart={handleRestart} winner={winner} />}
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
    </div>
    <Log turns={gameTurns} />
  </main>
}

export default App
