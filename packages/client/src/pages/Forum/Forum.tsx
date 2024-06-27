import { LikeOutlined } from '@ant-design/icons'
import { Button, Popover, Space } from 'antd'
import { ChangeEvent, useEffect, useState } from 'react'
import { mockData } from './mockData'
import TopicModal from './TopicModal/TopicModal'
import CommentModal from './CommentModal/CommentModal'
import ForumList from './ForumList/ForumList'
import TopicDetails from './TopicDetails/TopicDetails'
import styles from './Forum.module.scss'
import cn from 'classnames'

export type Comment = {
  key: string
  comment: string
  emoji: string
}

export type Topic = {
  key: string
  name: string
  commentsCount: string
  content: string
  comments: Comment[]
}

const Forum = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false)
  const [newTopicName, setNewTopicName] = useState('')
  const [newTopicContent, setNewTopicContent] = useState('')
  const [newComment, setNewComment] = useState('')
  const [dataSource, setDataSource] = useState<Topic[]>([])
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const [selectedComments, setSelectedComments] = useState<Comment[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = mockData
      setDataSource(data)
    }
    fetchData()
  }, [dataSource])

  const showModal = () => {
    setIsModalVisible(true)
  }

  const showCommentModal = () => {
    setIsCommentModalVisible(true)
  }

  const handleOk = () => {
    const newKey = (dataSource.length + 1).toString()
    const newTopic = {
      key: newKey,
      name: newTopicName,
      commentsCount: '0',
      content: newTopicContent,
      comments: [],
    }
    setDataSource([...dataSource, newTopic])
    setIsModalVisible(false)
    setNewTopicName('')
    setNewTopicContent('')
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleCommentOk = () => {
    if (!selectedTopic) return
    const newKey = (selectedComments.length + 1).toString()
    const newCommentEntry = { key: newKey, comment: newComment, emoji: '' }
    const updatedDataSource = dataSource.map(item => {
      return item.key === selectedTopic.key
        ? {
            ...item,
            comments: [...item.comments, newCommentEntry],
            commentsCount: (parseInt(item.commentsCount) + 1).toString(),
          }
        : item
    })
    setDataSource(updatedDataSource)
    setSelectedComments([...selectedComments, newCommentEntry])
    setIsCommentModalVisible(false)
    setNewComment('')
  }

  const handleCommentCancel = () => {
    setIsCommentModalVisible(false)
  }

  const handleTopicNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTopicName(e.target.value)
  }

  const handleTopicContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewTopicContent(e.target.value)
  }

  const handleCommentInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value)
  }

  const handleNameClick = (record: Topic) => {
    setSelectedTopic(record)
    setSelectedComments(record.comments)
  }

  const handleEmojiSelect = (commentKey: string, emoji: string) => {
    if (!selectedTopic) return
    const updatedComments = selectedComments.map(comment =>
      comment.key === commentKey ? { ...comment, emoji } : comment
    )
    setSelectedComments(updatedComments)
    const updatedDataSource = dataSource.map(topic =>
      topic.key === selectedTopic.key
        ? { ...topic, comments: updatedComments }
        : topic
    )
    setDataSource(updatedDataSource)
  }

  const renderEmojiPopover = (commentKey: string) => {
    const emojis = ['😀', '😅', '😂', '😎', '😍', '😢', '😡', '👍']
    return (
      <Popover
        content={
          <Space>
            {emojis.map(emoji => (
              <Button
                className={styles[`popover__emoji-btn`]}
                key={emoji}
                onClick={() => handleEmojiSelect(commentKey, emoji)}>
                {emoji}
              </Button>
            ))}
          </Space>
        }
        trigger="click">
        <Button className={styles.popover__btn} icon={<LikeOutlined />} />
      </Popover>
    )
  }

  const columns = [
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Topic) => {
        return <a onClick={() => handleNameClick(record)}>{text}</a>
      },
    },
    {
      title: 'COMMENTS',
      dataIndex: 'commentsCount',
      key: 'commentsCount',
    },
  ]

  const commentsColumns = [
    {
      title: 'COMMENT',
      dataIndex: 'comment',
      key: 'comment',
      render: (_: string, record: Comment) => (
        <div>
          <div>{record.comment}</div>
          <div>
            {renderEmojiPopover(record.key)}
            {record.emoji && <span>{record.emoji}</span>}
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className={cn(styles.wrapper, 'page')}>
      <div className={styles.forums}>
        {!selectedTopic ? (
          <ForumList
            dataSource={dataSource}
            columns={columns}
            showModal={showModal}
          />
        ) : (
          <TopicDetails
            selectedTopic={selectedTopic}
            selectedComments={selectedComments}
            commentsColumns={commentsColumns}
            onBack={() => {
              setSelectedTopic(null)
              setSelectedComments([])
            }}
            showCommentModal={showCommentModal}
          />
        )}
        <TopicModal
          visible={isModalVisible}
          topicName={newTopicName}
          topicContent={newTopicContent}
          onOk={handleOk}
          onCancel={handleCancel}
          onTopicNameChange={handleTopicNameChange}
          onTopicContentChange={handleTopicContentChange}
        />
        <CommentModal
          visible={isCommentModalVisible}
          comment={newComment}
          onOk={handleCommentOk}
          onCancel={handleCommentCancel}
          onCommentChange={handleCommentInputChange}
        />
      </div>
    </div>
  )
}

export default Forum
