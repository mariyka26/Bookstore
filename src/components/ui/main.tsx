import type { MainProps } from '../../types/book-ui'

export function Main({ children }: MainProps) {
    return <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-6">{children}</main>
}