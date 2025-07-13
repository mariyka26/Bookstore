import type { TitleProps } from '../../types/book-ui'

export function Title({ children }: TitleProps) {
    return <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">{children}</h1>
}