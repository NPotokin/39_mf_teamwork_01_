import { RoutePath } from '@/core/Routes.enum'
import { LikeOutlined } from '@ant-design/icons'
import { Button, Input, Modal, Popover, Space, Table } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Forum = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false)
  const [newTopicName, setNewTopicName] = useState('')
  const [newTopicContent, setNewTopicContent] = useState('')
  const [newComment, setNewComment] = useState('')
  const [dataSource, setDataSource] = useState<any[]>([])
  const [selectedTopic, setSelectedTopic] = useState<any>(null)
  const [selectedComments, setSelectedComments] = useState<any[]>([])

  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      const data = [
        {
          key: '1',
          name: 'New games',
          commentsCount: '3',
          content: 'This is the content of New games topic',
          comments: [
            { key: '1', comment: 'interesting', emoji: '' },
            { key: '2', comment: 'no bad', emoji: '' },
            { key: '3', comment: 'i like it', emoji: '' },
          ],
        },
        {
          key: '2',
          name: 'Gamedev',
          commentsCount: '3',
          content: 'This is the content of Gamedev topic',
          comments: [
            { key: '1', comment: 'ok', emoji: '' },
            { key: '2', comment: 'chudesno', emoji: '' },
            { key: '3', comment: 'super', emoji: '' },
          ],
        },
        {
          key: '3',
          name: 'Game design',
          commentsCount: '3',
          content: 'This is the content of Game design topic',
          comments: [
            { key: '1', comment: 'i love it', emoji: '' },
            { key: '2', comment: 'its ok', emoji: '' },
            { key: '3', comment: 'eee', emoji: '' },
          ],
        },
        {
          key: '4',
          name: 'Technologies',
          commentsCount: '3',
          content: 'This is the content of Technologies topic',
          comments: [
            { key: '1', comment: 'ok', emoji: '' },
            { key: '2', comment: 'eee', emoji: '' },
            { key: '3', comment: 'amazing', emoji: '' },
          ],
        },
      ]
      setDataSource(data)
    }
    fetchData()
  }, [])

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
    const newKey = (selectedComments.length + 1).toString()
    const newCommentEntry = { key: newKey, comment: newComment, emoji: '' }
    const updatedDataSource = dataSource.map(item =>
      item.key === selectedTopic.key
        ? {
            ...item,
            comments: [...item.comments, newCommentEntry],
            commentsCount: (parseInt(item.commentsCount) + 1).toString(),
          }
        : item
    )
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

  const handleNameClick = (record: any) => {
    setSelectedTopic(record)
    setSelectedComments(record.comments)
  }

  const handleEmojiSelect = (commentKey: string, emoji: string) => {
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
                className="popover__emoji-btn"
                key={emoji}
                onClick={() => handleEmojiSelect(commentKey, emoji)}>
                {emoji}
              </Button>
            ))}
          </Space>
        }
        trigger="click">
        <Button className="popover__btn" icon={<LikeOutlined />} />
      </Popover>
    )
  }

  const columns = [
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <a onClick={() => handleNameClick(record)}>{text}</a>
      ),
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
      render: (_: string, record: any) => (
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
    <div className="wrapper">
      <div className="forums">
        {!selectedTopic ? (
          <>
            <h1 className="forums__header">Forums</h1>
            <Table
              className="forums__table"
              dataSource={dataSource}
              columns={columns}
            />
            <div className="forums__btn">
              <Button
                className="nes-btn forums__btn-comments"
                onClick={() => navigate(RoutePath.HOME)}>
                Back
              </Button>
              <Button
                className="nes-btn forums__btn-comments"
                onClick={showModal}>
                Add Topic
              </Button>
            </div>
          </>
        ) : (
          <div>
            <h2 className="forums__header">{selectedTopic.name}</h2>
            <p>{selectedTopic.content}</p>
            <Table
              className="forums__table"
              dataSource={selectedComments}
              columns={commentsColumns}
              showHeader={false}
            />
            <div className="forums__btn">
              <Button
                className="nes-btn forums__btn-games"
                onClick={() => {
                  setSelectedTopic(null)
                  setSelectedComments([])
                }}>
                Back
              </Button>
              <Button
                className="nes-btn forums__btn-comments"
                onClick={showCommentModal}>
                Add Comment
              </Button>
            </div>
          </div>
        )}

        <Modal
          title="New Topic"
          okText="Add"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}>
          <Input
            placeholder="Enter new topic name"
            value={newTopicName}
            onChange={handleTopicNameChange}
          />
          <TextArea
            placeholder="Enter new topic content"
            value={newTopicContent}
            onChange={handleTopicContentChange}
          />
        </Modal>

        <Modal
          title="Add new comment"
          open={isCommentModalVisible}
          okText="Add"
          onOk={handleCommentOk}
          onCancel={handleCommentCancel}>
          <TextArea
            placeholder="New comment"
            value={newComment}
            onChange={handleCommentInputChange}
          />
        </Modal>
      </div>
    </div>
  )
}

export default Forum
