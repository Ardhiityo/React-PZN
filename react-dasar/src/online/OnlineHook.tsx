import { useEffect, useState } from "react";

export function useOnline() {
    /**
    navigator.onLine adalah browser API yang mengembalikan true jika user sedang online, false jika offline
     */
    const [isOnline, setIsOnline] = useState(() => navigator.onLine);

    /**
    Event listener 'online' hanya dipicu saat ada perubahan dari offline → online
    Event listener 'offline' hanya dipicu saat ada perubahan dari online → offline
    Jika user sudah online saat component mount, event 'online' tidak akan di-trigger
    Sehingga state tetap dengan nilai default yang Anda set, tanpa pernah berubah
     */

    useEffect(() => {
        function handleOnline() {
            setIsOnline(true);
        }

        function handleOffline() {
            setIsOnline(false);
        }

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        }
    }, [])

    return isOnline;
}