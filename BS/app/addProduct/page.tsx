'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

interface Product {
  id: number
  name: string
  description: string
  mainImageUrl: string
  createdAt: string
}

export default function AddProductPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ 
    name: '', 
    description: '', 
    mainImageUrl: '' 
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/api/proxy/addProduct')
      setProducts(res.data)
    } catch {
      setError('获取商品列表失败')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      await axios.post('/api/proxy/addProduct', form)
      setForm({ name: '', description: '', mainImageUrl: '' })
      setSuccess(true)
      fetchProducts()
    } catch {
      setError('创建商品失败！')
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
            <div className="text-2xl mb-2 w-full text-left">添加新商品</div>
            <div className="form-control w-full">
              <input
                name="name"
                type="text"
                placeholder="商品名称"
                className="w-full bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-primary px-0 py-1 h-12"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control w-full">
              <input
                name="description"
                type="text"
                placeholder="商品描述"
                className="w-full bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-primary px-0 py-1 h-12"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control w-full">
              <input
                name="mainImageUrl"
                type="text"
                placeholder="商品图片URL"
                className="w-full bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-primary px-0 py-1 h-12"
                value={form.mainImageUrl}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full bg-pink-100 text-gray-500">添加商品</button>
            {error && <div className="text-error">{error}</div>}

            {success && (
              <div className="alert alert-success shadow-lg bg-purple-200">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>商品添加成功！</span>
                </div>
              </div>
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