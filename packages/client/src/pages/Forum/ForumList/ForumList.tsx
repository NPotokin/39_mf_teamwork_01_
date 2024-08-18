import { Button } from 'antd/lib'
import { FC } from 'react'
import styles from './ForumList.module.scss'
import cn from 'classnames'
import { ColumnsType } from 'antd/lib/table'
import { UniversalTable } from '@/components/Table'
import { Topic } from '@/core/contexts/ForumContext'

type ForumListProps = {
  dataSource: Topic[]
  columns: ColumnsType
  showModal: VoidFunction
}
const ForumList: FC<ForumListProps> = ({ dataSource, columns, showModal }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.forums__table}>
        <UniversalTable
          data={dataSource.map(topic => ({
            ...topic,
            key: topic.topicId, // Уникальный ключ для каждой строки таблицы
          }))}
          columns={columns}
          pagination={false}
          scroll={{ y: 476 }}
        />
      </div>
      <div className={styles.forums__btn}>
        <Button
          className={cn(styles['forums__btn-comments'], 'nes-btn is-secondary1')}
          onClick={showModal}>
          Add Topic
        </Button>
      </div>
    </div>
  )
}
export default ForumList
