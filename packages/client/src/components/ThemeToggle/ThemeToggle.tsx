import { Button } from 'antd'
import classNames from 'classnames'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'

import { useTheme } from '@/core/contexts'

type ThemeToggleProps = {
  className?: string
  onChange?(): void
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className, onChange }) => {
  const { theme, toggleTheme } = useTheme()

  const handleClick = () => {
    toggleTheme()
    if (onChange) onChange()
  }
  return (
    <Button className={className || ''} type="link" onClick={handleClick}>
      {theme === 'light' ? <MoonOutlined /> : <SunOutlined />}
    </Button>
  )
}

export default ThemeToggle
