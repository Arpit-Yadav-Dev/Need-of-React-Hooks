import { useMemo, useRef, useState } from "react"


function Counter() {
    console.log('render count')
    const [number, setNumber] = useState(10);
    let num = useRef(0)

    function handleClick(e) {
        e.stopPropagation()

        setNumber(number => number + 1);
        setNumber(number => number + 1);
        setNumber(number => number + 1);
        num.current++;

        console.log(num.current)
    }

    function fib(n) {
        if (n === 1 || n === 2) return 1
        return fib(n - 1) + fib(n - 2)
    }

    const fibMemoized = useMemo(() => fib(number), [number.fib])

    return (
        <>
            <h1 style={{ color: 'white' }} >{number} | {fibMemoized} </h1>
            <button onClick={handleClick}>Add</button>
        </>
    )
}

export default Counter
