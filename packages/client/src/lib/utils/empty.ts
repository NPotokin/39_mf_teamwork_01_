export const empty = (variable: unknown): boolean => {
  if (variable === null || variable === undefined) return true

  if (typeof variable === 'string') {
    return variable === ''
  }

  if (typeof variable === 'boolean' || typeof variable === 'number') {
    return false
  }

  if (Array.isArray(variable)) {
    return variable.length === 0
  }

  if (typeof variable === 'object') {
    return Object.keys(variable).length === 0
  }

  if (typeof variable === 'function') {
    return false
  }

  if (variable instanceof Map || variable instanceof Set) {
    return variable.size > 0
  }

  return false
}
