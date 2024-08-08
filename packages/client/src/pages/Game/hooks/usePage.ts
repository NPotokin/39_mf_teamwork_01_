import { useEffect } from 'react'
import { store } from '@/state/store'

import { PageInitArgs } from '@/core/Routes'

type PageProps = {
  initPage: (
    data: PageInitArgs
  ) => Promise<unknown>
}

export const usePage = ({
  initPage,
}: PageProps) => {
  const dispatch = store.dispatch

  useEffect(() => {
    initPage({
      dispatch,
      state: store.getState(),
    })
  }, [])
}
