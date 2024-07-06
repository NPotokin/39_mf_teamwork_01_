import { Modal, Image, Flex, Button, Form, Select } from 'antd'
import React, { useEffect, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import pandaWin from '@images/panda_win.svg'
import styles from './StartModal.module.scss'
import type { Level } from '@/pages/Game/Game'
import cn from 'classnames'

type StartModalProps = {
  visible: boolean
  onYesClick: (level: Level, difficulty: string) => void
}

const StartModal: React.FC<StartModalProps> = ({ visible, onYesClick }) => {
  const [form] = Form.useForm()
  const [isFormValid, setIsFormValid] = useState(false)

  const handleFinish = (values: Record<string, Level>) => {
    onYesClick(values.level, values.difficulty)
  }

  const levels = [
    { label: <span>Level One</span>, value: 'levelOne', key: 'levelOne' },
    { label: <span>Level Two</span>, value: 'levelTwo', key: 'levelTwo' },
    { label: <span>Level Three</span>, value: 'levelThree', key: 'levelThree' },
  ]

  const difficulties = [
    { label: <span>Easy</span>, value: 'easy', key: 'easy' },
    { label: <span>Moderate</span>, value: 'moderate', key: 'moderate' },
    { label: <span>Hard</span>, value: 'hard', key: 'hard' },
  ]

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!visible) return
      if (event.key === 'Enter') {
        form.submit()
      }
    },
    [form, visible]
  )

  const onFormatValueChange = (
    _: unknown,
    allValues: Record<string, string>
  ) => {
    const isValid = !!(allValues.level && allValues.difficulty)
    setIsFormValid(isValid)
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <Modal open={visible} footer={null} centered={true} closable={false}>
      <Flex vertical={true} align="center" gap="large">
        <Image preview={false} src={pandaWin} width={100} />
        <h1 className={cn('nes-text', 'is-success')}>Start the game</h1>
        <h2>Are you ready?</h2>
        <Form
          form={form}
          onFinish={handleFinish}
          onValuesChange={onFormatValueChange}
          className={styles.form}>
          <Form.Item name="level">
            <Select placeholder="Select Level" className="nes-select">
              {levels.map(level => (
                <Select.Option key={level.key} value={level.value}>
                  {level.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="difficulty">
            <Select placeholder="Select Difficulty" className="nes-select">
              {difficulties.map(difficulty => (
                <Select.Option key={difficulty.key} value={difficulty.value}>
                  {difficulty.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Flex gap="large">
            <Button
              htmlType="submit"
              className="nes-btn is-primary"
              disabled={!isFormValid}>
              Yes
            </Button>
            <Link to="/" className="nes-btn">
              No
            </Link>
          </Flex>
        </Form>
      </Flex>
    </Modal>
  )
}

export default StartModal
