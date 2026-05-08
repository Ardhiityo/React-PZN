import { useContext } from "react"
import { ProfileContext } from "./ProfileContext"

export default function Profile() {
    const profile = useContext(ProfileContext);

    return (
        <>
            <h1>Profile</h1>
            <p>Name : {profile}</p>
        </>
    )
}