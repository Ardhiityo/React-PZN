import type { ReactNode } from "react";

/**
Agar TypeScript tahu bahwa children bisa berisi apa saja (elemen React, teks, dll), 
sebaiknya tambahkan tipe ReactNode.
 */
export default function Container({ children }: { children: ReactNode }) {
    return (
        <>
            <h1>Programmer Zaman Now</h1>
            {children}
            <footer>2026</footer>
        </>
    )
}