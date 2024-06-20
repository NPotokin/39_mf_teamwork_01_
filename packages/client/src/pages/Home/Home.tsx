import { Link } from 'react-router-dom'

const Home = () => (
  <>
    <h1>Home page</h1>
    <Link className="nes-btn is-primary" to="profile">
      Profile page
    </Link>
  </>
)

export default Home
