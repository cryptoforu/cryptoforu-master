'use client'
import { Fragment } from 'react'

import { ITags } from '@/app/api/blog/blog'
import { AdPlaceholder } from '@/components/content'
import { useSidebarContext } from '@/store/controllers/SidebarProvider'

import { SidebarSocial, SideBarTags } from './'

type ComponentsProps = {
  id: 'Components'
  tagsProps: ITags[]
}

const SidebarComponents = () => {
  const { sidebarItems, data } = useSidebarContext<ComponentsProps>()
  const Element = sidebarItems.map((el) => {
    switch (el.component) {
      case 'SideBarTags': {
        return (
          <SideBarTags
            key={el.label}
            heading={el.label}
            href={'/learn-crypto'}
            tags={data.tagsProps}
          />
        )
      }
      case 'SidebarSocial': {
        return <SidebarSocial key={el.label} />
      }
      case 'AdPlaceholder': {
        return <AdPlaceholder key={el.label} ad={'inline_rectangle'} />
      }
      default:
        return <Fragment key={el.component}></Fragment>
    }
  })
  return <>{Element}</>
}
export default SidebarComponents
