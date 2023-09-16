'use client'
import { Text } from '@/components/typography'
import { useList } from '@/store/useFaucetListProvider'

const ListLastUpdate = () => {
  const {
    data: { updated_at },
  } = useList()

  return (
    <Text className={'flex items-center'}>
      <span
        className={
          ' mr-1.5 flex h-2.5 w-2.5 shrink-0 animate-ping rounded-full bg-emerald-600'
        }
      />{' '}
      Last Update: {updated_at}
    </Text>
  )
}
export default ListLastUpdate
