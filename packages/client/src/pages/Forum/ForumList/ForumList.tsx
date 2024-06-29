import { Button } from 'antd'
import { FC } from 'react'
import styles from './ForumList.module.scss'
import cn from 'classnames'
import { Topic } from '../Forum'
import { ColumnsType } from 'antd/es/table'
import { UniversalTable } from '@/components/Table'

type ForumListProps = {
  dataSource: Topic[]
  columns: ColumnsType
  showModal: () => void
}
const ForumList: FC<ForumListProps> = ({ dataSource, columns, showModal }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.forums__table}>
        <UniversalTable
          data={dataSource}
          columns={columns}
          pagination={false}
          scroll={{ y: 476 }}
        />
      </div>
      <div className={styles.forums__btn}>
        <Button
          className={cn(
            styles['forums__btn-comments'],
            'nes-btn is-secondary1'
          )}
          onClick={showModal}>
          Add Topic
        </Button>
      </div>
    </div>
  )
}
export default ForumList
