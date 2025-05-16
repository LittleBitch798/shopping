'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

interface UserTable {
  id: number
  username: string
  phone: string
  createdAt: string
}

export default function UserManagePage() {
  const [users, setUsers] = useState<UserTable[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ username: '', password: '', phone: '', captcha: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [captchaText, setCaptchaText] = useState('')
  const [captchaInput, setCaptchaInput] = useState('')
  
  // 生成随机验证码
  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptchaText(result)
    return result
  }
  
  useEffect(() => {
    generateCaptcha()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/api/proxy/userTable')
      setUsers(res.data)
    } catch {
      setError('获取用户列表失败')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    // 验证码校验
    if (captchaInput !== captchaText) {
      setError('验证码错误')
      generateCaptcha()
      return
    }
    
    try {
      await axios.post('/api/proxy/userTable', form)
      setForm({ username: '', password: '', phone: '', captcha: '' })
      setSuccess(true)
      generateCaptcha()
    } catch {
      setError('创建用户失败，用户名或手机号重复！')
      generateCaptcha()
    }
  }

  return (
    <div className='w-screen min-h-screen flex flex-col'>
      <div className='flex justify-center mt-16'>  {/* 减少顶部间距 */}
        <h1 className='text-5xl font-bold italic tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600'>
          BS Store
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto py-4 px-4 h-full mt-20">
        <div className='flex flex-col h-full'>
          <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center card shadow-xl p-4 space-y-4 h-full w-full">
            <div className="text-2xl mb-2 w-full text-left">欢迎注册BS官网</div>
            <div className="form-control w-full">
              <input
                name="username"
                type="text"
                placeholder="用户名"
                className="w-full bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-primary px-0 py-1 h-12"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>
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
            <div className="form-control w-full">
              <div className="flex items-center gap-2 w-full">
                <input
                  name="captcha"
                  type="text"
                  placeholder="验证码"
                  className="w-full bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-primary px-0 py-1 h-12"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  required
                />
                <div 
                  className="w-24 h-10 bg-gray-200 flex items-center justify-center cursor-pointer select-none"
                  onClick={generateCaptcha}
                >
                  {captchaText}
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-full bg-pink-100 text-gray-500">注册</button>
            {error && <div className="text-error">{error}</div>}
            {/* <button 
                  className="btn btn-sm btn-ghost w-full"
                  onClick={() => window.location.href = '/login'}
                >
                  前往登录
            </button> */}

            {success ? (
              <div className="alert alert-success shadow-lg bg-purple-200">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>注册成功！</span>
                </div>
                <div className="flex-none">
                  <button 
                    className="btn btn-sm btn-ghost"
                    onClick={() => window.location.href = '/login'}
                  >
                    前往登录
                  </button>
                </div>
              </div>
            ) : (
              <button 
                className="btn btn-ghost flex items-center gap-2"
                onClick={() => window.location.href = '/login'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              
              </button>
            )}
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