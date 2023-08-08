import { Text } from '@/components/typography'

const TextCell = (label: string | number | null) => {
  return (
    <>
      <Text variant={'number'} size={'lg'}>
        {label}
      </Text>
    </>
  )
}
export default TextCell
