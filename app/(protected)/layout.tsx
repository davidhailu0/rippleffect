import AuthSync from "./component/AuthSync";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return <AuthSync>
        {children}
    </AuthSync>
}