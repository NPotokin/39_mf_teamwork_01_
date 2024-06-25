import { Input, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { ChangeEvent, FC } from 'react'
type TopicModalProps = {
  visible: boolean
  topicName: string
  topicContent: string
  onOk: () => void
  onCancel: () => void
  onTopicNameChange: (e: ChangeEvent<HTMLInputElement>) => void
  onTopicContentChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

const TopicModal: FC<TopicModalProps> = ({
  visible,
  topicName,
  topicContent,
  onOk,
  onCancel,
  onTopicNameChange,
  onTopicContentChange,
}) => (
  <Modal
    title="New Topic"
    okText="Add"
    open={visible}
    onOk={onOk}
    onCancel={onCancel}>
    <Input
      placeholder="Enter new topic name"
      value={topicName}
      onChange={onTopicNameChange}
    />
    <TextArea
      placeholder="Enter new topic content"
      value={topicContent}
      onChange={onTopicContentChange}
    />
  </Modal>
)
export default TopicModal
