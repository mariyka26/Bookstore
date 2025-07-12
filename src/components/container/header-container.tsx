// components/Header.tsx
import React, { useState, type FormEvent, type ReactElement, type ComponentType, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router';
import { Header } from '../ui/header';

interface Props {
    container: ComponentType<{ children: React.ReactNode }>;
}

export function HeaderContainer({ container: Container }: Props): ReactElement {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        navigate(`/books/${encodeURIComponent(query)}/1`);
        setQuery('');
    };

    const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    return (
        <Header
            container={Container}
            query={query}
            onQueryChange={handleQueryChange}
            onSubmit={handleSubmit}
        />
    );
}