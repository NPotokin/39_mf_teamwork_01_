const swFileName = 'sw.js'

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration =
        await navigator.serviceWorker.register(
          swFileName
        )
      console.log(
        'ServiceWorker registration successful with scope: ',
        registration.scope
      )
    } catch (err) {
      console.log(
        'ServiceWorker registration failed: ',
        err
      )
    }
  } else {
    console.log(
      'ServiceWorker is not supported in this browser'
    )
  }
}

export default registerServiceWorker
