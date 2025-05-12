import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../api'

export default function RegisterForm() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    bio: '',
    profilePhotoUrl: ''
  })
  const [error, setError] = useState('')
  const history = useHistory()

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const { data } = await api.post('/auth/register', form)
      localStorage.setItem('token', data.token)
      history.push('/tweets')
    } catch (err) {
      setError(err.response?.data?.message || 'Kayıt başarısız')
    }
  }

  return (
    <section className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Kayıt Ol</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1">Kullanıcı Adı</label>
          <input
            id="username"
            name="username"
            type="text"
            className="w-full border p-2 rounded"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full border p-2 rounded"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1">Şifre</label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full border p-2 rounded"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="bio" className="block mb-1">Bio</label>
          <textarea
            id="bio"
            name="bio"
            className="w-full border p-2 rounded"
            value={form.bio}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="profilePhotoUrl" className="block mb-1">Profil Fotoğrafı URL</label>
          <input
            id="profilePhotoUrl"
            name="profilePhotoUrl"
            type="text"
            className="w-full border p-2 rounded"
            value={form.profilePhotoUrl}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Kayıt
        </button>
      </form>
    </section>
  )
}