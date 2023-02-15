import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export interface IAnalyticsProps {
  children: React.ReactNode
}

interface ISessionData {
  screen: {
    width: number
    height: number
  }
  languages: readonly string[]
  userAgent: string
}

const Analytics: React.FC<IAnalyticsProps> = ({ children }) => {
  const [analyticsSessionId, setAnalyticsSessionId] = useState<string>()

  const router = useRouter()

  useEffect(() => {
    const analyticsToken = sessionStorage.getItem('sone.analytics')

    if (!analyticsToken) {
      const data = {
        screen: {
          width: screen.width,
          height: screen.height,
        },
        languages: navigator.languages,
        userAgent: navigator.userAgent,
      }

      establishAnalyticsSession(data, setAnalyticsSessionId)
    } else {
      setAnalyticsSessionId(analyticsToken)
    }
  }, [])

  useEffect(() => {
    if (analyticsSessionId && router.asPath)
      sendToAnalytics(analyticsSessionId, {
        action: 'navigation',
        path: router.asPath,
      })
  }, [router.asPath])

  useEffect(() => {
    if (analyticsSessionId)
      sessionStorage.setItem('sone.analytics', analyticsSessionId)
  }, [analyticsSessionId])

  return <>{children}</>

  async function sendToAnalytics(sessionId: string, data: any) {
    return await fetch('/api/analytics/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId, data }),
    })
      .then((response) => response.json())
      .then((data) => !data.ok && console.log(data.message))
      .catch((error) => console.log(error))
  }

  async function establishAnalyticsSession(
    sessionData: ISessionData,
    setSessionId: Function
  ) {
    console.log('Establishing analytics session...')

    return await fetch('/api/analytics/establish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sessionData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          setSessionId(data.sessionId)
          sendToAnalytics(data.sessionId, {
            action: 'landed',
            path: router.asPath,
          })
        } else {
          console.log('ERROR ESTABLISHING ANALYTICS SESSION')
        }
      })
      .catch((error) => console.log({ message: 'ERROR', error }))
  }
}

export default Analytics
