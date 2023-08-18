import ListLastUpdate from '@/app/(main)/(pages)/earn-crypto/faucets-lists/components/ListLastUpdate'
import ListPageSize from '@/app/(main)/(pages)/earn-crypto/faucets-lists/components/ListPageSize'
import ListSearch from '@/app/(main)/(pages)/earn-crypto/faucets-lists/components/ListSearch'
import ListTabs from '@/app/(main)/(pages)/earn-crypto/faucets-lists/components/ListTabs'

const ListFilters = () => {
  return (
    <div className={'mx-auto flex max-w-8xl flex-col justify-center gap-4'}>
      <div
        className={'flex w-full flex-wrap items-center justify-center gap-4'}
      >
        <ListTabs />
      </div>
      <div className={'mt-4 flex items-center justify-between'}>
        <ListSearch />
        <ListLastUpdate />
        <ListPageSize />
      </div>
    </div>
  )
}

export default ListFilters
