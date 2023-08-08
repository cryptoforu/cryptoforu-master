import { StoreApi, useStore } from 'zustand'

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

const reactSelectors = <S extends StoreApi<object>>(_store: S) => {
  const store = _store as WithSelectors<typeof _store>
  store.use = {}
  for (const k of Object.keys(store.getState())) {
    ;(store.use as any)[k] = () =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useStore(_store, (s) => s[k as keyof typeof s])
  }

  return store
}
export default reactSelectors