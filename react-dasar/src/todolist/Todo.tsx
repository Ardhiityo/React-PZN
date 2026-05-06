export function Todo({ isCompleted, text, isDeleted }: { isCompleted: boolean, text: string, isDeleted?: boolean }) {
    if (isDeleted) {
        return null;
    } else if (isCompleted) {
        return (
            <li>
                <del>{text}</del>
            </li>
        )
    } else {
        return (
            <li>{text}</li>
        )
    }
}