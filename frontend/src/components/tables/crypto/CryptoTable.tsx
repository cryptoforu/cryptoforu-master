'use client'

import MainTable, {
  MainTableColumn,
  MainTableHeader,
  MainTableRow,
} from '@/components/tables/MainTable'
import ImageCell from '@/components/tables/Cells/ImageCell'
import { TableBody } from 'react-aria-components'
import { CryptoCoin, CryptoDataProps } from '@/types/shared-types'
import CurrentPrice from '@/components/tables/Cells/CurrentPrice'
import PriceCell from '@/components/tables/Cells/PriceCell'
import TextCell from '@/components/tables/Cells/TextCell'

interface CryptoTableProps {
  rows: CryptoDataProps[]
}

const CryptoTable = ({ rows }: CryptoTableProps) => {
  let columns = [
    { name: '#', key: 'market_cap_rank' },
    { name: 'Name', key: 'name', isRowHeader: true },
    { name: 'Price', key: 'current_price' },
    { name: '1h(%)', key: 'price_change_percentage_1h_in_currency' },
    { name: '7d(%)', key: 'price_change_percentage_7d_in_currency' },
    { name: '24h(%)', key: 'price_change_percentage_24h' },
    { name: 'Market Cap', key: 'market_cap' },
  ]

  return (
    <MainTable aria-label={'Crypto Table'}>
      <MainTableHeader columns={columns}>
        {(column) => (
          <MainTableColumn isRowHeader={column.isRowHeader}>
            {column.name}
          </MainTableColumn>
        )}
      </MainTableHeader>
      <TableBody
        items={rows}
        className={'divide-y divide-slate-200 pl-4 dark:divide-slate-900'}
      >
        {(item) => (
          <MainTableRow columns={columns}>
            {({ key }) => {
              switch (key) {
                case 'name':
                  return (
                    <ImageCell
                      id={item.attributes.name}
                      image={item.attributes.image}
                      alt={item.attributes.name}
                    >
                      {item.attributes[key as keyof CryptoCoin]}
                    </ImageCell>
                  )
                case 'current_price':
                  return (
                    <CurrentPrice nextPrice={item.attributes.current_price}>
                      {item.attributes[key as keyof CryptoCoin]}
                    </CurrentPrice>
                  )
                case key.includes('price_change') && key:
                  return (
                    <PriceCell
                      price={item.attributes[key as keyof CryptoCoin] as string}
                    >
                      {item.attributes[key as keyof CryptoCoin]}
                    </PriceCell>
                  )
                default: {
                  return (
                    <TextCell>
                      {item.attributes[key as keyof CryptoCoin]}
                    </TextCell>
                  )
                }
              }
            }}
          </MainTableRow>
        )}
      </TableBody>
    </MainTable>
  )
}
export default CryptoTable
