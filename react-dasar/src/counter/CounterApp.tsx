import { useState } from "react";
import Counter from "./Counter";
import Sample from "./Sample";

export default function CounterApp() {
    const [showButton, setShowButton] = useState(true);

    function handleShowButton(e) {
        setShowButton(e.target.checked);
    }

    return (
        <>
            {/* <Counter name="Eko" /> */}

            {/* Jika component dihapus maka state pada component tersebut dihapus juga */}
            {/* {showButton && <Counter name="Budi" />} */}

            {/* Kecuali:
                Jika terdapat kasus kita menampilkan Component yang sama
                Tapi secara struktur UI dia berada di posisi yang sama
                Maka State akan dipertahankan oleh React, yang artinya tidak akan dihapus
                jika Component nya sama, dan posisinya sama, maka State akan dipertahankan
            */}
            {showButton ? <Counter name="Eko" /> : <Counter name="Budi" />}

            {/* Jika compoennt berbeda maka state akan dihapus */}
            {/* {showButton ? <Counter name="Eko" /> : <Sample/>} */}

            <br />

            <input type="checkbox" checked={showButton} onChange={handleShowButton} name="count" id="count" />
            <label htmlFor="count">Show Count</label>
        </>
    )
}