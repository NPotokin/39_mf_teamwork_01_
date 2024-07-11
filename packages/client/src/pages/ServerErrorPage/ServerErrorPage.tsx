import cn from 'classnames'
import styles from './ServerErrorPage.module.scss'
import { Button } from 'antd'
import panda500 from '@images/panda500.svg'
import { useNavigate } from 'react-router'
import { RoutePath } from '@/core/Routes.enum'
import { FC } from 'react'

type Props = {
  resetErrorBoundary?: () => void
}

const ServerErrorPage: FC<Props> = ({
  resetErrorBoundary,
}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary()
    }
    navigate(RoutePath.HOME)
  }

  return (
    <div className={cn(styles.wrapper, 'page')}>
      <div className={styles.pageError}>
        <h1 className={styles.pageError__500}>
          5
          <img
            src={panda500}
            alt="panda"
            className={
              styles[`pageError__500-img`]
            }
          />
          0
        </h1>
        <h1 className={styles.pageError__header}>
          we’ll fix it soon
        </h1>
        <Button
          className={cn(
            styles['pageError__btn'],
            'nes-btn is-warning'
          )}
          onClick={handleClick}>
          Go home
        </Button>
      </div>
    </div>
  )
}

export default ServerErrorPage
