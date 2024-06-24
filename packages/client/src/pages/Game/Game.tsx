import React, { useState } from 'react'
import { Button, Modal, Image, Flex, ConfigProvider } from 'antd'
import styles from './styles.module.scss'
import logo from '@images/panda_start.svg'
import { Link } from 'react-router-dom'
import themeConfig from '@/core/themeConfig'

const Game: React.FC = () => {
  const [isStartModalVisible, setIsStartModalVisible] = useState(true)

  const handleStartModalButton = () => {
    setIsStartModalVisible(false)
  }

  return (
    <div className={styles.game}>
      <ConfigProvider theme={themeConfig}>
        <Modal
          open={isStartModalVisible}
          footer={null}
          centered={true}
          closable={false}>
          <Flex vertical={true} align="center" gap="large">
            <Image preview={false} src={logo} width={100} />
            <h1>Start the game</h1>
            <h2>Are you ready?</h2>
            <Flex gap="large">
              <Button
                size="large"
                type="primary"
                className="nes-btn is-warning"
                onClick={handleStartModalButton}>
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
    </div>
  )
}

export default Game
