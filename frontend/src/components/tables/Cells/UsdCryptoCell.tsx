import { Currency } from '@/components/misc/NumberFormatter'
import { Text } from '@/components/typography'

type UsdCryptoCell = {
  priceUsd: string
  priceCrypto: string
  crypto: string
}

const UsdCryptoCell = (props: UsdCryptoCell) => {
  const { priceUsd, priceCrypto, crypto } = props

  return (
    <>
      <div className={'flex flex-col gap-2'}>
        <Text>
          <Currency
            value={priceUsd}
            currency={'USD'}
            currencyDisplay={'narrowSymbol'}
          />
        </Text>
        <Text
          variant={'secondary'}
          size={'sm'}
          className={'whitespace-nowrap tabular-nums'}
        >
          (
          <Currency value={priceCrypto} minimumFractionDigits={8} /> {crypto})
        </Text>
      </div>
    </>
  )
}
export default UsdCryptoCell
