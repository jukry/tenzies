import { useState } from "react"

export default function Game() {
    // set initial value as returned array from getArray
    const [dice, setDice] = useState(() => getArray())
    const [count, setCount] = useState(0)

    function getArray() {
        let arr = []
        for (let i = 0; i < 10; i++) {
            arr.push(Math.ceil(Math.random() * 6))
        }
        return arr
    }
    console.log(count)

    return (
        <section>
            {/* state tester */}
            <button onClick={() => setCount(count + 1)}>Testeri {count}</button>
            <h1>Game</h1>
        </section>
    )
}
