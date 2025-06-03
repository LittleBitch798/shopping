'use client'

import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import ImageCarousel from '../Dashboard/components/imageCarousel'

interface Product {
  id: string
  id: string
  name: string
  description: string
  mainImageUrl: string
  price: string  // 统一使用 string 类型，与表单中的 price 类型一致
  createdAt: string

}

export default function AddProductPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ 
    id: '',
    id: '',
    name: '', 
    description: '',
    createdAt: '', 
    price: '',
    imageUrls: [''] 
    description: '',
    createdAt: '', 
    price: '',
    imageUrls: [''] 
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const imagesRef = useRef(null)
  const [imagesUrlState,setImagesUrlState] = useState<string[]>([])

  useEffect(() => {
    const validUrls = form.imageUrls.filter(url => url.trim() !== '');
    setImagesUrlState(validUrls);
  }, [form.imageUrls]);

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/api/proxy/addProduct')
      setProducts(res.data)
    } catch (err) {
    } catch (err) {
      setError('获取商品列表失败')
      console.error(err)
      console.error(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // 处理表单输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  // 处理图片URL输入变化
  const handleImageUrlChange = (index: number, value: string) => {
    setForm(prev => {
      const newImageUrls = [...prev.imageUrls]
      newImageUrls[index] = value
      return { ...prev, imageUrls: newImageUrls }
    })
    setError('')
  }

  // 添加新的图片URL输入框
  const addImageUrlField = () => {
    setForm(prev => ({ ...prev, imageUrls: [...prev.imageUrls, ''] }))
  }

  // 移除图片URL输入框
  const removeImageUrlField = (index: number) => {
    setForm(prev => {
      const newImageUrls = [...prev.imageUrls]
      newImageUrls.splice(index, 1)
      return { ...prev, imageUrls: newImageUrls }
    })
  }

  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 表单验证
    const validImageUrls = form.imageUrls.filter(url => url.trim() !== '')
    //数据拆分转化成字符串用,间隔
    const urlsString = JSON.stringify(validImageUrls.join(','))
    console.log("测试",urlsString)
    
    if (!form.name || !form.description || !form.price || validImageUrls.length === 0) {
      setError('请填写所有必填字段并至少提供一个有效的图片URL')
      return
    }

    try {
      // 发送请求
      await axios.post('/api/proxy/addProduct', {
          id:'',
          name: form.name,
          description: form.description,
          price: form.price,
          createdAt: '',
          mainImageUrl: urlsString
      })
      
      // 重置表单
      setForm({ 
        id: '', 
        name: '', 
        description: '', 
        price: '',
        createdAt: '', 
        imageUrls: [''] 
      })
      setSuccess(true)
      fetchProducts()
      
      // 3秒后隐藏成功消息
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      
      // 3秒后隐藏成功消息
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError('创建商品失败！')
      console.error(err)
      console.error(err)
    }
  }

  return (
    <div className="w-screen min-h-screen flex flex-col bg-gradient-to-br from-neutral-100 to-neutral-200">
      
      {/* 内容区 */}
      <div className="pt-24 pb-16 px-4 flex-grow">
        <div className="max-w-6xl mx-auto">
          {/* 标题区域 */}
          <div className="text-center mb-12">
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold italic tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 text-shadow">
              BS Store
            </h1>
            <p className="text-neutral-700 mt-4 text-lg max-w-2xl mx-auto">管理您的商品信息，添加新商品或更新现有商品</p>
          </div>

          {/* 表单和图片区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 表单卡片 */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
                <h2 className="text-2xl font-bold mb-6 text-neutral-800">添加新商品</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* 基本信息 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-700">商品名称</label>
                      <input
                        name="name"
                        type="text"
                        placeholder="请输入商品名称"
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-300 text-neutral-800"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="price" className="block text-sm font-medium text-neutral-700">商品价格</label>
                      <input
                        name="price"
                        type="number"
                        placeholder="请输入商品价格"
                        className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-300 text-neutral-800"
                        value={form.price}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  {/* 商品描述 */}
                  <div className="space-y-2">
                    <label htmlFor="description" className="block text-sm font-medium text-neutral-700">商品描述</label>
                    <textarea
                      name="description"
                      rows={3}
                      placeholder="请输入商品描述"
                      className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-300 text-neutral-800 resize-none"
                      value={form.description}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  
                  {/* 图片URL区域 */}
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-neutral-700">商品图片URL</label>
                    
                    {form.imageUrls.map((url, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <input
                          type="text"
                          placeholder="输入图片URL"
                          value={url}
                          onChange={(e) => handleImageUrlChange(index, e.target.value)}
                          className="flex-grow px-4 py-3 rounded-lg border border-neutral-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-300 text-neutral-800"
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => removeImageUrlField(index)}
                            className="p-2 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300"
                          >
                            <i className="fa fa-minus"></i>
                          </button>
                        )}
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={addImageUrlField}
                      className="w-full py-3 px-6 bg-pink-100 text-pink-600 rounded-lg font-medium hover:bg-pink-200 transition-all duration-300 flex items-center justify-center"
                    >
                      <i className="fa fa-plus-circle mr-2"></i>
                      添加图片URL
                    </button>
                    
                    {/* 图片预览 */}
                    {form.imageUrls.some(url => url.trim() !== '') && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {form.imageUrls
                          .filter(url => url.trim() !== '')
                          .map((url, index) => (
                            <div key={index} className="relative group">
                              <div className="aspect-square rounded-lg overflow-hidden bg-neutral-100">
                                <img 
                                  src={url} 
                                  alt={`预览图 ${index + 1}`} 
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                  
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                  
                  {/* 提交按钮 */}
                  <div>
                    <button
                      type="submit"
                      className="w-full py-3 px-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-pink-500/20 active:scale-95 transition-all duration-300 flex items-center justify-center"
                    >
                      <i className="fa fa-plus-circle mr-2"></i>
                      添加商品
                    </button>
                    
                    {/* 错误消息 */}
                    {error && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center">
                        <i className="fa fa-exclamation-circle mr-2"></i>
                        {error}
                      </div>
                    )}
                    
                    {/* 成功消息 */}
                    {success && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm flex items-center">
                        <i className="fa fa-check-circle mr-2"></i>
                        商品添加成功！
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
            
            {/* 图片展示区域 */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full flex flex-col">
                <div className="p-6 border-b border-neutral-200">
                  <h2 className="text-xl font-bold text-neutral-800">商品预览</h2>
                </div>
                <div className="flex-grow flex flex-col items-center justify-center p-6">
  
                  {imagesUrlState.length > 0 ? (
                        <ImageCarousel
                            images={imagesUrlState}
                            ref={imagesRef}
                            autoplay={false}
                            interval={4000}
                        /> 
                  ) : (
                    <div className="w-full aspect-square rounded-xl overflow-hidden bg-neutral-100 flex items-center justify-center mb-4">
                      <i className="fa fa-camera text-5xl text-neutral-300"></i>
                    </div>
                  )}                 
                  <div className="w-full">
                    <h3 className="text-lg font-semibold text-neutral-800 mb-2 truncate">
                      {form.name || '商品名称'}
                    </h3>
                    <p className="text-neutral-600 mb-4 line-clamp-3">
                      {form.description || '请输入商品描述...'}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-pink-500 font-bold text-xl">
                        {form.price ? `¥${form.price}` : '¥0.00'}
                      </span>
                      <span className="text-sm text-neutral-500">
                        {form.imageUrls.filter(url => url.trim() !== '').length} 张图片
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 商品列表 */}
          {products.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-neutral-800">最近添加的商品</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.slice(0, 3).map(product => (
                  <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <div className="aspect-square">
                      
                      {product.mainImageUrl.length > 0 ? (
                        <ImageCarousel
                            images={product.mainImageUrl.slice(1,-1).split(',').filter(url => url.trim() !== '')}
                            ref={imagesRef}
                            autoplay={false} //修改图片是否轮播
                            interval={4000}
                        /> 
                      ) : (
                        <div className="w-full aspect-square rounded-xl overflow-hidden bg-neutral-100 flex items-center justify-center mb-4">
                          <i className="fa fa-camera text-5xl text-neutral-300"></i>
                        </div>
                      )}

                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-neutral-800 mb-1 truncate">{product.name}</h3>
                      <p className="text-sm text-neutral-600 mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-pink-500 font-medium">¥{product.price}</span>
                        <span className="text-xs text-neutral-500">
                          {new Date(product.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}    