
export default function HomePage() {
    return (
        <main className="pt-12">
            <div className="grid h-[calc(100vh-15rem)] w-full">

                <div className="place-self-center flex flex-col gap-2 justify-center items-center">
                    <span
                        // className={`text-6xl ${pacifico.className}`}
                        className="text-6xl font-serif"
                    >Phoenix</span>
                    <span
                        className="text-lg font-normal text-gray-700"
                    >Try searching to get started</span>
                </div>
            </div>
        </main>
    )
}

