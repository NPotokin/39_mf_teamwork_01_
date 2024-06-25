import React from 'react'
import { Modal, Image, Flex, Button, ConfigProvider } from 'antd'
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
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: 'rgba(255, 255, 255, 0.3)',
          },
        },
      }}>
      <Modal open={visible} footer={null} centered={true} closable={false}>
        <Flex vertical={true} align="center" gap="large">
          <Image preview={false} src={imageSrc} width={100} />
          <h1 className={titleClass}>{title}</h1>
          <h2>{subtitle}</h2>
          <Flex gap="large">
            <Button
              size="large"
              type="primary"
              className="nes-btn is-warning"
              onClick={onYesClick}>
              Yes
            </Button>
            <Link to="/">
              <Button size="large" type="default" className="nes-btn">
                No
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Modal>
    </ConfigProvider>
  )
}

export default GameModal
