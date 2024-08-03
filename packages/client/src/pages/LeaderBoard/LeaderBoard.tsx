import styles from './LeaderBord.module.scss'
import { Avatar, Pagination } from 'antd'

import { useEffect, useState } from 'react'
import cn from 'classnames'
import { UniversalTable } from '@/components/Table'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import holder from '@images/logo_sm.svg'
import {
  RESOURCE_URL,
  TITLES,
} from '@/lib/constants'
import useDocumentTitle from '@/lib/hooks/useDocumentTitle'
import LeaderboardApi from '@/core/api/leaderBord.api'

export type Comment = {
  key: string
  comment: string
  emoji: string
}

export type LeaderboardEntry = {
  key: string
  index: number
  name: string
  score?: number
  avatarUrl: string
}

const LeaderBoard = () => {
  useDocumentTitle(TITLES.LEADER_BOARD)
  const [dataSource, setDataSource] = useState<
    LeaderboardEntry[]
  >([])
  const [total, setTotal] = useState<number>(0)
  const [currentPage, setCurrentPage] =
    useState<number>(1)
  const [pageSize, setPageSize] =
    useState<number>(10)
  const leaderboardApi = new LeaderboardApi()
  const fetchData = async (
    cursor: number,
    limit: number
  ) => {
    try {
      const response =
        await leaderboardApi.getAllLeaderboard(
          cursor,
          limit
        )
      const rawData = response.data

      let formattedData
      if (Array.isArray(rawData)) {
        formattedData = rawData.map(
          (entry, index) => ({
            key: entry.data.userLogin + index,
            index: index + 1,
            name: entry.data.userLogin,
            score:
              entry.data.pumpkinPandasScoreField,
            avatarUrl: entry.data.avatar,
          })
        )
      }
      if (formattedData) {
        const sortedData = formattedData.sort(
          (a, b) => b.score - a.score
        )
        setDataSource(sortedData)
        setTotal(formattedData.length)
      }
    } catch (error) {
      console.error(
        'Error fetching leaderboard data:',
        error
      )
    }
  }

  useEffect(() => {
    fetchData(
      (currentPage - 1) * pageSize,
      pageSize
    )
  }, [currentPage, pageSize])

  const avatarSrc = (avatar: string) =>
    avatar ? `${RESOURCE_URL}${avatar}` : holder

  const columns = [
    {
      title: '№',
      key: 'index',
      render: (
        _: string,
        __: LeaderboardEntry,
        index: number
      ) => index + 1,
      width: 60,
    },
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      render: (
        text: string,
        record: LeaderboardEntry
      ) => (
        <div className={styles.columns__name}>
          <Avatar
            src={avatarSrc(record.avatarUrl)}
          />
          <a
            className={
              styles[`columns__name--text`]
            }>
            {text}
          </a>
        </div>
      ),
    },
    {
      title: 'SCORE',
      dataIndex: 'score',
      key: 'score',
    },
  ]

  return (
    <div className={cn(styles.wrapper, 'page')}>
      <Header />
      <div
        className={cn(
          styles.leaderBoard,
          'container'
        )}>
        <div
          className={styles.leaderBoard__table}>
          <UniversalTable
            data={dataSource}
            columns={columns}
            rowKey="key"
            scroll={{ y: 476 }}
            pagination={false}
          />
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={total}
            onChange={(page, pageSize) => {
              setCurrentPage(page)
              setPageSize(pageSize)
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default LeaderBoard
