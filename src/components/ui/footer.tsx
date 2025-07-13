import type { ReactElement } from 'react'
import type { FooterProps } from '../../types/book-ui'

export function Footer({ container: Container }: FooterProps): ReactElement {
    return (
        <Container>
            <footer>
                <div className="flex items-center justify-between py-4 border-t text-gray-600">
                    <p className="mb-0">©2022 Bookstore</p>
                    <p className="mb-0">
                        All rights reserved
                    </p>
                </div>
            </footer>
        </Container>
    )
}