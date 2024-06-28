import { Modal, Form } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { ChangeEvent, FC, useEffect } from 'react'

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
}) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({ comment })
    }
  }, [visible, comment, form])

  // Проверка заполненности поля комментария
  const isCommentFilled = () => {
    const values = form.getFieldsValue()
    return values.comment
  }

  return (
    <Modal
      title="Add new comment"
      okText="Add"
      open={visible}
      onOk={() => {
        if (isCommentFilled()) {
          onOk()
        }
      }}
      okButtonProps={{
        className: 'nes-btn is-secondary1',
        disabled: !isCommentFilled(), // Блокируем кнопку, если поле не заполнено
      }}
      cancelButtonProps={{
        className: 'nes-btn is-necessary',
      }}
      onCancel={onCancel}>
      <Form form={form} layout="vertical" initialValues={{ comment }}>
        <Form.Item
          name="comment"
          rules={[{ required: true, message: 'Please enter a comment' }]}>
          <TextArea
            placeholder="New comment"
            value={comment}
            onChange={onCommentChange}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CommentModal
