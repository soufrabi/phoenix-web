import React from "react"
// import Image from "next/image"
// import { useRouter } from "next/navigation";
import { useSearchParams } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { Input } from "@headlessui/react"
// import axios from "axios";

function NavBar() {

    // const router = useRouter()
    const [, setSearchParams] = useSearchParams()
    const [searchQueryString, setSearchQueryString] = React.useState<string>("")
    const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        if (searchQueryString.length > 0) {
            // router.push(`/results?search_query=${searchQueryString}`)
            setSearchParams({
                type: "results",
                search_query: searchQueryString
            })
        }
    }

    const handleValueChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQueryString(ev.target.value)
    }

    const handleAppIconClick = () => {
        // router.push('/')
    }

    return (
        <div className="fixed h-12 w-full flex flex-row justify-between bg-white shadow-sm px-3 z-20">
            {/* left part of the navbar */}
            <div className="flex flex-row gap-2 items-center">
                <div className="pl-2 pr-3">
                    <RxHamburgerMenu
                        className="w-5 h-5"
                    />
                </div>
                <div
                    className="flex flex-row gap-2 items-center cursor-pointer"
                    onClick={handleAppIconClick}
                >
                    <img
                        src={"/phoenix-logo.png"}
                        alt=""
                        width={30}
                        height={30}
                        onContextMenu={(ev: React.MouseEvent<HTMLImageElement>) => { ev.preventDefault() }}
                    />
                    <div>
                        <span
                            className="text-lg select-none"
                        >Phoenix</span>
                    </div>
                </div>
            </div>

            {/* search bar */}
            <div id="search-bar" className="flex flex-row items-center">
                <form
                    className="relative flex flex-row items-center"
                    onSubmit={handleSubmit}
                >
                    <CiSearch
                        className="w-4.5 h-4.5 absolute pointer-events-none left-3 z-40"
                    />
                    <Input
                        type="text"
                        // value={"hello"}
                        placeholder="Search"
                        value={searchQueryString}
                        onChange={handleValueChange}
                        className={" text-sm pl-10 pr-3 py-0.5 rounded-l-2xl border-gray-200 border-2 border-r-0 min-w-96 z-30"}
                    />
                    <button
                        type="submit"
                        className="flex flex-row items-center pl-4 pr-2 py-0.5 rounded-r-2xl border-gray-200 border-2 bg-gray-50/80"
                    >
                        <CiSearch
                            className="w-5 h-5 cursor-pointer"
                        />
                    </button>
                </form>
            </div>

            {/* right part of the navbar */}
            <div className="flex flex-row items-center">
                <div className="flex flex-row gap-2 items-center py-1 px-1.5 rounded-2xl border-2 border-gray-200">
                    <CgProfile
                        className="w-5 h-5"
                    />
                    <span
                        className="text-sm"
                    >Sign in</span>
                </div>
            </div>
        </div>
    )
}

export { NavBar }
