import { useState, useEffect } from "react"
import Confetti from "react-confetti"

export default function Game() {
    // set initial value as returned array from getArray
    const [dice, setDice] = useState(() => getArray())
    const [winnerState, setWinnerState] = useState(false)
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(
        parseInt(localStorage.getItem("hiscore")) || 0
    )

    // function to return array of 10 objects with randon numbers, id and frozen boolean
    function getArray() {
        let arr = []
        for (let i = 0; i < 10; i++) {
            arr.push({
                num: Math.ceil(Math.random() * 6),
                id: i,
                frozen: false,
            })
        }
        return arr
    }

    /* renderDice function, renders dice to DOM */
    const renderDice = dice.map((item) => (
        <div
            onClick={() => handleClick(item.id)}
            key={item.id}
            id={item.id}
            className={`key${item.id} dice ${item.frozen ? "active" : ""}`} // if frozen, add .active styling
        >
            {item.num}
        </div>
    ))

    function handleClick(id) {
        setDice((prevState) => {
            return prevState.map((item) => {
                // if objects id matches clicked id, spread item and change frozen status to opposite
                return item.id === id ? { ...item, frozen: !item.frozen } : item
            })
        })
    }

    function rollDice() {
        setDice((prevState) => {
            return prevState.map((die) => {
                // if die.frozen == true, dont roll new number
                return die.frozen
                    ? die
                    : { ...die, num: Math.ceil(Math.random() * 6) }
            })
        })
        setScore((oldVal) => oldVal + 1)
    }

    /* Winning statement */
    useEffect(() => {
        setWinnerState(
            dice.every((value) => {
                return value.num === dice[0].num
            })
        )
    }, [dice])

    function handleButton() {
        if (highScore == 0 && winnerState) {
            setHighScore(score)
        } else if (score < highScore && winnerState) {
            setHighScore(score)
        }
        winnerState ? [setDice(getArray()), setScore(0)] : rollDice()
    }

    useEffect(() => {
        console.log("set higiscore")
        localStorage.setItem("hiscore", parseInt(highScore))
    }, [highScore])

    return (
        <section className="dices">
            {winnerState ? (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                />
            ) : (
                ""
            )}
            {renderDice}
            <button className="roll-btn" onClick={handleButton}>
                {winnerState ? "Play Again" : "Roll"}
            </button>
            <div className="score">Rolls: {score}</div>
            <div className="hiscore">Best: {highScore}</div>
        </section>
    )
}
