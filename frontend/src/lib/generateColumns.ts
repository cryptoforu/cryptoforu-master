import CurrentPrice from '@/components/tables/Cells/CurrentPrice'
import ImageCell from '@/components/tables/Cells/ImageCell'
import LinkCell from '@/components/tables/Cells/LinkCell'
import MeterCell from '@/components/tables/Cells/MeterCell'
import TextCell from '@/components/tables/Cells/TextCell'
import TimeCell from '@/components/tables/Cells/TimeCell'
import UsdCryptoCell from '@/components/tables/Cells/UsdCryptoCell'
import { CellProps, ColumnProps } from '@/store/types/data-table-store'

function filterKeys(key) {
  let keys: string[] = ['']
  for (const values of key) {
    keys = Object.keys(values)
  }
  const id = keys.find((i) => i === 'id')
  if (id) {
    return keys.slice(1)
  }
  return keys
}

export function getColumns(cols: CellProps[]) {
  return cols.map((item) => ({
    header: item.header,
    id: item.id,
    accessorKey: item.id,
    cell: (column) => {
      switch (item.cellType) {
        case 'link':
          return LinkCell({
            href: column.row.original[item.original[0]],
            label: column.row.original[item.original[1]],
            as: 'btn',
          })
        case 'name':
          return LinkCell({
            href: column.row.original[item.original[0]],
            label: column.row.original[item.original[1]],
            as: 'link',
          })
        case 'usd_crypto':
          return UsdCryptoCell({
            priceUsd: column.row.original[item.original[0]],
            priceCrypto: column.row.original[item.original[1]],
            crypto: column.row.original[item.original[2]],
          })
        case 'time':
          return TimeCell(column.getValue())
        case 'meter':
          return MeterCell({
            meter: parseFloat(column.row.original[item.original[0]]),
            priceUsd: column.row.original[item.original[1]],
          })
        case 'image':
          return ImageCell({
            image: column.row.original[item.original[0]],
            alt: column.row.original[item.original[1]],
            title: column.row.original[item.original[1]],
          })
        case 'price':
          return CurrentPrice({
            nextPrice: column.getValue(),
          })
        case 'default': {
          return TextCell(
            `${column.row.original[item.original[0]]} '' | '' ${
              column.row.original[item.original[1]]
            }`
          )
        }
        default:
          return TextCell(column.getValue())
      }
    },
  }))
}

export function generateColumns({ data }) {
  const columns: ColumnProps[] = []
  const keys = filterKeys(data)
  for (let i = 0; i < keys.length; i++) {
    columns.push({
      header: data[i][keys[i]].header,
      id: data[i][keys[i]].id,
      accessorFn: (col) => col[keys[i]].value,
      cell: (col) => {
        switch (data[i][keys[i]].cellType) {
          case 'link':
            return LinkCell({
              href: col.getValue().url,
              label: col.getValue().label,
              as: col.getValue().as,
            })
          case 'name':
            return LinkCell({
              href: col.getValue().href,
              label: col.getValue().label,
              as: 'link',
            })
          case 'usd_crypto':
            return UsdCryptoCell({
              priceUsd: col.getValue().priceUsd,
              priceCrypto: col.getValue().priceCrypto,
              crypto: col.getValue().crypto,
            })
          case 'time':
            return TimeCell(col.getValue())
          case 'meter':
            return MeterCell({
              meter: parseFloat(col.getValue().meter),
              priceUsd: col.getValue().priceUsd,
            })
          case 'image':
            return ImageCell({
              image: col.getValue().image,
              alt: col.getValue().name,
              title: col.getValue().name,
            })
          case 'price':
            return CurrentPrice({
              nextPrice: col.getValue(),
            })
          default:
            return TextCell(col.getValue())
        }
      },
    })
  }
  return columns
}
