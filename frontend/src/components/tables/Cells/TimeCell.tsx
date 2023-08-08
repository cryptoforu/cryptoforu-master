import { Text } from '@/components/typography'
import { ClockIcon } from '@heroicons/react/20/solid'

const TimeCell = (time: string | number) => {
  return (
    <Text className={'inline-flex items-center gap-2'} size={'sm'}>
      <ClockIcon className={'h-4 w-4'} />
      <span>{time}</span>
    </Text>
  )
}
export default TimeCell
