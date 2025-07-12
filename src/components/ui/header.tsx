// components/ui/HeaderUI.tsx
import React, { type ReactElement, type ComponentType, type ChangeEvent, type FormEvent } from 'react';
import { NavLink } from 'react-router';
import {
  HeartIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  ArchiveBoxIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

interface Props {
  container: ComponentType<{ children: React.ReactNode }>;
  query: string;
  onQueryChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
}

export function Header({ container: Container, query, onQueryChange, onSubmit }: Props): ReactElement {
  return (
    <Container>
      <header className="border-b border-gray-200">
        <div className="mx-auto w-full">
          <div className="flex h-16 items-center justify-between ">
            {/* ---------- ЛОГО ---------- */}
            <NavLink
              to="/books/new/1"
              className="text-2xl font-extrabold tracking-wide text-gray-800 select-none"
            >
              BOOKSTORE
            </NavLink>

            {/* ---------- ПОИСК ---------- */}
            <form
              onSubmit={onSubmit}
              className="relative flex-1 max-w-2xl mx-4 hidden sm:block"
            >
              <input
                type="text"
                value={query}
                onChange={onQueryChange}
                placeholder="Search"
                className="w-full h-10 border border-gray-300 rounded-md pl-4 pr-10
                         placeholder-gray-400 focus:outline-none focus:ring-2
                         focus:ring-green-500 focus:border-green-500 text-sm"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500
                         hover:text-green-600 cursor-pointer"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </form>

            {/* ---------- ИКОНКИ ---------- */}
            <nav className="flex items-center gap-6">
              <NavLink to="/books/new/1" className="group">
                <SparklesIcon className="h-6 w-6 text-gray-700 group-hover:text-green-600 transition-colors" />
              </NavLink>

              <NavLink to="/books/all/1" className="group">
                <ArchiveBoxIcon className="h-6 w-6 text-gray-700 group-hover:text-green-600 transition-colors" />
              </NavLink>

              <NavLink to="/favorites" className="group">
                <HeartIcon className="h-6 w-6 text-gray-700 group-hover:text-green-600 transition-colors" />
              </NavLink>

              <NavLink to="/cart" className="group">
                <ShoppingBagIcon className="h-6 w-6 text-gray-700 group-hover:text-green-600 transition-colors" />
              </NavLink>

              <NavLink to="#" className="group">
                <UserCircleIcon className="h-6 w-6 text-gray-700 group-hover:text-green-600 transition-colors" />
              </NavLink>
            </nav>
          </div>
        </div>
      </header>
    </Container>
  );
}