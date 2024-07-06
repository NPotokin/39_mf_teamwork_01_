import { Modal, Image, Flex, Button } from 'antd'
import React, { useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'

type GameModalProps = {
  visible: boolean
  imageSrc: string
  title: string
  titleClass?: string
  subtitle: string
  onYesClick: VoidFunction
  score: number
}

const GameModal: React.FC<GameModalProps> = ({
  visible,
  imageSrc,
  title,
  titleClass,
  subtitle,
  onYesClick,
  score,
}) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!visible) return
      if (event.key === 'Enter') {
        onYesClick()
      }
    },
    [visible]
  )
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <Modal open={visible} footer={null} centered={true} closable={false}>
      <Flex vertical={true} align="center" gap="large">
        <Image preview={false} src={imageSrc} width={100} />
        <h1 className={titleClass}>{title}</h1>
        <h2>{subtitle}</h2>
        <span>Score: {score}</span>
        <Flex gap="large">
          <Button className="nes-btn is-primary" onClick={onYesClick}>
            Yes
          </Button>
          <Link to="/" className="nes-btn">
            No
          </Link>
        </Flex>
      </Flex>
    </Modal>
  )
}

export default GameModal
