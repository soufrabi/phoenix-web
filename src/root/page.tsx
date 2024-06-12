"use client"

// import { Pacifico } from "next/font/google"

// const pacifico = Pacifico({
//     subsets: ['latin'],
//     display: 'swap',
//     weight: '400',
// })

export default function HomePage() {
    return (
        <main className="pt-12">
            <div className="grid h-[calc(100vh-15rem)] w-full">

                <div className="place-self-center">
                    <span
                        // className={`text-6xl ${pacifico.className}`}
                        className="text-6xl"
                    >Phoenix</span>
                </div>
            </div>
        </main>
    )
}

