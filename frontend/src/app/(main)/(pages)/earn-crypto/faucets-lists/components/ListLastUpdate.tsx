'use client'
import { useListContext } from '@/store/useListStore'
import { Text } from '@/components/typography'

const ListLastUpdate = () => {
  const updated_at = useListContext((state) => state.data?.updated_at)

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
