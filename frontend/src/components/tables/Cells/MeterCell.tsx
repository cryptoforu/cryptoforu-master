import Meter from '@/components/misc/Meter'
import { Currency } from '@/components/misc/NumberFormatter'
import { Text } from '@/components/typography'

type MeterCellProps = {
  meter: number
  priceUsd: string
}

const MeterCell = (props: MeterCellProps) => {
  const { meter, priceUsd } = props

  return (
    <>
      <div className={'flex flex-col gap-2.5'}>
        <Meter
          showValueLabel={false}
          value={meter}
          aria-label={'Faucet Health'}
        />
        <hr
          className={
            'my-1 bg-slate-100 text-emerald-400 dark:bg-slate-900 dark:text-emerald-400'
          }
        />
        <Text variant={'secondary'} size={'sm'}>
          <Currency
            value={priceUsd}
            minimumFractionDigits={8}
            currency={'USD'}
            style={'currency'}
          />
        </Text>
      </div>
    </>
  )
}
export default MeterCell
