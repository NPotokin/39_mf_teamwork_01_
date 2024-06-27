import { theme } from 'antd'
import type { ThemeConfig } from 'antd'
import commonTokens from './commonTokens'

const { darkAlgorithm } = theme

const darkTheme: ThemeConfig = {
  algorithm: darkAlgorithm,
  token: {
    ...commonTokens.token,
    colorText: '#f4f4f4',
  },
  components: {
    ...commonTokens.components,
    Form: {
      labelColor: '#f4f4f4',
      colorText: 'f4f4f4',
    },
  },
}

export default darkTheme
