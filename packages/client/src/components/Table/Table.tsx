import { Table } from 'antd'
import { FC } from 'react'
import { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import styles from './Table.module.scss'

export type TableData = {
  key: string
  [key: string]: unknown
}
export type TableColumns<T> = ColumnsType<T>

type UniversalTableProps = {
  data: unknown[]
  /* eslint-disable */
  columns: TableColumns<any>
  pagination?: false | TablePaginationConfig | undefined
  scroll?: object
  /* eslint-disable */
  title?: any
  showHeader?: boolean
  rowKey?: number | string
}

const UniversalTable: FC<UniversalTableProps> = ({
  data,
  columns,
  pagination,
  scroll,
  title,
  showHeader,
  rowKey,
}) => {
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
