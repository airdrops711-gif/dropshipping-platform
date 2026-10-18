'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { api } from '@/lib/api'
import { User } from '@/types'

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: { email: string; password: string; name?: string; phone?: string }) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  requireAdmin: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const t = localStorage.getItem('token')
    if (t) {
      setToken(t)
      api.setToken(t)
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const data = await api.login(email, password)
    setToken(data.access_token)
    api.setToken(data.access_token)
  }, [])

  const register = useCallback(async (data: { email: string; password: string; name?: string; phone?: string }) => {
    await api.register(data)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
    api.setToken(null)
  }, [])

  const isAuthenticated = !!token
  const isAdmin = !!user?.is_admin

  const requireAdmin = useCallback(() => {
    return isAuthenticated && isAdmin
  }, [isAuthenticated, isAdmin])

  return (
    <AuthContext.Provider value={{ user, token, isLoading, isAdmin, login, register, logout, isAuthenticated, requireAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
