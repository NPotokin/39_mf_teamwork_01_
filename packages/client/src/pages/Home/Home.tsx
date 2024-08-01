import { Layout } from 'antd/lib'
import { Content } from 'antd/lib/layout/layout'

import { TITLES } from '@/lib/constants'
import useDocumentTitle from '@/lib/hooks/useDocumentTitle'
import { Hero } from '@/components/Hero'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { SectionJoin } from '@/components/SectionJoin'
import { SectionFeatures } from '@/components/SectionFeatures'
import styles from './Home.module.scss'

const Home = () => {
  useDocumentTitle(TITLES.HOME)

  return (
    <Layout className={styles.root}>
      <Header />
      <Content>
        <Hero />
        <SectionFeatures />
        <SectionJoin />
      </Content>
      <Footer />
    </Layout>
  )
}

export default Home
