import { Button } from 'antd'
import styles from './styles.module.scss'
import classNames from 'classnames'

const Forum = () => (
  <>
    <h1 className={styles.header}>Forum page</h1>
    <h1 className={classNames(styles.header, 'nes-btn')}>Forum page</h1>
    {/* тестовые кнопки для примера */}
    <Button type="primary">test</Button>
    <Button type="primary" className="nes-btn">
      test2
    </Button>
    <Button type="primary" className={`nes-btn ${styles.header}`}>
      test2
    </Button>
    <Button type="primary" className={classNames(styles.header, 'nes-btn')}>
      test2
    </Button>
  </>
)

export default Forum
