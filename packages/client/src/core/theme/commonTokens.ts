import type { ThemeConfig } from 'antd'

import {
  colorError,
  colorInfo,
  colorPrimary,
  colorSuccess,
  colorTextBase,
  colorWarning,
} from './colors'

const themeConfig: ThemeConfig = {
  token: {
    colorPrimary,
    colorTextBase,
    colorError,
    colorInfo,
    colorSuccess,
    colorWarning,
    fontFamily: "'Press Start 2P'",
    fontSize: 16,
    borderRadius: 4,
    controlHeight: 48,
    colorBorder: colorTextBase,
  },
  components: {
    Button: {
      colorPrimary,
    },
  },
  cssVar: true,
}
export default themeConfig
