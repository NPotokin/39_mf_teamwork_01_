const swFileName = 'static/sw.js'

interface Window {
  Cypress?: unknown
}

const registerServiceWorker = async () => {
  if (
    'serviceWorker' in navigator &&
    typeof window !== 'undefined' &&
    !window.Cypress
  ) {
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
