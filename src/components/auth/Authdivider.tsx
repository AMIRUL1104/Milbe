export default function AuthDivider() {
    return (
        <div className="flex items-center my-1" role="separator">
            <div className="flex-1 border-t border-border" />
            <span className="px-3 text-xs font-bold text-text-muted">অথবা</span>
            <div className="flex-1 border-t border-border" />
        </div>
    );
}