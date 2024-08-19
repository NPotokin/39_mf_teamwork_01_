import { createContext, useState, FC, useContext, PropsWithChildren } from 'react'

export type Comment = {
  commentId: string
  content: string
  topicId: string
  emoji?: string
  topic?: Topic
}

export type Topic = {
  topicId: string
  name: string
  description: string
  count: string
  comments: Comment[]
}

type ForumContextType = {
  dataSource: Topic[]
  setDataSource: (data: Topic[]) => void
  selectedTopic: Topic | null
  setSelectedTopic: (topic: Topic | null) => void
  selectedComments: Comment[]
  setSelectedComments: (comments: Comment[]) => void
}

export const ForumContext = createContext<ForumContextType | undefined>(undefined)

export const ForumProvider: FC<PropsWithChildren> = ({ children }) => {
  const [dataSource, setDataSource] = useState<Topic[]>([])
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const [selectedComments, setSelectedComments] = useState<Comment[]>([])

  return (
    <ForumContext.Provider
      value={{
        dataSource,
        setDataSource,
        selectedTopic,
        setSelectedTopic,
        selectedComments,
        setSelectedComments,
      }}>
      {children}
    </ForumContext.Provider>
  )
}

export const useForum = () => {
  const context = useContext(ForumContext)
  if (context === undefined) {
    throw new Error('useForum must be used within a ForumProvider')
  }
  return context
}
