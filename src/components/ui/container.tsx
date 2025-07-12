import type { ReactNode } from 'react'

interface ContainerProps {
    children: ReactNode
}

export function Container({ children }: ContainerProps) {
    return (
        <div className=" mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">{children}</div>
        </div>
    );
}