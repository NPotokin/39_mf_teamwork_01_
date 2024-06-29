import React from 'react'
import styles from './UploadAvatar.module.css'

type UploadAvatarProps = {
  preview?: string | ArrayBuffer | null
  onChange?(file: File): void
}

const UploadAvatar: React.FC<UploadAvatarProps> = ({ onChange, preview }) => {
  const previewStyle = preview
    ? {
        backgroundImage: `url(${preview})`,
      }
    : {}

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target
    const file = target.files?.[0]
    if (file) {
      onChange && onChange(file)
    }
    target.value = ''
  }

  return (
    <>
      <label className={styles.upload} htmlFor="avatar">
        <input
          type="file"
          name="avatar"
          id="avatar"
          accept="image/*"
          onChange={handleChange}
        />
        <span className={styles.action}>
          <span className={styles.icon}></span>
          <span className={styles.title}>Upload photo</span>
        </span>
        <span className={styles.preview} style={previewStyle}></span>
      </label>
    </>
  )
}

export default UploadAvatar
