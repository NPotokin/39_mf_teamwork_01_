import { RESOURCE_URL } from '@/lib/constants'
import { IUserInfo } from '@/core/api/model'
import holder from '@images/logo_sm.svg'
import styles from './ProfileInfo.module.scss'

const ProfileInfo: React.FC<IUserInfo> = ({
  first_name,
  second_name,
  display_name,
  login,
  phone,
  email,
  avatar,
}) => {
  const avatarSrc = avatar ? `${RESOURCE_URL}${avatar}` : holder
  const userName = `${first_name} ${second_name}`

  return (
    <>
      <div className={styles.card}>
        <div className={styles.person}>
          <img className={styles.avatar} src={avatarSrc} alt="avatar" />
          <span className={styles.info}>
            <span>{userName}</span>
            <a className={styles.link} href={`mailto:${email}`}>
              {email}
            </a>
          </span>
        </div>
        <p>
          <span className={styles.title}>Login</span>: {login}
        </p>
        {display_name && (
          <p>
            <span className={styles.title}>Display name</span>: {display_name}
          </p>
        )}
        <p>
          <span className={styles.title}>Phone</span>:{' '}
          <a className={styles.link} href={`tel:${phone}`}>
            {phone}
          </a>
        </p>
      </div>
    </>
  )
}

export default ProfileInfo
