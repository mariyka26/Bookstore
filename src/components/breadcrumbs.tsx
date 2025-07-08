import React from 'react'
import { NavLink } from 'react-router'

interface BreadcrumbItem {
    to: string
    label: string
}

interface BreadcrumbsProps {
    items?: BreadcrumbItem[]
}

export function Breadcrumbs({ items = [] }: BreadcrumbsProps) {
    if (items.length === 0) return null

    return (
        <div className="d-flex align-items-center">
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    {index !== 0 && <span className="mx-2">/</span>}

                    {index === 0 ? (
                        <NavLink className="text-decoration-none" to={item.to}>
                            {item.label}
                        </NavLink>
                    ) : (
                        <span>{item.label}</span>
                    )}
                </React.Fragment>
            ))}
        </div>
    )
}