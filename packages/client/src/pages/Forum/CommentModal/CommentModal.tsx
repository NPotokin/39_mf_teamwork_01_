import { Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { ChangeEvent, FC } from 'react'
type CommentModalProps = {
  visible: boolean
  comment: string
  onOk: () => void
  onCancel: () => void
  onCommentChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

const CommentModal: FC<CommentModalProps> = ({
  visible,
  comment,
  onOk,
  onCancel,
  onCommentChange,
}) => (
  <Modal
    title="Add new comment"
    okText="Add"
    open={visible}
    onOk={onOk}
    onCancel={onCancel}
    okButtonProps={{
      className: 'nes-btn is-secondary1',
    }}
    cancelButtonProps={{
      className: 'nes-btn is-necessary',
    }}>
    <TextArea
      placeholder="New comment"
      value={comment}
      onChange={onCommentChange}
    />
  </Modal>
)
export default CommentModal
