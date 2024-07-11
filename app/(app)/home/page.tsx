'use client'

import { useAuth } from '@/hooks/auth'
import React from 'react'

const Home = () => {
  const { user, isLoading, logout } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: '/livres'
  })

  // if (isLoading || !user) return <div>Chargement...</div>

  return (
    <div className='h-screen'>
      {isLoading || !user ? (
        <div>Chargement...</div>
      ) : (
        <div>Tadam...</div>
      )}
      
    </div>
  )
}

export default Home