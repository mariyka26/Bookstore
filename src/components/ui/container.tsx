import type { ContainerProps } from '../../types/book-ui'

export function Container({ children }: ContainerProps) {
    return (
        <div className=" mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">{children}</div>
        </div>
    )
}