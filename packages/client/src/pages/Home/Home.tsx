import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'

import { Hero } from '@/components/Hero'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { SectionJoin } from '@/components/SectionJoin'
import { SectionFeatures } from '@/components/SectionFeatures'
import styles from './Home.module.scss'

const Home = () => (
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

export default Home
