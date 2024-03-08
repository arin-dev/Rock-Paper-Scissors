import React, { useEffect, useState } from "react";
import Rock from "./icons/Rock";
import Paper from "./icons/Paper";
import Scissors from "./icons/Scissors";
import "./App.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const choices = [
  { id: 1, name: "rock", component: Rock, losesTo: 2 },
  { id: 2, name: "paper", component: Paper, losesTo: 3 },
  { id: 3, name: "scissors", component: Scissors, losesTo: 1 },
];

export default function App() {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [gameState, setGameState] = useState(null);

  // useEffect(() => {
  //   setComputerChoice(choices[Math.floor(Math.random() * choices.length)]);
  // }, []);

  function handleUserChoice(choice) {
    const chosenChoice = choices.find((c) => c.id === choice);
    setUserChoice(chosenChoice);
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);

    if (chosenChoice.id === randomChoice.losesTo) {
      setGameState("lose");
      setLosses((losses) => losses + 1);
    } else if (chosenChoice.losesTo === randomChoice.id) {
      setGameState("win");
      setWins((wins) => wins + 1);
    } else {
      setGameState("draw");
    }
  }

  function renderComponent(sketch) {
    const Component = sketch.component;
    return <Component />;
  }

  function restartGame() {
    setGameState(null);
    setUserChoice(null);
    setComputerChoice(null);
  }

  return (
    <div className="app">
      {/* information goes here */}
      <div className="info">
        <h2>Rock. Paper. Scissors</h2>

        {/* wins vs losses stats */}
        <div className="wins-losses">
          <div className="wins">
            <span className="number">{wins}</span>
            <span className="text">{wins === 1 ? "Win" : "Wins"}</span>
          </div>

          <div className="losses">
            <span className="number">{losses}</span>
            <span className="text">{losses === 1 ? "Loss" : "Losses"}</span>
          </div>
        </div>
      </div>

      {/* the popup to show win/loss/draw */}
      {gameState && (
        <div
          onClick={() => restartGame()}
          className={`game-state ${gameState}`}
        >
          <div>
            <div className="game-state-content">
              <p>{renderComponent(userChoice)}</p>
              {gameState === "win" && <p>You Won!</p>}
              {gameState === "lose" && <p>You Lose!</p>}
              {gameState === "draw" && <p>It was a Draw!</p>}
              <p>{renderComponent(computerChoice)}</p>
            </div>

            <button>Play Again</button>
          </div>
        </div>
      )}

      <div className="choices">
        {/* choices captions */}
        <div>You</div>
        <div />
        <div>Computer</div>

        {/* buttons for my choice */}
        <div>
          <button onClick={() => handleUserChoice(1)} className="rock">
            <Rock />
          </button>
          <button onClick={() => handleUserChoice(2)} className="paper">
            <Paper />
          </button>
          <button onClick={() => handleUserChoice(3)} className="scissors">
            <Scissors />
          </button>
        </div>

        <div className="vs">vs</div>

        {/* show the computer's choice */}
        <div>
          <button className="computer-choice">?</button>
        </div>
      </div>
    </div>
  );
}
