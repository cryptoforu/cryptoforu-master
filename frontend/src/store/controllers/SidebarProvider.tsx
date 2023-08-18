'use client'
import type { SidebarData, SidebarNested } from 'contentlayer/generated'
import { sidebarDatum } from 'contentlayer/generated'
import React, { createContext, PropsWithChildren, useContext } from 'react'

type SidebarIndex = keyof Omit<SidebarData, '_id' | '_raw' | 'type'>
type SidebarID = {
  id: string
}
type SidebarContextData<T extends SidebarID> = {
  sidebarItems: SidebarNested[]
  data: T
}
const SidebarContext = createContext<SidebarContextData<SidebarID> | null>(null)
type SidebarProviderProps<T extends SidebarID> = {
  selectedType: SidebarIndex
  data: T
}

function SidebarProvider<T extends SidebarID>({
  selectedType,
  data,
  children,
}: PropsWithChildren<SidebarProviderProps<T>>) {
  const sidebarItems = sidebarDatum[selectedType] as SidebarNested[]
  return (
    <SidebarContext.Provider value={{ sidebarItems, data }}>
      {children}
    </SidebarContext.Provider>
  )
}

export default SidebarProvider

export function useSidebarContext<T extends SidebarID>() {
  const context = useContext<SidebarContextData<T>>(
    SidebarContext as unknown as React.Context<SidebarContextData<T>>
  )
  if (!context) {
    throw new Error(
      'useSidebarContext must be used under SidebarContextProvider'
    )
  }
  return context
}
