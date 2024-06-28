import React from 'react'
import { Modal, Image, Flex, Button } from 'antd'
import { Link } from 'react-router-dom'

type GameModalProps = {
  visible: boolean
  imageSrc: string
  title: string
  titleClass?: string
  subtitle: string
  onYesClick: () => void
}

const GameModal: React.FC<GameModalProps> = ({
  visible,
  imageSrc,
  title,
  titleClass,
  subtitle,
  onYesClick,
}) => {
  return (
    <Modal open={visible} footer={null} centered={true} closable={false}>
      <Flex vertical={true} align="center" gap="large">
        <Image preview={false} src={imageSrc} width={100} />
        <h1 className={titleClass}>{title}</h1>
        <h2>{subtitle}</h2>
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
