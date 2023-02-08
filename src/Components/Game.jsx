import { useState } from "react"

export default function Game() {
    // set initial value as returned array from getArray
    const [dice, setDice] = useState(() => getArray())
    const [count, setCount] = useState(0)

    // function to return random array of 10 numbers between 1-6
    /* function getArray() {
        let arr = []
        for (let i = 0; i < 10; i++) {
            arr.push({
                num: Math.ceil(Math.random() * 6),
                id: i,
            })
        }
        return arr
    } */

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

    /* console.log(dice) */
    // render dice to board with key, id and classname
    /* const renderDice = dice.map((item, index) => (
        <div key={index} id={index} className={`key${index} dice`}>
            {item}
        </div>
    )) */

    const renderDice = dice.map((item) => (
        <div key={item.id} className={`key${item.id} dice`}>
            {item.num}
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
