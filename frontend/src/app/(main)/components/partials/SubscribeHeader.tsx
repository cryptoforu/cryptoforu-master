import { SectionHeader } from '@/components/content'
import { Button, TextField } from '@/components/elements'

const SubscribeHeader = () => {
  return (
    <>
      <SectionHeader
        title={'Latest'}
        gradTitle={'Posts'}
        desc={
          'Subscribe to our newsletter and get latest posts directly to your inbox'
        }
        className={'max-w-2xl text-center'}
      />
      <form action="#" className="mt-12 sm:mx-auto sm:flex sm:max-w-lg">
        <div className="min-w-0 flex-1">
          <TextField
            variant={'primary'}
            aria-labelledby={'Email Address'}
            name={'email'}
            id={'email'}
            placeholder={'Enter Your Email'}
            type={'email'}
          />
        </div>
        <div className={'mt-4 sm:ml-3 sm:mt-0'}>
          <Button type={'submit'} size={'lg'}>
            Subscribe
          </Button>
        </div>
      </form>
    </>
  )
}
export default SubscribeHeader
