'use client'
import { SectionHeader } from '@/components/content'
import { Input, Label, TextField } from 'react-aria-components'
import { Button } from '@/components/elements'

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
          <TextField>
            <Label className={'sr-only'}> Email address </Label>
            <Input
              className={
                'block w-full rounded-md border border-transparent bg-white/70 px-5 py-3 text-base text-slate-900 shadow-sm placeholder:text-slate-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600 dark:border-slate-900 dark:bg-slate-950 dark:focus:ring-emerald-400'
              }
              type={'email'}
              placeholder={'Enter your email'}
            />
          </TextField>
        </div>
        <div className={'mt-4 sm:ml-3 sm:mt-0'}>
          <Button type={'submit'} size={'xl'}>
            Subscribe
          </Button>
        </div>
      </form>
    </>
  )
}
export default SubscribeHeader
