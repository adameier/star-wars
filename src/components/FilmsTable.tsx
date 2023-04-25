import { useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { selectFilms, useFilms } from "../store/selectors"
import { setFilmsData, setFilmsError, setFilmsLoading } from "../store/filmSlice"
import { getFilms } from "../api"
import { ColumnDef, SortingState, createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { Film } from "../schema"
import {format} from 'date-fns/fp'

import * as Rec from "@effect/data/ReadonlyRecord";
import * as Arr from "@effect/data/ReadonlyArray";
import { pipe } from '@effect/data/Function'

const numeralsMap: Record<number, string> = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI'
}

const columnHelper = createColumnHelper<Film>()

const columns = [
  columnHelper.accessor('episode_id', {
    header: () => <span className="self-center">Episode</span>,
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
    header: () => <span className="self-end">Release date</span>,
    cell: info => <span className="self-end">{format('MMM d, Y', new Date(info.getValue()))}</span>,
    enableSorting: true,
    sortingFn: 'datetime'
  }),
  columnHelper.display({
    id: 'action',
    cell: 'click here'
  })
]

const FilmsTable = () => {
    
  const dispatch = useAppDispatch()

  const data = useAppSelector(selectFilms)

  const status = useAppSelector(state => state.films.status)

  useEffect(() => {
    const controller = new AbortController()

    dispatch(setFilmsLoading())
    getFilms(controller.signal)
      .then(films => dispatch(setFilmsData(films)))
      .catch(e => {
        dispatch(setFilmsError())}
      )

    return () => {
      controller.abort()
    }
  }, [dispatch])

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
      {status === 'loading'
      ? 
      <div>Loading</div>
      : <div className="w-full rounded-2 border-1px border-slate-7 shadow-2xl shadow-slate-600/50">
          <table className="w-full rounded-2 overflow-hidden">
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