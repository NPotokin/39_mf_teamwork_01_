export const getUserDevice = () => {
  const userAgent =
    navigator.userAgent.toLowerCase()

  if (
    /mobile|android|iphone|ipad|phone/i.test(
      userAgent
    )
  ) {
    return 'Mobile'
  } else if (/tablet|ipad/i.test(userAgent)) {
    return 'Tablet'
  } else {
    return 'Desktop'
  }
}
