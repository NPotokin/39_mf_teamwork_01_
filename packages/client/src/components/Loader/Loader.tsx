import { Spin } from 'antd'
import styles from './Loader.module.scss'

const Loader: React.FC = () => (
  <div className={styles.root}>
    <Spin size="large" />
  </div>
)

export default Loader
