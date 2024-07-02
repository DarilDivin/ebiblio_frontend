'use client'

import { useAuth } from '@/hooks/auth'
import React from 'react'

const Home = () => {
  const { user, isLoading, logout } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: '/livres'
  })

  if (isLoading || !user) return <div>Chargement...</div>

  console.log(user)

  return (
    <>
      <p>Welcome back in your HomePage {user?.name}</p>
      <button onClick={logout}>
        Logout
      </button>
    </>
  )
}

export default Home