import { Button } from 'antd/lib'
import { FC, useEffect } from 'react'

import styles from './TopicDetails.module.scss'
import cn from 'classnames'
import { ColumnsType } from 'antd/lib/table'
import { UniversalTable } from '@/components/Table'
import { Comment, Topic } from '@/core/contexts/ForumContext'

type TopicDetailsProps = {
  selectedTopic: Topic
  selectedComments: Comment[]
  commentsColumns: ColumnsType
  onBack: VoidFunction
  showCommentModal: VoidFunction
  fetchComments: (topicId: string) => Promise<void>
}
export const TopicDetails: FC<TopicDetailsProps> = ({
  selectedTopic,
  selectedComments,
  commentsColumns,
  onBack,
  showCommentModal,
  fetchComments,
}) => {
  useEffect(() => {
    fetchComments(selectedTopic.topicId)
  }, [])

  return (
    <>
      <div className={styles.forums__table}>
        <UniversalTable
          data={
            selectedComments &&
            selectedComments.map(comment => ({
              ...comment,
              key: comment.commentId, // Уникальный ключ для каждого комментария
            }))
          }
          columns={commentsColumns}
          pagination={false}
          showHeader={false}
          scroll={{ y: 450 }}
          title={() => (
            <div className={styles[`forums__table-title`]}>
              <h1 className={styles.forums__header}> {selectedTopic.name}</h1>
              <p className={styles.forums__content}> {selectedTopic.description}</p>
            </div>
          )}
        />

        <div className={styles.forums__btn}>
          <Button
            className={cn(styles['forums__btn-games'], 'nes-btn  is-secondary1')}
            onClick={onBack}>
            Back
          </Button>
          <Button
            className={cn(styles['forums__btn-comments'], 'nes-btn  is-secondary1')}
            onClick={showCommentModal}>
            Add Comment
          </Button>
        </div>
      </div>
    </>
  )
}
export default TopicDetails
