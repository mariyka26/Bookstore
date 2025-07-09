import type { ReactNode } from 'react'

interface ContainerProps {
    children: ReactNode
}

export function Container({ children }: ContainerProps) {
    return <div className="container mx-auto w-5xl">{children}</div>
}