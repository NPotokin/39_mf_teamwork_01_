import { useNavigate } from 'react-router'
import styles from './LeaderBord.module.scss'
import { Avatar, Button, Table } from 'antd'
import { useEffect, useState } from 'react'
import { leaderboardData } from './mockData'
import { RoutePath } from '@/core/Routes.enum'
import cn from 'classnames'

export type Comment = {
  key: string
  comment: string
  emoji: string
}

export type LeaderboardEntry = {
  key: string
  index: number
  name: string
  score: number
  commentsCount: string
  content: string
  avatarUrl: string
  comments: Comment[]
}

const LeaderBoard = () => {
  const [dataSource, setDataSource] = useState<LeaderboardEntry[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const data = leaderboardData.sort((a, b) => b.score - a.score)
      setDataSource(data)
    }
    fetchData()
  }, [])
  const navigate = useNavigate()

  const columns = [
    {
      title: '№',
      key: 'index',
      render: (_: string, __: LeaderboardEntry, index: number) => index + 1,
      width: 60,
    },
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      render: (text: string, record: LeaderboardEntry) => (
        <div className={styles.columns__name}>
          <Avatar
            src={
              record.avatarUrl
                ? record.avatarUrl
                : 'https://c-int-sf.smule.com/rs-s38-int/sing/performance/cover/3b/f8/b352f35f-7c02-4bca-86b0-eafba9cd0a33_1024.png'
            }
          />
          <a className={styles[`columns__name--text`]}>{text}</a>
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
    <div className={styles.wrapper}>
      <div className={styles.leaderBoard}>
        <h1 className={styles.leaderBoard__header}>Leaderboard</h1>
        <Table
          className={styles.leaderBoard__table}
          dataSource={dataSource}
          columns={columns}
          rowKey="key"
          scroll={{ y: 476 }}
          pagination={false}
        />
        <div className={styles.leaderBoard__btn}>
          <Button
            className={cn(styles['leaderBoard__btn'], 'nes-btn  is-secondary1')}
            onClick={() => navigate(RoutePath.HOME)}>
            Back
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LeaderBoard
