import Image from 'next/image'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'

type CryptoCardProps = {
  name: string
  icon: string
  price: string
  change: string
}

const CryptoCard = ({ name, icon, price, change }: CryptoCardProps) => {
  return (
    <div className="relative flex w-[152px] flex-col items-start justify-start gap-1.5 rounded-[7px] bg-[#e2e2e2]/10 px-2 py-3 backdrop-blur-sm">
      <div className="flex shrink-0 grow-0 items-start justify-end gap-[13px]">
        <div className="relative flex shrink-0 grow-0 items-center justify-start gap-1.5">
          <div className="relative flex shrink-0 grow-0 items-start justify-start">
            <Image
              src={icon}
              alt={name}
              width={32}
              height={32}
              className="relative h-8 w-8 shrink-0 grow-0"
            />
          </div>
          <p className="shrink-0 grow-0 text-left text-sm font-medium text-white">
            {name}
          </p>
        </div>
      </div>
      <p className="shrink-0 grow-0 text-left text-sm font-medium text-white">
        {price}
      </p>
      <div className="relative flex h-[18px] w-10 shrink-0 grow-0 items-center justify-start rounded bg-white/5">
        {change.startsWith('-') ? (
          <>
            <ChevronDownIcon className={'h-2.5 w-2 shrink-0 grow-0'} />
            <p className={'shrink-0 grow-0 text-left text-[10px] text-danger'}>
              {change}
            </p>
          </>
        ) : (
          <>
            <ChevronUpIcon className={'h-2.5 w-2 shrink-0 grow-0'} />
            <p className={'shrink-0 grow-0 text-left text-[10px] text-success'}>
              {change}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
export default CryptoCard
