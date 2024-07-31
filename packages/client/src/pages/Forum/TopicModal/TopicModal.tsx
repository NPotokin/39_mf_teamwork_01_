import { Input, Modal, Form } from 'antd/lib'
import TextArea from 'antd/lib/input/TextArea'
import {
  ChangeEvent,
  FC,
  useEffect,
  useState,
} from 'react'

type TopicModalProps = {
  visible: boolean
  topicName: string
  topicContent: string
  onOk: VoidFunction
  onCancel: VoidFunction
  onTopicNameChange: (
    e: ChangeEvent<HTMLInputElement>
  ) => void
  onTopicContentChange: (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => void
}

const TopicModal: FC<TopicModalProps> = ({
  visible,
  topicName,
  topicContent,
  onOk,
  onCancel,
  onTopicNameChange,
  onTopicContentChange,
}) => {
  const [form] = Form.useForm()
  const [isFullFields, setIsFullFields] =
    useState(false)
  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        topicContent,
        topicName,
      })
      const values = form.getFieldsValue()

      if (
        values.topicName.length > 0 &&
        values.topicContent.length > 0
      ) {
        setIsFullFields(true)
      } else if (
        values.topicName.length <= 0 ||
        values.topicContent.length <= 0
      ) {
        setIsFullFields(false)
      }
    }
  }, [visible, topicContent, topicName, form])

  // Проверка заполненности полей
  const isFieldsFilled = () => {
    const values = form.getFieldsValue()

    return values.topicName && values.topicContent
  }

  return (
    <Modal
      title="New Topic"
      okText="Add"
      open={visible}
      onOk={() => {
        if (isFieldsFilled()) {
          onOk()
          setIsFullFields(false)
        }
      }}
      okButtonProps={{
        className: 'nes-btn is-secondary1',
        disabled: !isFullFields, // Блокируем кнопку, если поля не заполнены
      }}
      cancelButtonProps={{
        className: 'nes-btn is-necessary',
      }}
      onCancel={onCancel}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          topicName,
          topicContent,
        }}>
        <Form.Item
          name="topicName"
          rules={[
            {
              required: true,
              message:
                'Please enter the topic name',
            },
          ]}>
          <Input
            placeholder="Enter new topic name"
            value={topicName}
            onChange={onTopicNameChange}
            className="nes-input"
          />
        </Form.Item>
        <Form.Item
          name="topicContent"
          rules={[
            {
              required: true,
              message:
                'Please enter the topic content',
            },
          ]}>
          <TextArea
            placeholder="Enter new topic content"
            value={topicContent}
            onChange={onTopicContentChange}
            className="nes-textarea"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default TopicModal
