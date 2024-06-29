import { useCallback } from 'react'
import { FormikTouched } from 'formik'

const useSetTouchedAllFields = <T extends Record<string, unknown>>() => {
  const setTouchedAllFields = useCallback(
    (initialValues: T): FormikTouched<T> => {
      return Object.fromEntries(
        Object.entries(initialValues).map(([key]) => [key, true])
      ) as FormikTouched<T>
    },
    []
  )

  return setTouchedAllFields
}

export default useSetTouchedAllFields
