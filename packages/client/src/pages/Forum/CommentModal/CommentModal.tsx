import { Modal, Form } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import {
  ChangeEvent,
  FC,
  useEffect,
  useState,
} from 'react'

type CommentModalProps = {
  visible: boolean
  comment: string
  onOk: VoidFunction
  onCancel: VoidFunction
  onCommentChange: (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => void
}

const CommentModal: FC<CommentModalProps> = ({
  visible,
  comment,
  onOk,
  onCancel,
  onCommentChange,
}) => {
  const [isFullFields, setIsFullFields] =
    useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({ comment })
      const values = form.getFieldsValue()
      if (values.comment.length > 0) {
        setIsFullFields(true)
      } else if (values.comment.length <= 0) {
        setIsFullFields(false)
      }
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
          setIsFullFields(false)
        }
      }}
      okButtonProps={{
        className: 'nes-btn is-secondary1',
        disabled: !isFullFields, // Блокируем кнопку, если поле не заполнено
      }}
      cancelButtonProps={{
        className: 'nes-btn is-necessary',
      }}
      onCancel={onCancel}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ comment }}>
        <Form.Item
          name="comment"
          rules={[
            {
              required: true,
              message: 'Please enter a comment',
            },
          ]}>
          <TextArea
            placeholder="New comment"
            value={comment}
            onChange={onCommentChange}
            className="nes-textarea"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default CommentModal
