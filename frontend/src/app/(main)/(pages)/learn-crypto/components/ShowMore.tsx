'use client'
import { Button, LoadingState } from '@/components/elements'
import { IPaginationMeta } from '@/types/shared-types'

type ShowMoreProps = {
  handleDown: () => void
  handleUp: () => void
  size: number
  meta: IPaginationMeta
  isPending: boolean
}

const ShowMore = (props: ShowMoreProps) => {
  const { handleDown, handleUp, size, meta, isPending } = props

  return (
    <div
      id={'scroll-region'}
      className={'flex items-center justify-center gap-4 py-6'}
    >
      {meta.next_page_url !== null && (
        <Button onPress={handleUp} disabled={isPending}>
          {isPending ? <LoadingState /> : 'Show More'}
        </Button>
      )}
      {size !== 1 && (
        <Button onPress={handleDown} disabled={isPending}>
          {isPending ? <LoadingState /> : 'Show Less'}
        </Button>
      )}
    </div>
  )
}

export default ShowMore
