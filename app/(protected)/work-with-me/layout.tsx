import React from "react"

import SubNavbar from "./_components/Subnavbar"
import AuthSync from "./_components/AuthSync"

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return <AuthSync>
        <SubNavbar />
        {children}
    </AuthSync>
}