import { Button, Table } from 'antd'
import { FC } from 'react'

import styles from './TopicDetails.module.scss'
import cn from 'classnames'
import { Comment, Topic } from '../Forum'
import { ColumnsType } from 'antd/es/table'

type TopicDetailsProps = {
  selectedTopic: Topic
  selectedComments: Comment[]
  commentsColumns: ColumnsType
  onBack: () => void
  showCommentModal: () => void
}
export const TopicDetails: FC<TopicDetailsProps> = ({
  selectedTopic,
  selectedComments,
  commentsColumns,
  onBack,
  showCommentModal,
}) => {
  return (
    <>
      <h2 className={styles.forums__header}>{selectedTopic.name}</h2>
      <p>{selectedTopic.content}</p>
      <Table
        className="forums__table"
        dataSource={selectedComments}
        columns={commentsColumns}
        showHeader={false}
        pagination={{ pageSize: 5 }}
      />
      <div className={styles.forums__btn}>
        <Button
          className={cn(styles['forums__btn-games'], 'nes-btn')}
          onClick={onBack}>
          Back
        </Button>
        <Button
          className={cn(styles['forums__btn-comments'], 'nes-btn')}
          onClick={showCommentModal}>
          Add Comment
        </Button>
      </div>
    </>
  )
}
export default TopicDetails
