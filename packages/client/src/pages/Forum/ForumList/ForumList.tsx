import { RoutePath } from '@/core/Routes.enum'
import { Button, Table } from 'antd'
import { FC } from 'react'
import { useNavigate } from 'react-router'
import styles from './ForumList.module.scss'
import cn from 'classnames'
import { Topic } from '../Forum'
import { ColumnsType } from 'antd/es/table'

type ForumListProps = {
  dataSource: Topic[]
  columns: ColumnsType
  showModal: () => void
}
const ForumList: FC<ForumListProps> = ({ dataSource, columns, showModal }) => {
  const navigate = useNavigate()
  return (
    <>
      <h1 className={styles.forums__header}>Forums</h1>
      <Table
        className={styles.forums__table}
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
      <div className={styles.forums__btn}>
        <Button
          className={cn(styles['forums__btn-comments'], 'nes-btn')}
          onClick={() => navigate(RoutePath.HOME)}>
          Back
        </Button>
        <Button
          className={cn(styles['forums__btn-comments'], 'nes-btn')}
          onClick={showModal}>
          Add Topic
        </Button>
      </div>
    </>
  )
}
export default ForumList
