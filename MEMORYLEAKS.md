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
