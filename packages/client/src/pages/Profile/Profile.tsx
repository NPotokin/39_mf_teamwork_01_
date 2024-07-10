import { useReducer } from 'react'
import classNames from 'classnames'
import { Button } from 'antd'

import { useAppSelector } from '@/lib/hooks/redux'
import { TITLES } from '@/lib/constants'
import useDocumentTitle from '@/lib/hooks/useDocumentTitle'
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
import styles from './Profile.module.scss'

const Profile = () => {
  useDocumentTitle(TITLES.PROFILE)
  const [state, dispatch] = useReducer<
    React.Reducer<ProfileState, ProfileAction>
  >(profileReducer, initialState)
  const user = useAppSelector(state => state.user)

  return (
    <div
      className={classNames(styles.root, 'page')}>
      <Header />
      <div
        className={classNames(
          styles.container,
          'container'
        )}>
        <div className={styles.card}>
          {state.view === 'info' && (
            <>
              <ProfileInfo {...user} />
              <div className={styles.footer}>
                <Button
                  className={classNames(
                    styles.button,
                    'nes-btn is-primary'
                  )}
                  onClick={() =>
                    dispatch({
                      type: actionTypes.EDIT_PROFILE,
                    })
                  }>
                  Edit
                </Button>
                <Button
                  className={classNames(
                    styles.button,
                    'nes-btn is-secondary1'
                  )}
                  onClick={() =>
                    dispatch({
                      type: actionTypes.EDIT_PASSWORD,
                    })
                  }>
                  Change password
                </Button>
              </div>
            </>
          )}
          {state.view === 'editPassword' && (
            <PasswordForm
              onCancel={() =>
                dispatch({
                  type: actionTypes.SHOW_INFO,
                })
              }
            />
          )}
          {state.view === 'editProfile' && (
            <ProfileForm
              {...user}
              onCancel={() =>
                dispatch({
                  type: actionTypes.SHOW_INFO,
                })
              }
            />
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Profile
