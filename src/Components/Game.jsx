import { useState } from "react"

export default function Game() {
    // set initial value as returned array from getArray
    const [dice, setDice] = useState(() => getArray())
    const [count, setCount] = useState(0)

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
    }

    return (
        <section className="dices">
            {/* state tester */}
            <button onClick={() => setCount(count + 1)}>Testeri {count}</button>
            {renderDice}
            <button className="roll-btn" onClick={rollDice}>
                Roll
            </button>
        </section>
    )
}
