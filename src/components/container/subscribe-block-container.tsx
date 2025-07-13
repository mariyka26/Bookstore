import { useState } from 'react'
import { SubscribeBlock } from '../ui/subscribe-block'

export function SubscribeBlockContainer() {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = () => {
        if (!email.trim()) return

        console.log('Subscribed email:', email)

        setSubmitted(true)
        setEmail('')

        setTimeout(() => setSubmitted(false), 4000)
    }

    return (
        <SubscribeBlock
            email={email}
            submitted={submitted}
            onEmailChange={setEmail}
            onSubmit={handleSubmit}
        />
    )
}