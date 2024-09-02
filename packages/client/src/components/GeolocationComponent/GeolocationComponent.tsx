import React, { useState, useEffect } from 'react'
import { Button, Tooltip, Spin } from 'antd/lib'
import { ReloadOutlined } from '@ant-design/icons'
import styles from './GeolocationComponent.module.scss'

const API_KEY = 'f2158111-78ed-4212-b3c2-29affc7f1ca4'

const GeolocationDisplay: React.FC = () => {
  const [coordinates, setCoordinates] = useState<{
    latitude: number | null
    longitude: number | null
  }>({ latitude: null, longitude: null })
  const [loading, setLoading] = useState<boolean>(false)
  const [address, setAddress] = useState<string | null>(null)

  const getAddressFromCoordinates = async (latitude: number, longitude: number) => {
    setLoading(true)

    try {
      const response = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&geocode=${longitude},${latitude}&format=json`
      )
      const data = await response.json()
      const firstGeoObject = data.response.GeoObjectCollection.featureMember[0].GeoObject
      const address = firstGeoObject.metaDataProperty.GeocoderMetaData.text
      setAddress(address)
    } catch (error) {
      console.error('Error with Yandex API:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLocationUpdate = () => {
    setLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords

          setCoordinates({ latitude, longitude })
          getAddressFromCoordinates(latitude, longitude)
          localStorage.setItem('userCoordinates', JSON.stringify({ latitude, longitude }))
        },
        error => {
          console.error('Error getting location:', error)
          setLoading(false)
        }
      )
    } else {
      console.error('Geolocation is not supported by this browser.')
      setLoading(false)
    }
  }

  useEffect(() => {
    const savedCoordinates = localStorage.getItem('userCoordinates')
    if (savedCoordinates) {
      const { latitude, longitude } = JSON.parse(savedCoordinates)
      setCoordinates({ latitude, longitude })
      getAddressFromCoordinates(latitude, longitude)
    }
  }, [])

  return (
    <div className={styles.container}>
      {coordinates.latitude !== null && coordinates.longitude !== null ? (
        <Button
          className={styles.refreshButton}
          type="link"
          onClick={handleLocationUpdate}
          disabled={loading}>
          <ReloadOutlined />
        </Button>
      ) : (
        <Button
          className={styles.locationButton}
          type="link"
          onClick={handleLocationUpdate}
          disabled={loading}>
          Get Location
        </Button>
      )}

      {loading ? (
        <Spin />
      ) : (
        <>
          {address && (
            <div className={styles.address}>
              <Tooltip title={`${address}`}>
                <div className={styles.coordinate}>{address}</div>
              </Tooltip>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default GeolocationDisplay
