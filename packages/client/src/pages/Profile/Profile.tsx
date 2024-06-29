import { useEffect, useReducer } from 'react'
import classNames from 'classnames'
import { Button } from 'antd'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ProfileInfo } from '@/components/ProfileInfo'
import { PasswordForm } from '@/components/PasswordForm'
import { ProfileForm } from '@/components/ProfileForm'
import {
  ProfileAction,
  ProfileState,
  actionTypes,
  initialState,
  profileReducer,
} from './reducer/Profile.reducer'
import { userData } from './mocks/userData'
import styles from './Profile.module.scss'

const Profile = () => {
  const [state, dispatch] = useReducer<
    React.Reducer<ProfileState, ProfileAction>
  >(profileReducer, initialState)

  useEffect(() => {
    //TODO get request for user profile
  }, [])

  return (
    <div className={classNames(styles.root, 'page')}>
      <Header />
      <div className={classNames(styles.container, 'container')}>
        <div className={styles.card}>
          {state.view === 'info' && (
            <>
              <ProfileInfo {...userData} />
              <div className={styles.footer}>
                <Button
                  className={classNames(styles.button, 'nes-btn is-primary')}
                  onClick={() => dispatch({ type: actionTypes.EDIT_PROFILE })}>
                  Edit
                </Button>
                <Button
                  className={classNames(styles.button, 'nes-btn is-secondary1')}
                  onClick={() => dispatch({ type: actionTypes.EDIT_PASSWORD })}>
                  Change password
                </Button>
              </div>
            </>
          )}
          {state.view === 'editPassword' && (
            <PasswordForm
              onCancel={() => dispatch({ type: actionTypes.SHOW_INFO })}
            />
          )}
          {state.view === 'editProfile' && (
            <ProfileForm
              onCancel={() => dispatch({ type: actionTypes.SHOW_INFO })}
            />
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Profile
