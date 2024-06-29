import { Button } from 'antd'
import { FC } from 'react'

import styles from './TopicDetails.module.scss'
import cn from 'classnames'
import { Comment, Topic } from '../Forum'
import { ColumnsType } from 'antd/es/table'
import { UniversalTable } from '@/components/Table'

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
      <div className={styles.forums__table}>
        <UniversalTable
          data={selectedComments}
          columns={commentsColumns}
          pagination={false}
          showHeader={false}
          scroll={{ y: 450 }}
          title={() => (
            <div className={styles[`forums__table-title`]}>
              <h1 className={styles.forums__header}> {selectedTopic.name}</h1>
              <p className={styles.forums__content}> {selectedTopic.content}</p>
            </div>
          )}
        />

        <div className={styles.forums__btn}>
          <Button
            className={cn(
              styles['forums__btn-games'],
              'nes-btn  is-secondary1'
            )}
            onClick={onBack}>
            Back
          </Button>
          <Button
            className={cn(
              styles['forums__btn-comments'],
              'nes-btn  is-secondary1'
            )}
            onClick={showCommentModal}>
            Add Comment
          </Button>
        </div>
      </div>
    </>
  )
}
export default TopicDetails
