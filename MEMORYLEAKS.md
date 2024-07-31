# Утечки памяти и их исправление

## Утечка памяти 1: Несвоевременное удаление обработчиков событий

В копмоненте App использовался неправильное написание хука `useEffect`, когда зависимость `isAuthenticated` была вынесена за закрывающуюся скобку. Это приводило к тому, что fetchUser вызывался некорректно.

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

## Утечка памяти 3: Асинхронные Запросы в useEffect без отмены

### Описание проблемы

В компоненте App в useEffect используются методы fetchServerData и fetchUser, которые являются асинхронными запросами. Если компонент размонтируется до завершения этих запросов, это может вызвать утечки памяти, что произойдет, если в системе все еще будут ссылки на состояние или функции этого компонента.

### Исправление

Чтобы избежать проблем, связанных с асинхронными вызовами, используется AbortController. Он позволяет отменять запущенные запросы, когда компонент размонтируется.

```typescript
useEffect(() => {
  if (process.env.NODE_ENV === 'production') {
    window.addEventListener(
      'load',
      registerServiceWorker
    )
  }

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
}, [isAuthenticated])
```

## Утечка памяти 4: возможное накапливание AudioContext в хуке useSound

### Описание проблемы
В хуке useSound каждый раз при изменении url или volume создаётся новый AudioContext. Если компонент размонтируется, то старые контексты могут быть закрыты, что может привести к утечкам памяти.

 Долговременные ссылки на AudioBufferSourceNode:
В текущей реализации, когда stopSound вызывается, ссылка на AudioBufferSourceNode устанавливается в null. Если в этот момент компонент размонтируется, до этого вызова должны быть прикреплены все узлы, иначе они могут остаться литыми в памяти.

### Исправление
Обнуление ссылки гарантирует, что при следующем монтировании компонента новый контекст будет создан без конфликтов.