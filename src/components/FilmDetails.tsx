import { FC, Fragment, useState } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectViewedFilm } from "../store/selectors";
import { clearViewedFilmUrl } from "../store/filmSlice";
import { numeralsMap } from "../util/numerals";
import { format } from 'date-fns/fp'
import { Film } from "../schema";

const FilmDetails: FC = () => {
  const viewedFilm = useAppSelector(selectViewedFilm)

  const [prevFilm, setPrevFilm] = useState<Film | null>(null)

  const displayedFilm = viewedFilm ?? prevFilm

  const dispatch = useAppDispatch()

  const onClose = () => {
    setPrevFilm(viewedFilm)
    dispatch(clearViewedFilmUrl())
  }

  const CrawlRenderer: FC = () => (
    <>
      {displayedFilm && 
      <blockquote>
        <q className="
          block relative text-lg pl-2 md:( text-xl pl-7 ) text-center font-italic
          before:( absolute top-0 left-0 text-3xl md:text-6xl content-[open-quote] font-serif text-slate )
        ">
          {displayedFilm.opening_crawl}
        </q>
        <cite className="block mt-2 pl2 md:( text-lg pl-6 ) font-not-italic">— Opening crawl</cite>
      </blockquote>}
    </>
  )

  return (
    <Transition
      show={viewedFilm !== null}
      as={Fragment}
    >
      <Dialog 
        onClose={onClose}
        className='relative z-50'
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 flex md:( p-4 items-center justify-center )">
          {displayedFilm && (
            <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel 
              className="
                max-h-full overflow-y-auto mx-auto w-full max-w-1100px bg-gray-9 p-4 sm:p-6
                md:( p-8 rounded-4 border-gray-8 border-1 shadow-2xl shadow-slate-8/40 )
              "
            >
              <div className="text-lg">
                <button className="bg-transparent flex items-center hover:( underline )"
                  onClick={onClose}
                >
                  <span className="i-fa6-solid:arrow-left | mr-2" /> <span>Back to List</span>
                </button>
              </div>
              <div className="flex mt-6 gap-x-6">
                <div className="shrink-0 w-80px sm:w-150px lg:w-300px">
                  <img className="rounded-3 border-1 border-gray-7" src={`/posters/${displayedFilm.episode_id}.jpeg`} alt={`Film poster for ${displayedFilm.title}`} />
                </div>
                <div className="grow">
                  <hgroup>
                    <p className="uppercase font-bold text-lg md:text-2xl text-slate-400">Episode {numeralsMap[displayedFilm.episode_id]}</p>
                    <Dialog.Title className="text-3xl md:text-6xl mt-2">{displayedFilm.title}</Dialog.Title>
                  </hgroup>
                  <div className="mt-4 flex items-center text-base md:( text-xl mt-8 )">
                    <span className="i-fa6-solid:calendar-days | text-1.25em mr-3" />
                    <p>Released on <span className="font-bold">{format('do MMMM yyyy', new Date(displayedFilm.release_date))}</span></p>
                  </div>
                  <div className="flex flex-wrap gap-x-10 gap-y-2 mt-4">
                    <p className="shrink-0 max-w-full"><span className="">Directed by</span> <span className="font-bold">{displayedFilm.director}</span></p>
                    <p className="shrink-0 max-w-full"><span className="">Produced by</span> <span className="font-bold">{displayedFilm.producer}</span></p>
                  </div>
                  <div className="mt-6 lt-lg:display-none ">
                    <CrawlRenderer />
                  </div>
                </div>
              </div>
              <div className="mt-6 lg:display-none">
                <CrawlRenderer />
              </div>
            </Dialog.Panel>
          </Transition.Child>
          )}
        </div>
      </Dialog>
    </Transition>
  )
}

export default FilmDetails