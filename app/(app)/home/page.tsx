'use client'

import { useAuth } from '@/hooks/auth'
import React from 'react'

const Home = () => {
  const { user, logout } = useAuth({
    middleware: "auth"
  })

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