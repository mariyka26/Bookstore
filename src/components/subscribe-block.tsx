import { useState, type FormEvent } from 'react';

export function SubscribeBlock() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        // TODO: здесь можно вызвать API‑endpoint
        setSubmitted(true);
        setEmail('');
        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <section className="bg-violet-50 py-14">
            <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-3">
                    Subscribe to newsletter
                </h2>

                <p className="text-gray-500 mb-8 max-w-3xl">
                    Be the first to know about new IT books, upcoming releases, exclusive offers and more.
                </p>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row overflow-hidden rounded-md shadow-sm"
                >
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email"
                        required
                        className="w-full h-12 px-4 text-sm outline-none
                       placeholder-gray-400 text-gray-900"
                    />

                    <button
                        type="submit"
                        className="mt-4 sm:mt-0 sm:w-40 h-12 flex-shrink-0
                       bg-gray-800 text-white text-sm font-semibold tracking-wider
                       hover:bg-gray-700 transition-colors"
                    >
                        Subscribe
                    </button>
                </form>

                {/* simple success note */}
                {submitted && (
                    <p className="mt-4 text-sm text-green-600">
                        Thanks! You’ll receive the next issue in your inbox.
                    </p>
                )}
            </div>
        </section>
    );
}