import './App.css'
import FilmsTable from './components/FilmsTable'

function App() {

  return (
    <div className='w-full max-w-1040px mx-auto px-4 mt-30'>
      <h1 className='font-light text-9xl text-slate-300 mb-0.5em'>Databank</h1>
      <FilmsTable />
    </div>
  )
}

export default App
