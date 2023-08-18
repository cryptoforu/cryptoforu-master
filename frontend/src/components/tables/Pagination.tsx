import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/20/solid'

import { Button } from '@/components/elements'
import { Text } from '@/components/typography'
import { PaginationProps } from '@/types/shared-types'

interface IPaginate extends PaginationProps {
  onPageChange: (page: string) => void
}

const Pagination = ({
  onPageChange,
  from,
  to,
  total,
  links,
  prev_page_url,
  next_page_url,
  current_page,
}: IPaginate) => {
  if (links.length <= 4) {
    return
  }
  return (
    <div className={'flex w-full min-w-max items-center justify-between gap-2'}>
      <div className={'p-2'}>
        <Text variant={'secondary'}>
          Showing {from} to {to} of {total}
        </Text>
      </div>
      <div className={'flex gap-2 p-2'}>
        {prev_page_url && (
          <Button colorScheme={'secondary'} onClick={() => onPageChange('1')}>
            <ChevronDoubleLeftIcon className={'h-5 w-5'} />{' '}
          </Button>
        )}
        {links.map((link, index) =>
          link.url !== null ? (
            <Button
              key={index}
              colorScheme={link.active ? 'primary' : 'secondary'}
              onClick={() =>
                onPageChange(
                  links.length - 1 === index ? index.toString() : link.label
                )
              }
            >
              <span dangerouslySetInnerHTML={{ __html: link.label }} />
            </Button>
          ) : null
        )}
        {next_page_url && (
          <Button
            colorScheme={'secondary'}
            onClick={() => onPageChange(to.toString())}
          >
            <ChevronDoubleRightIcon className={'h-5 w-5'} />{' '}
          </Button>
        )}
      </div>
    </div>
  )
}
export default Pagination
