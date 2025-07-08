import type { ReactNode } from 'react';

interface TitleProps {
    children: ReactNode;
}

export function Title({ children }: TitleProps) {
    return <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">{children}</h1>;
}