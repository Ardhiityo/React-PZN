export function Todo({ isCompleted, text, isDeleted }:
    { isCompleted: boolean, text: string, isDeleted?: boolean }) {
    if (isDeleted) {
        return null;
    } else {
        return (
            <li>
                {/* Ternary operator cara 1 */}
                {/* {isCompleted ? <del>{text}</del> : text} */}

                {/* Ternary operator cara 2 
                Tampilkan teks, lalu jika sudah selesai (isCompleted), tampilkan juga tanda centang ✅. Jika belum selesai, jangan tampilkan apa-apa setelah teks
                */}
                {text} {isCompleted && '✅'}
            </li>
        )
    }
}