import { notification, type NotificationArgsProps } from 'antd'
import { ArgsProps } from 'antd/es/notification'

type NotificationPlacement = NotificationArgsProps['placement']

type NoticeMethods = 'success' | 'info' | 'warning' | 'error'

export const showNotification = (
  method: NoticeMethods,
  description: string,
  message = 'Информация',
  placement: NotificationPlacement = 'top'
) => {
  const props: ArgsProps = {
    message,
    description,
    placement,
    showProgress: true,
    style: { fontFamily: "'Press Start 2P'" },
  }

  switch (method) {
    case 'success':
      notification.success(props)
      break
    case 'info':
      notification.info(props)
      break
    case 'warning':
      notification.warning(props)
      break
    case 'error':
      notification.error(props)
      break
  }
}
