import { useState } from "react";

export default function Counter() {
    const [count, setCount] = useState(0);

    //proses: click > render ulang > state berubah
    
    //akan bernilai 1 ketika proses render selesai
    console.log(`Trigger count ${count}`)
    
    //pada saat diklik count masih bernilai 0, ketika proses render selesai, maka count bernilai 1
    function handleClick() {
        //melakukan increment +1
        // setCount(count + 1);
        
        //meskipun set count 3x maka tetap saja increment dilakukan +1
        // setCount(count + 1);
        // setCount(count + 1);
        // setCount(count + 1);
        
        //jika ingin melakukan set count 3x maka bisa dibungkus dengan closure pada useState
        setCount(count => count+ 1);
        setCount(count => count+ 1);
        setCount(count => count+ 1);
        
        //masih bernilai 0 ketika di click
        console.log(count);
    }

    return (
        <>
            <h1>{count}</h1>
            <button onClick={handleClick}>Counter</button>
        </>
    )
}