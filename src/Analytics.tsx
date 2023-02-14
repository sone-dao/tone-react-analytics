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
    } else {
      setAnalyticsSessionId(analyticsToken)
    }
  }, [])

  useEffect(() => {
    /* Log changing of path in analytics */
  }, [router.asPath])

  return <>{children}</>
}

export default Analytics
