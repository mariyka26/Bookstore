import { NavLink } from 'react-router'
import {
  HeartIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  FireIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline'
import type { ReactElement } from 'react'
import type { HeaderProps } from '../../types/book-ui'

export function Header({
  container: Container,
  query,
  onQueryChange,
  onSubmit,
  favoritesCount,
  cartCount,
}: HeaderProps): ReactElement {
  return (
    <Container>
      <header className="border-b border-gray-200 pb-2 bg-white z-10 relative">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 pt-3">
            {/* ---------- ЛОГО ---------- */}
            <div className="flex justify-between items-center">
              <NavLink
                to="/books/new/1"
                className="text-xl sm:text-2xl font-extrabold tracking-wide text-gray-800 select-none"
              >
                BOOKSTORE
              </NavLink>
            </div>

            {/* ---------- ПОИСК ---------- */}
            <form
              onSubmit={onSubmit}
              className="relative w-full max-w-full sm:max-w-2xl"
            >
              <input
                type="text"
                value={query}
                onChange={onQueryChange}
                placeholder="Search"
                className="w-full h-10 border border-gray-300 rounded-md pl-4 pr-10
                           placeholder-gray-400 focus:outline-none focus:ring-2
                           focus:ring-teal-500 focus:border-teal-500 text-sm"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500
                         hover:text-teal-600 cursor-pointer"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </form>

            {/* ---------- ИКОНКИ ---------- */}
            <nav className="flex justify-center sm:justify-end items-center gap-4 sm:gap-6 flex-wrap">
              <NavLink to="/books/new/1" className="group">
                <FireIcon className="h-6 w-6 text-gray-700 group-hover:text-teal-600 transition-colors">
                </FireIcon>
              </NavLink>
              <NavLink to="/books/all/1" className="group">
                <BookOpenIcon className="h-6 w-6 text-gray-700 group-hover:text-teal-600 transition-colors">

                </BookOpenIcon>
              </NavLink>
              <NavLink to="/favorites" className="group relative">
                <HeartIcon className="h-6 w-6 text-gray-700 group-hover:text-teal-600 transition-colors" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </NavLink>
              <NavLink to="/cart" className="group relative">
                <ShoppingBagIcon className="h-6 w-6 text-gray-700 group-hover:text-teal-600 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </NavLink>
              <NavLink to="#" className="group">
                <UserCircleIcon className="h-6 w-6 text-teal-700 group-hover:text-teal-600 transition-colors" />
              </NavLink>
            </nav>
          </div>
        </div>
      </header>
    </Container>
  )
}