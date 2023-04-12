import React, { createContext, useEffect, useState } from 'react'

interface ISessionData {
  id?: string
  screen: {
    width: number
    height: number
  }
  languages: readonly string[]
  userAgent: string
}

const sessionDataDefaults: ISessionData = {
  screen: {
    width: 0,
    height: 0,
  },
  languages: [],
  userAgent: '',
}

interface IAnalyticsContext {
  sessionData: ISessionData
}

const analyticsContextDefaults: IAnalyticsContext = {
  sessionData: sessionDataDefaults,
}

export const AnalyticsContext = createContext<IAnalyticsContext>(
  analyticsContextDefaults
)

interface IAnalyticsProviderProps {
  children: React.ReactNode
}

const AnalyticsProvider: React.FC<IAnalyticsProviderProps> = ({ children }) => {
  const [sessionData, setSessionData] =
    useState<ISessionData>(sessionDataDefaults)

  /*const router = useRouter()
  const analyticsSessionId = analyticsSession?.id || ''*/

  useEffect(() => {
    //const analyticsToken = sessionStorage.getItem('tone.analytics')

    //if (!analyticsToken) {
    const sessionData = {
      screen: {
        width: screen.width,
        height: screen.height,
      },
      languages: navigator.languages,
      userAgent: navigator.userAgent,
    }

    setSessionData(sessionData)
    //establishAnalyticsSession(data)
    //}
  }, [])

  return (
    <AnalyticsContext.Provider value={{ sessionData }}>
      {children}
    </AnalyticsContext.Provider>
  )

  /*useEffect(() => {
    if (analyticsSessionId && router.asPath)
      sendToAnalytics(analyticsSessionId, {
        action: 'navigation',
        path: router.asPath,
      })
  }, [router.asPath])

  useEffect(() => {
    if (analyticsSessionId)
      sessionStorage.setItem('sone.analytics', analyticsSessionId)
  }, [analyticsSessionId])*/

  /*async function sendToAnalytics(sessionId: string, data: any) {
    return await fetch('https://api.tone.audio/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId, data }),
    })
      .then((response) => response.json())
      .then((data) => !data.ok && console.log(data.message))
      .catch((error) => console.log(error))
  }*/

  /*async function establishAnalyticsSession(sessionData: ISessionData) {
    return await fetch('https://api.tone.audio/analytics/establish', {
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
  }*/
}

export default AnalyticsProvider
