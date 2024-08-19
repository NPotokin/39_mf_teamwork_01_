import { LikeOutlined } from '@ant-design/icons'
import { Button, Popover, Space } from 'antd/lib'
import { ChangeEvent, useEffect, useState } from 'react'
import TopicModal from './TopicModal/TopicModal'
import CommentModal from './CommentModal/CommentModal'
import ForumList from './ForumList/ForumList'
import TopicDetails from './TopicDetails/TopicDetails'
import styles from './Forum.module.scss'
import cn from 'classnames'
import { useForum } from '@/core/contexts'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { TITLES } from '@/lib/constants'
import useDocumentTitle from '@/lib/hooks/useDocumentTitle'
import axios from 'axios'
import { Comment, Topic } from '@/core/contexts/ForumContext'

const Forum = () => {
  useDocumentTitle(TITLES.FORUM)
  const {
    dataSource,
    setDataSource,
    selectedComments,
    setSelectedComments,
    selectedTopic,
    setSelectedTopic,
  } = useForum()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false)
  const [newTopicName, setNewTopicName] = useState('')
  const [newTopicContent, setNewTopicContent] = useState('')
  const [newComment, setNewComment] = useState('')

  const fetchData = async () => {
    try {
      const topicsResponse = await axios.get('/api/topics')
      const topics = topicsResponse.data
      setDataSource(topics)
    } catch (error) {
      console.error('Error getting topics:', error)
    }
  }
  const fetchComments = async (topicId: string) => {
    try {
      const response = await axios.get(`/api/comments/${topicId}`)
      const comments = response.data

      const updatedComments = await Promise.all(
        comments.map(async (comment: Comment) => {
          const emojiResponse = await axios.get(`/api/comments/${comment.commentId}/reactions`)
          const emojis = emojiResponse.data
          return { ...comment, emojis }
        })
      )

      setSelectedComments(updatedComments)
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const showModal = () => {
    setIsModalVisible(true)
  }

  const showCommentModal = () => {
    setIsCommentModalVisible(true)
  }
  const handleOk = async () => {
    try {
      const newTopic = {
        name: newTopicName,
        description: newTopicContent,
      }

      const response = await axios.post('/api/topics', newTopic)

      if (response.status === 200) {
        setDataSource([...dataSource, response.data])
        setIsModalVisible(false)
        setNewTopicName('')
        setNewTopicContent('')
        fetchData()
      }
    } catch (error) {
      console.error('Error creating topic:', error)
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const handleCommentOk = async () => {
    if (!selectedTopic) return

    try {
      const newCommentEntry = {
        content: newComment,
        emoji: '',
      }

      const response = await axios.post(`/api/comments/${selectedTopic.topicId}`, newCommentEntry)

      if (response.status === 200) {
        const updatedComments = [...selectedComments, response.data]

        setSelectedComments(updatedComments)
        setDataSource(dataSource)
        setNewComment('')
        setIsCommentModalVisible(false)
        fetchComments(selectedTopic.topicId)
        fetchData()
      }
    } catch (error) {
      console.error('Error adding comment:', error)
    }
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

  const handleEmojiSelect = async (commentKey: string, emoji: string) => {
    if (!selectedTopic) return

    try {
      await axios.post(`/api/comments/${commentKey}/reactions`, { emoji })

      const updatedComments = selectedComments.map(comment => {
        if (comment.commentId === commentKey) {
          const existingEmoji = comment.emojis?.find(e => e.emoji === emoji)
          if (existingEmoji) {
            existingEmoji.count = Number(existingEmoji.count) + 1
          } else {
            comment.emojis = [...(comment.emojis || []), { emoji, count: 1 }]
          }
        }
        return comment
      })

      setSelectedComments(updatedComments)
    } catch (error) {
      console.error('Error setting emoji:', error)
    }
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
      dataIndex: 'count',
      key: 'count',
    },
  ]

  const commentsColumns = [
    {
      title: 'COMMENT',
      dataIndex: 'content',
      key: 'content',
      render: (_: string, record: Comment) => (
        <div>
          <div>{record.content}</div>
          <div>
            {renderEmojiPopover(record.commentId)}
            {record.emojis &&
              record.emojis.map(emojiData => (
                <span key={emojiData.emoji} className={styles.emojiSpan}>
                  {emojiData.emoji} <span className={styles.count}>{emojiData.count}</span>
                </span>
              ))}
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className={cn(styles.wrapper, 'page')}>
      <Header />
      <div className={cn(styles.forums, 'container')}>
        {!selectedTopic ? (
          <ForumList dataSource={dataSource} columns={columns} showModal={showModal} />
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
            fetchComments={fetchComments}
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
      <Footer />
    </div>
  )
}

export default Forum
