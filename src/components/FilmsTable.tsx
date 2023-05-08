import { FC, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { selectFilms } from "../store/selectors"
import { filmsRequestCanceled, setFilmsData, setFilmsError, setFilmsLoading, setViewedFilmUrl } from "../store/filmSlice"
import { ParseError, getFilms } from "../api"
import {  SortDirection, SortingState, createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { Film } from "../schema"
import { FetchError } from 'ofetch'

import {format} from 'date-fns/fp'
import { numeralsMap } from "../util/numerals"
import Loader from "./Loader"

const columnHelper = createColumnHelper<Film>()

const SortRenderer = ({ sorted }: { sorted: false | SortDirection })  => <>
  {sorted === false && <span className="text-6 i-radix-icons:caret-sort"></span>}
  {sorted === 'asc' && <span className="text-6 i-radix-icons:caret-up"></span>}
  {sorted === 'desc' && <span className="text-6 i-radix-icons:caret-down"></span>}
</>

const ViewDetailsButton: FC<{filmUrl: string}> = ({filmUrl}) => {
  const dispatch = useAppDispatch()

  const onClick = () => {
    dispatch(setViewedFilmUrl(filmUrl))
  }

  return (
    <button className="rounded-full pl-2 pr-1.5 py-1 flex items-center gap-2 bg-white/10 hover:bg-white/20" onClick={onClick}>
      <span>View details</span><span className="text-6 i-radix-icons:info-circled" />
    </button>
  )
}

const columns = [
  columnHelper.accessor('episode_id', {
    header: info => (
      <span className="self-center flex items-center">
        <span className="mr-1">Episode</span><SortRenderer sorted={info.column.getIsSorted()} />
      </span>
    ),
    cell:  info => <span className="block w-full text-center">{numeralsMap[info.getValue()]}</span>,
    enableSorting: true,
    sortDescFirst: false
  }),
  columnHelper.accessor('title', {
    header: 'Title',
    cell: info => info.getValue(),
    enableSorting: false
  }),
  columnHelper.accessor('release_date', {
    header: info => (
      <span className="self-end flex items-center">
        <span className="mr-1">Release date</span><SortRenderer sorted={info.column.getIsSorted()} />
      </span>
    ),
    cell: info => <span className="self-end">{format('MMM d, Y', new Date(info.getValue()))}</span>,
    enableSorting: true,
    sortingFn: 'datetime'
  }),
  columnHelper.display({
    id: 'action',
    cell: info => (
      <div className="self-center">
        <ViewDetailsButton filmUrl={info.row.original.url} />
      </div>
    )
  })
]

const FilmsTable: FC = () => {
    
  const dispatch = useAppDispatch()

  const data = useAppSelector(selectFilms)

  const status = useAppSelector(state => state.films.status)

  const [requestCompleted, setRequestCompleted] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    if (!requestCompleted) {
      dispatch(setFilmsLoading())   
      getFilms({signal: controller.signal})
        .then(films => dispatch(setFilmsData(films)))
        .then(() => {
          setRequestCompleted(true)
        })
        .catch((e) => {
          if (e instanceof ParseError || (e instanceof FetchError && e.statusCode)) {
            dispatch(setFilmsError())
            return
          }
          dispatch(filmsRequestCanceled())
        })
    }

    return () => {
      controller.abort()
    }
  }, [dispatch, requestCompleted])

  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    columns,
    data,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <>
      {status !== 'success'
      ? <div className="flex justify-center pt-6">
          <Loader />
        </div>
      : <div className="w-full overflow-x-auto rounded-2 border-1px border-slate-7 shadow-2xl shadow-slate-600/50">
          <table className="min-w-600px w-full rounded-2 overflow-hidden">
            <thead className="bg-gray-9">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="p-0">
                      {header.isPlaceholder ? null : (
                        <div
                          className={`
                            h-16 p-2 uppercase flex flex-col items-start justify-center
                            ${header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                          `}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-gray-8">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="h-16 even:bg-gray-7/50">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                      <div
                        className="h-16 p-2 flex flex-col items-start justify-center"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    }
    </>
  )
}

export default FilmsTable