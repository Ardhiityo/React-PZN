import ProfileAddress from "./ProfileAddress";
import { ProfileContext } from "./ProfileContext";
import Profile from "./Profile";
import { useState } from "react";
import ProfileForm from "./ProfileForm";

export default function ProfileApp() {
    const [name, setName] = useState('Eko');
    return (
        <>
            <ProfileContext.Provider value={name}>
                <ProfileForm name={name} setName={setName} />
                <Profile />
                <ProfileAddress />
            </ProfileContext.Provider>
        </>
    )
}