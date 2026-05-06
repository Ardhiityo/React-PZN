export function Todo({ isCompleted, text, isDeleted }:
    { isCompleted: boolean, text: string, isDeleted?: boolean }) {
    if (isDeleted) {
        return null;
    } else {
        return (
            <li>
                {isCompleted ? <del>{text}</del> : text}
            </li>
        )
    }
}