import { useState } from "react"

export default function Game() {
    // set initial value as returned array from getArray
    const [dice, setDice] = useState(() => getArray())
    const [count, setCount] = useState(0)

    // function to return random array of 10 numbers between 1-6
    function getArray() {
        let arr = []
        for (let i = 0; i < 10; i++) {
            arr.push(Math.ceil(Math.random() * 6))
        }
        return arr
    }

    // render dice to board with key, id and classname
    const renderDice = dice.map((item, index) => (
        <div key={index} id={index} className={`key${index} dice`}>
            {item}
        </div>
    ))

    return (
        <section className="dices">
            {/* state tester */}
            <button onClick={() => setCount(count + 1)}>Testeri {count}</button>
            {renderDice}
            <button className="roll-btn">Roll</button>
        </section>
    )
}
