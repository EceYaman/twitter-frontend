import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../api'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const history = useHistory()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const { data } = await api.post('/auth/login', { username, password })
      localStorage.setItem('token', data.token)
      history.push('/tweets')
    } catch (err) {
      setError(err.response?.data?.message || 'Giriş başarısız')
    }
  }

  return (
    <section className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Giriş Yap</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1">Kullanıcı Adı</label>
          <input
            id="username"
            className="w-full border p-2 rounded"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Şifre</label>
          <input
            id="password"
            type="password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Giriş
        </button>
      </form>
    </section>
  )
}