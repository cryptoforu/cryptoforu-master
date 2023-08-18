'use client'
import { createColumnHelper } from '@tanstack/react-table'
import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { createStore, useStore } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import CurrentPrice from '@/components/tables/Cells/CurrentPrice'
import ImageCell from '@/components/tables/Cells/ImageCell'
import PriceCell from '@/components/tables/Cells/PriceCell'
import TextCell from '@/components/tables/Cells/TextCell'
import { CryptoData } from '@/types/crypto'

const columnHelper = createColumnHelper<CryptoData>()

const defColumns = [
  columnHelper.accessor('attributes.market_cap_rank', {
    header: '#',
    id: 'attributes.market_cap_rank',
    cell: (column) => {
      return TextCell(column.getValue())
    },
  }),
  columnHelper.accessor('attributes.name', {
    header: 'Name',
    id: 'attributes.name',
    cell: (column) => {
      return ImageCell({
        image: column.row.original.attributes.image,
        alt: column.getValue(),
        title: column.getValue(),
      })
    },
  }),
  columnHelper.accessor('attributes.current_price', {
    header: 'Price',
    id: 'attributes.current_price',
    cell: (column) => {
      return CurrentPrice({
        nextPrice: column.getValue(),
        color: column.row.original.attributes.current_color,
      })
    },
  }),
  columnHelper.accessor('attributes.price_change_percentage_1h_in_currency', {
    header: '1h(%)',
    id: 'attributes.price_change_percentage_1h_in_currency',
    cell: (column) => {
      return PriceCell({ price: column.getValue() })
    },
  }),
  columnHelper.accessor('attributes.price_change_percentage_24h_in_currency', {
    header: '24h(%)',
    id: 'attributes.price_change_percentage_24h_in_currency',
    cell: (column) => {
      return PriceCell({ price: column.getValue() })
    },
  }),
  columnHelper.accessor('attributes.price_change_percentage_7d_in_currency', {
    header: '7d(%)',
    id: 'attributes.price_change_percentage_7d_in_currency',
    cell: (column) => {
      return PriceCell({ price: column.getValue() })
    },
  }),
  columnHelper.accessor('attributes.market_cap', {
    header: 'Market Cap',
    id: 'attributes.market_cap',
    cell: (column) => {
      return TextCell(column.getValue())
    },
  }),
]

type CryptoState = {
  crypto: Record<string, CryptoData>
}
type CryptoActions = {
  updatePrice: (id: string, price: number) => void
  getPrice: (id: string, price: number) => 'danger' | 'success'
}

interface ICrypto extends CryptoState, CryptoActions {
  columns: typeof defColumns
}

type CryptoStore = ReturnType<typeof createCryptoStore>
const createCryptoStore = (initProps?: Partial<CryptoState>) => {
  const DEFAULT_PROPS: CryptoState = {
    crypto: {},
  }
  return createStore(
    immer<ICrypto>((set, get) => ({
      ...DEFAULT_PROPS,
      ...initProps,
      columns: [...defColumns],
      updatePrice: (id, price) =>
        set((state) => {
          const currentPrice = state.crypto[id].attributes.current_price
          state.crypto[id].attributes.current_price = price
          state.crypto[id].attributes.current_color =
            currentPrice > price ? 'danger' : 'success'
        }),
      getPrice: (id, price) => {
        return get().crypto[id].attributes.current_price > price
          ? 'danger'
          : 'success'
      },
    }))
  )
}
export const CryptoContext = createContext<CryptoStore | null>(null)

export function CryptoProvider({
  children,
  ...props
}: PropsWithChildren<CryptoState>) {
  const [cryptoStore] = useState(() => createCryptoStore(props))
  return (
    <CryptoContext.Provider value={cryptoStore}>
      {children}
    </CryptoContext.Provider>
  )
}

export function useCryptoContext<T>(
  selector: (state: ICrypto) => T,
  equalityFn?: (left: T, right: T) => boolean
): T {
  const store = useContext(CryptoContext)
  if (!store) throw new Error('Missing CryptoProvider in the tree')
  return useStore(store, selector, equalityFn)
}
