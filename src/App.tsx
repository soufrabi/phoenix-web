// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useSearchParams } from 'react-router-dom'
import PlaylistPage from './playlist/page'
import WatchPage from './watch/page'
import ResultsPage from './results/page'
import HomePage from './root/page'
import './App.css'
import { useMemo } from 'react'
import { NavBar } from './components/NavBar'
import SettingsPage from './settings/page'


function App() {
    const [searchParams] = useSearchParams()
    const pageType = useMemo<string | null>(() => {
        return searchParams.get("type")
    }, [searchParams])
    return (
        <div className='h-screen w-screen'>
            <NavBar />
            <>
                Tailwind
                {
                    pageType === "watch" && <WatchPage />
                }
                {
                    pageType === "results" && <ResultsPage />
                }
                {
                    pageType === "playlist" && <PlaylistPage />

                }
                {
                    pageType === "settings" && <SettingsPage />
                }
                {
                    pageType === null && <HomePage />
                }
            </>
        </div>
    )
}


export default App

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }
