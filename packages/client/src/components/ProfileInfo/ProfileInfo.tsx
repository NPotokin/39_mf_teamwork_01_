import classNames from 'classnames'

import styles from './ProfileInfo.module.scss'

type ProfileInfoProps = {
  firstName: string
  secondName: string
  login: string
  email: string
  phone: string
  avatar: string
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  firstName,
  secondName,
  login,
  phone,
  email,
  avatar,
}) => (
  <>
    <div className={styles.card}>
      <div className={styles.person}>
        <img className={styles.avatar} src={avatar} alt="avatar" />
        <span className={styles.info}>
          <span>
            {firstName}
            {secondName}
          </span>
          <a className={styles.link} href={`mailto:${email}`}>
            {email}
          </a>
        </span>
      </div>
      <p>
        <span className={styles.title}>Login</span>: {login}
      </p>
      <p>
        <span className={styles.title}>Phone</span>:{' '}
        <a className={styles.link} href={`tel:${phone}`}>
          {phone}
        </a>
      </p>
    </div>
  </>
)

export default ProfileInfo
