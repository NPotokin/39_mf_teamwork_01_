# Утечки памяти и их исправление

## Утечка памяти 1: Несвоевременное удаление обработчиков событий

В компоненте App использовалось неправильное написание хука `useEffect`, когда зависимость `isAuthenticated` была вынесена за закрывающуюся скобку. Это приводило к тому, что fetchUser вызывался некорректно.

### Исправление

Для исправления этой проблемы был переписан хук `useEffect` и добавлена зависимость `isAuthenticated` в массив зависимостей.

```typescript
useEffect(() => {
  const fetchUser = async () => {
    if (isAuthenticated) {
      const storedUser = localStorage.getItem(
        USER_DATA_KEY
      )

      if (storedUser) {
        dispatch(setUser(JSON.parse(storedUser)))
      } else {
        const userData = await getUser()
        dispatch(setUser(userData))
      }
    }
  }

  fetchUser()
}, [isAuthenticated])
```

## Утечка памяти 2: Несвоевременное удаление обработчиков событий

### Описание проблемы

В коде использовался обработчик события, который не удалялся после завершения работы компонента. Это приводило к утечке памяти, так как ссылки на обработчики продолжали существовать.

### Исправление

Для исправления этой проблемы регистрация service worker была перенесена в компонент App,были добавлены функции очистки в хуках `useEffect`, которые удаляют обработчики событий при размонтировании компонента.

```typescript
useEffect(() => {
  window.addEventListener(
    'load',
    registerServiceWorker
  )

  return () => {
    window.removeEventListener(
      'load',
      registerServiceWorker
    )
  }
}, [])
```

## Утечка памяти 3: Удаление глобальной переменной
### Описание проблемы
После того как компонент размонтировался, глобальная переменная `window.APP_INITIAL_STATE` не удалялась, что могло привести к утечке памяти.

### Исправление
Дополнительно к удалению обработчиков событий, было добавлено удаление глобальной переменной `window.APP_INITIAL_STATE` при размонтировании компонента.
```typescript
  useEffect(() => {
    if (ENVIRONMENT.PRODUCTION) {
      window.addEventListener('load', registerServiceWorker)
    }

    return () => {
      if (ENVIRONMENT.PRODUCTION) {
        window.removeEventListener('load', registerServiceWorker)
      }
      delete window.APP_INITIAL_STATE
    }
```

## Потенциальная утечка памяти 1: Асинхронные Запросы в useEffect без отмены

### Описание проблемы

В некоторых компонентах в хуке useEffect используются асинронные запросы. Если компонент размонтируется до завершения асинхронного запроса, то при попытке обработать ответ, когда компонент уже не существует, могут возникнуть ошибки или утечки памяти.

### Исправление

Чтобы избежать проблем, связанных с асинхронными вызовами, используется AbortController. Запрос, инициированный в компоненте, прерывается при размонтировании - `controller.abort()`, что предотвращает попытку обновления состояния в размонтированном компоненте. Это похволяет предотвратить потенциальные ошибки и утечки памяти.

```typescript
useEffect(() => {
  ...

  const controller = new AbortController()

  const fetchServerData = async () => {
    const url = `http://localhost:${__SERVER_PORT__}`

    try {
      const response = await fetch(url, {
        signal: controller.signal,
      })
      const data = await response.json()
      console.log(data)
    } catch (error: unknown) {
      if (
        (error as Error).name === 'AbortError'
      ) {
        console.log('Запрос отменен')
      } else {
        console.error('Ошибка запроса в БД')
      }
    } finally {
      setLoading(false)
    }
  }

  fetchServerData()

  return () => {
    controller.abort()

    if (process.env.NODE_ENV === 'production') {
      window.removeEventListener(
        'load',
        registerServiceWorker
      )
    }
  }
}, [])

useEffect(() => {
  const controller = new AbortController()

  const fetchUser = async () => {
    if (isAuthenticated) {
      const storedUser = localStorage.getItem(
        USER_DATA_KEY
      )

      if (storedUser) {
        dispatch(setUser(JSON.parse(storedUser)))
      } else {
        try {
          const userData = await getUser({
            signal: controller.signal,
          })
          dispatch(setUser(userData))
        } catch (error: unknown) {
          if (
            (error as Error).name === 'AbortError'
          ) {
            console.log('Request aborted')
          }
        }
      }
    }
  }

  fetchUser()

  return () => {
    controller.abort()
  }
}, [isAuthenticated])
```

## Потенциальная утечка памяти 2: накапливание AudioContext в хуке useSound

### Описание проблем

В хуке useSound:
Поскольку `GainNode` подключён к AudioContext, важно, чтобы и он корректно отключался, особенно если несколько вызовов `playSound` происходят подряд без отключения предыдущего.
`AudioBufferSourceNode`, который хранится в `sourceRef`, продолжает занимать ресурсы, пока не будет явно остановлен.
Если fetch-запрос был прерван, то он продолжает работать, что может привести к утечкам памяти. 

### Исправление

В функции очистки добавлено отключение `GainNode`, чтобы избежать утечек памяти.
В случае, если fetch-запрос был прерван, добавлено прерывание fetch-запроса с помощью AbortController.
Добавлен вызов `sourceRef?.stop()` в функцию очистки `AudioContext`, чтобы предотвратить утечки памяти.

```typescript
return () => {
  sourceRef?.stop()
  gainNodeRef.current?.disconnect()
  audioContextRef.current?.close()
  controller.abort()
}
```

Проведен анализ производительности при взаимодействии с приложением. Показатели по всем категориям стабильны и не показывают значительного роста со временем. Анализ памяти показывает, что память увеличивается во время игры с включенным звуком, но это увеличение происходит постепенно, без резких скачков. При выходе из игры память уменьшается, что говорит о том, что утечек памяти нет.
