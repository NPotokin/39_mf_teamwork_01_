import { Link } from 'react-router-dom'

import { RoutePath } from '@/core/Routes.enum'

const Home = () => (
  <>
    <h1>Home page</h1>
    <Link className="nes-btn" to={RoutePath.GAME}>
      GAME page
    </Link>
    <Link className="nes-btn" to={RoutePath.SIGN_IN}>
      Login page
    </Link>
    <Link className="nes-btn is-primary" to={RoutePath.SIGN_UP}>
      Registration page
    </Link>
    <Link className="nes-btn is-success" to={RoutePath.PROFILE}>
      Profile page
    </Link>
    <Link className="nes-btn is-warning" to={RoutePath.LEADER_BOARD}>
      Leader page
    </Link>
    <Link className="nes-btn is-error" to={RoutePath.FORUM}>
      Forum page
    </Link>
  </>
)

export default Home
