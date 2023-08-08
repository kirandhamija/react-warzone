import './App.css';
import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';

const ButtonContainer = styled.div`
  display:grid;
  place-items:center;
`

const Button = styled.button`
width:max-content;
aspect-ratio:1/1;
border-radius:50%;
border:none;
background-color:rgb(184,17,17);
color:azure;
font-weight:bold;
`


function App() {
  const [playerOne, setplayerOne] = useState({
    health: 100,
    wins: 0,
  })

  const [playerTwo, setplayerTwo] = useState({
    health: 100,
    wins: 0,
  })

  let [rounds, setRounds] = useState(0)
  const [turns, setTurns] = useState("playerOne")

  const playerTurn = () => {
    let selection = Math.round(Math.random() * 1);

    if (selection === 1) {
      return "playerOne";
    } else {
      return "playerTwo";
    }
  }

  const BulletIntensity = () => {
    return Math.round(Math.random() * 100);
  }

  const startRound = () => {
    if (turns === "playerOne") {
      //
      setplayerTwo({ ...playerTwo, health: playerTwo.health - BulletIntensity() })

      // updating the next player turn
      setTurns("playerTwo")
    } else {
      //
      setplayerTwo({ ...playerOne, health: playerOne.health - BulletIntensity() })
      // updating the next player turn
      setTurns("playerOne")
    }
    console.log("Final State", playerOne.health, playerTwo.health);
  };

  const handleClick = () => {
    if (rounds >= 3) {
      console.log("The Game has ended");
      return;
    } else {
      setRounds(rounds++);
      setTurns(playerTurn());
      /*while(playerOne.health >= 0 && playerTwo.health >=0){
        startRound();
      }*/
    }
  }

  useEffect(() => {
    if (rounds !== 0) {
      if (rounds >= 3) {
        console.log("The game is ended !")
        if (rounds === 3) {
          console.log("The UI and the health will be reset to 100")
          return
        }
        return
      }



      if (playerOne.health >= 0 && playerTwo.health >= 0) {
        console.log("We should start the round")
        startRound()
        return
      }
    }

  }, [playerOne, playerTwo, turns, rounds])

  return (
    <>
      <h1>Warzone - {rounds}</h1>
      <main>
        <ButtonContainer>
          <Button onClick={handleClick} type="button">Start Game</Button>
        </ButtonContainer>
        <div id="result-container">
          <h1 id="result"></h1>
        </div>
        <section>
          <div id="rounds"></div>
          <div id="p1wins"></div>
          <div id="p2wins"></div>
        </section>

        <button onClick={() => {
          let newValue = rounds
          setRounds(newValue + 1)
        }}>set Round</button>
      </main>
    </>
  );
}

export default App;
