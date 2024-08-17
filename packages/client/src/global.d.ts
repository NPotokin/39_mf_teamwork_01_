export {}

declare global {
  interface Window {
    Cypress?: unknown
    APP_INITIAL_STATE: RootState
  }
}
