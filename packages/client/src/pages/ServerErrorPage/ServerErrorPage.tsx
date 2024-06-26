import cn from 'classnames'
import styles from './ServerErrorPage.module.scss'
import { Button } from 'antd'
import panda500 from '@images/panda500.svg'
import { useNavigate } from 'react-router'
import { RoutePath } from '@/core/Routes.enum'

const ServerErrorPage = () => {
  const navigate = useNavigate()
  return (
    <div className={cn(styles.wrapper, 'page')}>
      <div className={styles.pageError}>
        <h1 className={styles.pageError__500}>
          5
          <img
            src={panda500}
            alt="panda"
            className={styles[`pageError__500-img`]}
          />
          0
        </h1>
        <h1 className={styles.pageError__header}>we’ll fix it soon</h1>
        <Button
          className={cn(styles['pageError__btn'])}
          onClick={() => navigate(RoutePath.HOME)}>
          Go home
        </Button>
      </div>
    </div>
  )
}

export default ServerErrorPage
