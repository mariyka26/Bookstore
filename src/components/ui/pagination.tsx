import type { PageItem } from '../../types/books';

type Props = {
  pages: PageItem[];
  currentPage: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ pages, currentPage, onPageChange }: Props) {
  if (pages.length <= 1) return null;

  const PageBtn = ({
    page,
    children,
    disabled = false,
  }: {
    page: number;
    children: React.ReactNode;
    disabled?: boolean;
  }) => (
    <button
      onClick={() => !disabled && onPageChange(page)}
      disabled={disabled}
      aria-current={currentPage === page ? 'page' : undefined}
      className={`
        flex items-center justify-center
        min-w-[36px] h-9 px-3 rounded-lg
        text-sm font-medium
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-teal-400
        ${currentPage === page
          ? 'bg-teal-600 text-white shadow-md cursor-default'
          : `text-gray-600 hover:bg-teal-100 hover:text-teal-700 cursor-pointer`}
        ${disabled ? 'cursor-not-allowed opacity-50 hover:bg-transparent hover:text-gray-400' : ''}
      `}
    >
      {children}
    </button>
  );

  const lastPage = Math.max(...pages.filter((p) => typeof p === 'number') as number[]);

  return (
    <nav aria-label="Pagination Navigation" className="flex justify-center my-8">
      <ul className="inline-flex items-center gap-1 bg-white px-4 py-2 rounded-xl shadow-lg select-none">
        {/* Кнопка назад */}
        <li>
          <PageBtn page={currentPage - 1} disabled={currentPage === 1} aria-label="Previous Page">
            ‹
          </PageBtn>
        </li>

        {/* Страницы */}
        {pages.map((item, idx) =>
          item === 'DOTS' ? (
            <li
              key={`dots-${idx}`}
              className="px-2 text-gray-400 select-none cursor-default"
              aria-hidden="true"
            >
              …
            </li>
          ) : (
            <li key={`page-${item}`}>
              <PageBtn page={item as number}>{item}</PageBtn>
            </li>
          )
        )}

        {/* Кнопка вперед */}
        <li>
          <PageBtn page={currentPage + 1} disabled={currentPage === lastPage} aria-label="Next Page">
            ›
          </PageBtn>
        </li>
      </ul>
    </nav>
  );
}
