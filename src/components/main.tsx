import type { ReactNode } from 'react'

interface MainProps {
    children: ReactNode
}

export function Main({ children }: MainProps) {
    return <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">{children}</main>
}