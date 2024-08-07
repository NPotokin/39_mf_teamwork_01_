import {
  notification,
  type NotificationArgsProps,
} from 'antd/lib'
import { ArgsProps } from 'antd/lib/notification'

type NotificationPlacement =
  NotificationArgsProps['placement']

type NoticeMethods =
  | 'success'
  | 'info'
  | 'warning'
  | 'error'

export const showNotification = (
  method: NoticeMethods,
  description: string,
  message = 'Information',
  placement: NotificationPlacement = 'top'
) => {
  const props: ArgsProps = {
    message,
    description,
    placement,
    showProgress: true,
    style: { fontFamily: "'Press Start 2P'" },
  }

  notification[method](props)
}
