import ProfileAddress from "./ProfileAddress";
import { ProfileContext } from "./ProfileContext";
import Profile from "./Profile";

export default function ProfileApp() {
    return (
        <>
            <ProfileContext.Provider value="eko">
                <Profile/>
                <ProfileAddress/>
            </ProfileContext.Provider>
        </>
    )
}