import { useOnline } from "./OnlineHook"

export default function Online() {
    const isOnline: boolean = useOnline();
    return (
        <>
            <h1>{isOnline ? 'Online' : 'Offline'}</h1>
        </>
    )
}