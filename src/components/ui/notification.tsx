import React from 'react'
import type { NotificationProps } from '../../types/book-ui'


export function Notification({ message, isVisible }: NotificationProps): React.ReactElement | null {
  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-fade-in">
      {message}
    </div>
  )
}