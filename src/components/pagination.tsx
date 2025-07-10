// components/pagination.tsx
import { NavLink } from 'react-router';

type PaginationProps = {
  total: number;       // всего результатов
  currentPage: number; // активная страница (1‑based)
  query: string;       // строка поиска
  limit?: number;      // элементов на страницу (default = 10)
  siblingCount?: number; // сколько страниц по бокам от текущей (default = 1)
};

export function Pagination({
  total,
  currentPage,
  query,
  limit = 12,
  siblingCount = 1,
}: PaginationProps) {
  /* fallback: если total вдруг === 0, не даём пагинации «схлопнуться»   */
  const pageCount = Math.max(1, Math.ceil(total / limit));
  if (pageCount === 1) return null;

  // ---------- helpers ----------
  const range = (f: number, t: number) =>
    Array.from({ length: t - f + 1 }, (_, i) => f + i);
  const DOTS = 'DOTS' as const;

  // ---------- вычисление номеров ----------
  let pages: (number | typeof DOTS)[];
  const totalNumbers = siblingCount * 2 + 5;
  const totalBlocks = totalNumbers + 2;

  if (pageCount > totalBlocks) {
    const left = Math.max(currentPage - siblingCount, 2);
    const right = Math.min(currentPage + siblingCount, pageCount - 1);
    const showLeftDots = left > 2;
    const showRightDots = right < pageCount - 1;

    if (!showLeftDots && showRightDots)
      pages = [...range(1, 3 + siblingCount * 2), DOTS, pageCount];
    else if (showLeftDots && !showRightDots)
      pages = [1, DOTS, ...range(pageCount - (3 + siblingCount * 2) + 1, pageCount)];
    else
      pages = [1, DOTS, ...range(left, right), DOTS, pageCount];
  } else {
    pages = range(1, pageCount);
  }

  // ---------- убираем дубли ----------
  const finalPages: (number | typeof DOTS)[] = [];
  const seen = new Set<number>();
  for (const p of pages) {
    if (p === DOTS) {
      if (finalPages.at(-1) !== DOTS) finalPages.push(DOTS);
    } else if (!seen.has(p)) {
      seen.add(p);
      finalPages.push(p);
    }
  }

  // ---------- кнопка номера ----------
  const PageBtn = ({
    page,
    children,
  }: {
    page: number;
    children: React.ReactNode;
  }) => (
    <NavLink
      to={`/books/${query}/${page}`}
      className={({ isActive }) =>
        `px-3 py-2 text-sm rounded-md transition
         hover:bg-teal-50 text-gray-700
         ${isActive ? 'bg-teal-600 text-white hover:bg-teal-600' : ''}`
      }
    >
      {children}
    </NavLink>
  );

  // ---------- рендер ----------
  return (
    <nav className="flex justify-center my-8">
      <ul className="inline-flex items-center gap-1 bg-white px-4 py-2 rounded-xl shadow-sm">
        {/* PREV — показываем только если page > 1 */}
        {currentPage > 1 && (
          <li>
            <PageBtn page={currentPage - 1}>‹</PageBtn>
          </li>
        )}

        {/* NUMBERS + DOTS */}
        {finalPages.map((item, idx) =>
          item === DOTS ? (
            <li key={`dots-${idx}`} className="px-2 py-2 text-gray-400 select-none">
              …
            </li>
          ) : (
            <li key={`page-${item}`}>
              <PageBtn page={item}>{item}</PageBtn>
            </li>
          ),
        )}

        {/* NEXT — показываем, только если не на последней */}
        {currentPage < pageCount && (
          <li>
            <PageBtn page={currentPage + 1}>›</PageBtn>
          </li>
        )}
      </ul>
    </nav>
  );
}