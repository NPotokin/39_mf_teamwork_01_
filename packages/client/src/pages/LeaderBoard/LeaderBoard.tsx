import styles from './LeaderBord.module.scss'
import { Avatar } from 'antd'
import { useEffect, useState } from 'react'
import cn from 'classnames'
import { leaderboardData } from './mockData'
import { UniversalTable } from '@/components/Table'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import holder from '@images/logo_sm.svg'

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

  const avatarSrc = avatar => (avatar ? avatar : holder)

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
          <Avatar src={avatarSrc(record.avatarUrl)} />
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
    <div className={cn(styles.wrapper, 'page')}>
      <Header />
      <div className={cn(styles.leaderBoard, 'container')}>
        <div className={styles.leaderBoard__table}>
          <UniversalTable
            data={dataSource}
            columns={columns}
            rowKey="key"
            scroll={{ y: 476 }}
            pagination={false}
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default LeaderBoard
