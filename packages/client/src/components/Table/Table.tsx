import { Table } from 'antd'
import { ReactNode } from 'react'
import {
  ColumnsType,
  TablePaginationConfig,
} from 'antd/es/table'
import styles from './Table.module.scss'

export type TableData = {
  key: string
  [key: string]: unknown
}
export type TableColumns<T> = ColumnsType<T>

type UniversalTableProps<T> = {
  data: T[]
  columns: TableColumns<T>
  pagination?:
    | false
    | TablePaginationConfig
    | undefined
  scroll?: object
  title?: () => ReactNode
  showHeader?: boolean
  rowKey?: number | string
}

const UniversalTable = <T extends TableData>({
  data,
  columns,
  pagination,
  scroll,
  title,
  showHeader,
  rowKey,
}: UniversalTableProps<T>) => {
  return (
    <Table
      dataSource={data}
      columns={columns}
      className={styles.table}
      pagination={pagination}
      scroll={scroll}
      title={title}
      showHeader={showHeader}
      rowKey={rowKey}
    />
  )
}
export default UniversalTable
