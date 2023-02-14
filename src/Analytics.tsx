import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export interface IAnalyticsProps {
  children: React.ReactNode
}

const Analytics: React.FC<IAnalyticsProps> = ({ children }) => {
  const [analyticsSessionId, setAnalyticsSessionId] = useState<string>()

  const router = useRouter()

  useEffect(() => {
    const analyticsToken = sessionStorage.getItem('sone.analytics')

    if (!analyticsToken) {
      const data = {
        dimensions: {
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
    /* Log changing of path in analytics */
  }, [router.asPath])

  useEffect(() => console.log(analyticsSessionId), [analyticsSessionId])

  return <>{children}</>
}

export default Analytics

async function sendToAnalytics(sessionId: string, data: any) {
  return await fetch('https://analytics.sone.works', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ service: 'tone-app', sessionId, data }),
  })
    .then((response) => response.json())
    .then((data) => !data.ok && console.log(data.message))
    .catch((error) => console.log(error))
}

interface ISessionData {
  dimensions: {
    width: number
    height: number
  }
  languages: readonly string[]
  userAgent: string
}

async function establishAnalyticsSession(
  sessionData: ISessionData,
  setSessionId: Function
) {
  return await fetch('/api/establish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sessionData),
  })
    .then((response) => response.json())
    .then((data) =>
      data.ok
        ? setSessionId(data.sessionId)
        : console.log('ERROR ESTABLISHING ANALYTICS SESSION')
    )
    .catch((error) => console.log(error))
}
