import { Pagination } from '../ui/pagination'
import type { PageItem } from '../../types/books'
import type { PaginationContainerProps } from '../../types/books'

const DOTS = 'DOTS' as const

function getPaginationPages(
    total: number,
    currentPage: number,
    limit: number,
    siblingCount: number
): PageItem[] {
    const pageCount = Math.max(1, Math.ceil(total / limit))
    const totalNumbers = siblingCount * 2 + 5
    const totalBlocks = totalNumbers + 2

    if (pageCount <= totalBlocks) {
        return Array.from({ length: pageCount }, (_, i) => i + 1)
    }

    const left = Math.max(currentPage - siblingCount, 2)
    const right = Math.min(currentPage + siblingCount, pageCount - 1)
    const showLeftDots = left > 2
    const showRightDots = right < pageCount - 1

    let pages: PageItem[]

    if (!showLeftDots && showRightDots) {
        pages = [...range(1, 3 + siblingCount * 2), DOTS, pageCount]
    } else if (showLeftDots && !showRightDots) {
        pages = [1, DOTS, ...range(pageCount - (3 + siblingCount * 2) + 1, pageCount)]
    } else {
        pages = [1, DOTS, ...range(left, right), DOTS, pageCount]
    }

    return cleanDots(pages)
}

function range(from: number, to: number): number[] {
    return Array.from({ length: to - from + 1 }, (_, i) => from + i)
}

function cleanDots(pages: PageItem[]) {
    const result: PageItem[] = []
    const seen = new Set<number>()

    for (const p of pages) {
        if (p === DOTS) {
            if (result.at(-1) !== DOTS) result.push(DOTS)
        } else if (!seen.has(p)) {
            seen.add(p)
            result.push(p)
        }
    }

    return result
}

export function PaginationContainer({
    total,
    currentPage,
    limit = 12,
    siblingCount = 1,
    onPageChange,
}: PaginationContainerProps) {
    const pages = getPaginationPages(total, currentPage, limit, siblingCount)
    if (pages.length <= 1) return null
    return <Pagination pages={pages} currentPage={currentPage} onPageChange={onPageChange} />
}