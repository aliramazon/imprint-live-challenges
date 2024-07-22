import { useEffect, useState } from "react";
import { Grid } from "./Grid.tsx";
import "./App.css";

// 1 miss, 2 hit.

const opponentAShips = [3, 4, 5 /*15, 16, 17, 9, 19, 29, 91, 92, 93 */];

const opponentBShips = [5, 6, 7 /*45, 46, 47, 59, 69, 79, 71, 72, 73 */];

function App() {
    const [opponentAGrid, setOpponentAGrid] = useState(
        Array(100).fill(undefined)
    );
    const [opponentBGrid, setOpponentBGrid] = useState(
        Array(100).fill(undefined)
    );

    const [opponentAShipsSunk, setOpponentAShipsSunk] = useState(0);
    const [opponentBShipsSunk, setOpponentBShipsSunk] = useState(0);
    const [winner, setWinner] = useState("");

    const [turn, setTurn] = useState("A");

    const handleOnClickA = (idx) => {
        if (!opponentAGrid[idx] && !winner) {
            setTurn("A");

            if (opponentAShips.includes(idx)) {
                setOpponentAShipsSunk((prevState) => prevState + 1);
            }

            setOpponentAGrid((currentState) => {
                const copy = [...currentState];
                const finalValue = opponentAShips.includes(idx) ? 2 : 1;
                copy[idx] = finalValue;
                return copy;
            });
        }
    };

    useEffect(() => {
        if (opponentAShipsSunk === opponentAShips.length) {
            setWinner("B");
        } else if (opponentBShipsSunk === opponentBShips.length) {
            setWinner("A");
        }
    }, [opponentAShipsSunk, opponentBShipsSunk]);

    const handleOnClickB = (idx) => {
        if (!opponentBGrid[idx] && !winner) {
            setTurn("B");
            if (opponentBShips.includes(idx)) {
                setOpponentBShipsSunk((prevState) => prevState + 1);
            }

            setOpponentBGrid((currentState) => {
                const copy = [...currentState];
                const finalValue = opponentBShips.includes(idx) ? 2 : 1;
                copy[idx] = finalValue;

                return copy;
            });
        }
    };

    return (
        <div className="App">
            <div className="App__header">
                <h1>Ali's BattleShip Game</h1>
                <h2>It is Opponent {turn} turn</h2>
                {winner && <h2>Winner is Opponent {winner}</h2>}
            </div>

            <div className="board">
                <h2>Opponent A</h2>
                <Grid
                    grid={opponentAGrid}
                    onClick={handleOnClickA}
                    player="A"
                    turn={turn}
                />
            </div>
            <div className="board">
                <h2>Opponent B</h2>
                <Grid
                    grid={opponentBGrid}
                    onClick={handleOnClickB}
                    player="B"
                    turn={turn}
                />
            </div>
        </div>
    );
}

export default App;
