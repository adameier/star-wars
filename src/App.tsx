import './App.css'
import FilmsTable from './components/FilmsTable'
import FilmDetails from './components/FilmDetails'

function App() {
  return (
    <div className='w-full max-w-1040px mx-auto p-4 mt-6 lg:mt-30'>
      <div className='flex items-center text-4xl md:text-8xl lg:text-9xl mb-0.5em'>
        <img src='/logo.png' className='w-2em mr-0.5em' />
        <h1 className='font-light  text-slate-300'>Databank</h1>
      </div>
      <FilmsTable />
      <FilmDetails />
    </div>
  )
}

export default App
