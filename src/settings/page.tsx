import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { nanoid } from 'nanoid'
import { useState, useEffect } from 'react'
import axios from 'axios'
import type { InvidiousApiData } from '../data/invidious/types'
import { invidiousListFallback } from '../data/invidious/fallback'
import { HiChevronDown } from 'react-icons/hi'



type InvidiousInstanceSelectorComponentProps = {
    invidiousList: Array<InvidiousApiData>,
    selectedInvidiousInstance: InvidiousApiData,
    setSelectedInvidiousInstance: React.Dispatch<React.SetStateAction<InvidiousApiData>>,
}

function InvidiousInstanceSelectorComponent({
    invidiousList,
    selectedInvidiousInstance,
    setSelectedInvidiousInstance
}: InvidiousInstanceSelectorComponentProps) {

    return (

        <Listbox value={selectedInvidiousInstance} onChange={setSelectedInvidiousInstance}>
            <ListboxButton
                className={"p-2 border-gray-200 border-2 text-sm flex flex-row gap-2 items-center rounded-lg"}
            >
                <span>{selectedInvidiousInstance[0]}</span>
                <HiChevronDown
                    className='w-5 h-5'
                />
            </ListboxButton>
            <ListboxOptions
                className={"text-sm shadow-lg bg-white rounded-lg"}
                anchor={"bottom"}
            >
                {
                    invidiousList.map((invidiousInstance) => (
                        <ListboxOption key={nanoid()} value={invidiousInstance}

                            className={"p-2 cursor-pointer data-[focus]:bg-blue-100"}
                        >
                            <span
                            >{invidiousInstance[0]}</span>
                        </ListboxOption>

                    ))

                }

            </ListboxOptions>

        </Listbox>

    )

}



export default function SettingsPage() {
    const [invidiousList, setInvidiousList] = useState<Array<InvidiousApiData>>(invidiousListFallback)
    const [selectedInvidiousInstance, setSelectedInvidiousInstance] = useState<InvidiousApiData>(invidiousList[0])

    const getInvidiousListFromApi = async () => {
        try {
            const response = await axios.get("https://api.invidious.io/instances.json?sort_by=type,users")
            const data: Array<InvidiousApiData> = response.data
            setInvidiousList(data)
            console.log(data)
        } catch (err: any) {
            console.error("failed to get invidious instance list")
        }

    }

    useEffect(() => {
        getInvidiousListFromApi()
    }, [])

    return (
        <main
            className="h-full w-screen pt-14 flex flex-row justify-center"
        >
            <div
                className=''
            >

                <div
                    className='flex flex-row gap-6 justify-between items-center'
                >
                    <div>
                        <span>Invidious Instance</span>
                    </div>
                    <InvidiousInstanceSelectorComponent
                        invidiousList={invidiousList}
                        selectedInvidiousInstance={selectedInvidiousInstance}
                        setSelectedInvidiousInstance={setSelectedInvidiousInstance}
                    />
                </div>


            </div>

        </main>
    )
}
