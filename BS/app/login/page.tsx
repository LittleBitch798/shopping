'use client'

import { useState } from 'react'
import axios from 'axios'

export default function LoginPage() {
  const [form, setForm] = useState({ phone: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    if (!form.phone || !form.password) {
      setError('请输入手机号和密码')
      setLoading(false)
      return
    }
    try {
      const res = await axios.post('/api/proxy/login', form)
      setLoading(false)
      window.location.href = '/home'
    } catch (err: any) {
      setLoading(false)
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error)
      } else {
        setError('登录失败，请稍后重试')
      }
    }
  }

  return (
    <div className='w-screen min-h-screen flex flex-col'>
      <div className='flex justify-center mt-16'>
        <h1 className='text-5xl font-bold italic tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600'>
          BS Store
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto py-4 px-4 h-full mt-20">
        <div className='flex flex-col h-full'>
          <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center card shadow-xl p-4 space-y-4 h-full w-full">
            <div className="text-2xl mb-2 w-full text-left">欢迎登录BS官网</div>
            <div className="form-control w-full">
              <input
                name="phone"
                type="text"
                placeholder="手机号"
                className="w-full bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-primary px-0 py-1 h-12"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control w-full">
              <input
                name="password"
                type="password"
                placeholder="密码"
                className="w-full bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-primary px-0 py-1 h-12"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <button 
              type="submit" 
              className={`btn btn-primary w-full bg-pink-100 text-gray-500 ${loading ? 'btn-disabled' : ''}`}
            >
              {loading ? '登录中...' : '登录'}
            </button>
            {error && <div className="text-error">{error}</div>}
            <button 
              type="button" 
              className="btn btn-sm btn-ghost"
              onClick={() => window.location.href = '/userTable'}
            >
              前往注册
            </button>
          </form>
        </div>
        <div className='hidden md:block h-full'>
          <img 
            src="img/门店.jpg" 
            alt=""
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  )
}