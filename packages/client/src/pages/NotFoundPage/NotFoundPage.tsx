import { useNavigate } from 'react-router'
import cn from 'classnames'
import styles from './NotFoundPage.module.scss'
import panda404 from '@images/panda404.svg'
import { Button } from 'antd'
import { RoutePath } from '@/core/Routes.enum'
const NotFoundPage = () => {
  const navigate = useNavigate()
  return (
    <div className={cn(styles.wrapper, 'page')}>
      <div className={styles.pageError}>
        <h1 className={styles.pageError__404}>
          4
          <img
            src={panda404}
            alt="panda"
            className={styles[`pageError__404-img`]}
          />
          4
        </h1>
        <h1 className={styles.pageError__header}>page not found</h1>
        <Button
          className={cn(styles['pageError__btn'], 'nes-btn is-warning')}
          onClick={() => navigate(RoutePath.HOME)}>
          Go home
        </Button>
      </div>
    </div>
  )
}

export default NotFoundPage
