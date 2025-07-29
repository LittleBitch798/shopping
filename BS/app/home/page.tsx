

'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Outlet } from 'react-router-dom'
import { useUserStore } from '../store/userStore';

interface Product {
  id: number
  productName: string
  description: string
  imageUrl: string
  createdAt: string
  price: number
}

function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showModal, setShowModal] = useState(false)

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/api/proxy/addProduct')
      const mappedProducts = res.data.map((item: any) => ({
        id: item.id,
        productName: item.productName || item.name,
        description: item.description,
        imageUrl: item.imageUrl,
        price: item.price,
        createdAt: item.createdAt
      }))
      setProducts(mappedProducts)
    } catch {
      console.error('获取商品列表失败')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // 打开商品详情弹窗
  const openProductModal = (product: Product) => {
    setSelectedProduct(product)
    setShowModal(true)
  }

  // 关闭弹窗
  const closeModal = () => {
    setShowModal(false)
    setSelectedProduct(null)
  }
  
  const handleAddToCart = async (productId: number) => {
    const { phone } = useUserStore.getState();
    try {
      const product = products.find(p => p.id === productId);
      if (!product) return;

      await axios.post('/api/proxy/getCart', { 
        productId,
        productName: product.productName,
        description: product.description,
        imageUrl: product.imageUrl,
        price: product.price
      });
      alert('商品已添加到购物车');
    } catch (error) {
      console.error('添加购物车失败:', error);
      alert('添加失败：' + (error as any).response?.data?.error || '未知错误');
    }
  };

  const handleBuyNow = async (productId: number) => {
    try {
      const product = products.find(p => p.id === productId);
      if (!product) {
        console.error('未找到对应商品');
        alert('未找到对应商品');
        return;
      }

      const phone = prompt('请输入您的手机号(11位数字)');
      if (!phone || phone.length !== 11 || !/^\d{11}$/.test(phone)) {
          alert('请输入有效的11位手机号');
          return;
      }
      
      const address = prompt('请输入收货地址');
      if (!address) {
        alert('请输入收货地址');
        return;
      }

      console.log('正在提交物流信息:', {productId, phone, address, productName: product.productName});
      const response = await axios.post('/api/proxy/shipping', {
        productId,
        address,
        phone,
        productName: product.productName,
        description: product.description,
        imageUrl: product.imageUrl,
        price: product.price
      });
      
      console.log('物流API响应:', response.data);
      alert('购买成功！订单号：' + response.data.id);
      window.location.href = '/shipping';
    } catch (error: any) {
      console.error('购买失败详情:', error);
      const errorMessage = error.response?.data?.details || error.message || '未知错误';
      alert('购买失败: ' + errorMessage);
    }
  };

  return (
    <>
    <div className='min-w-[740px]'>
        <div className='flex flex-row border-b-2 sticky top-0 z-50 bg-white'>
            <div className='flex-1 flex justify-start items-center ml-7 hover:text-pink-500 hover:fill-pink-500'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5  cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <p className='m-3 '>搜索</p>
            </div>
            <div className='flex-1'>
            <div className='flex justify-center items-center mt-7'>
                <h1 className='text-5xl font-thin italic tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 uppercase'>
                    BS STORE
                </h1>
            </div>
            </div>
            <nav className='flex-1'>
                <ul className='flex justify-end flex-grow m-7'>
                    <li className='m-3'>
                      <Link href="/home" className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 fill-pink-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                      </Link>
                    </li>
                    <li className='m-3'>
                      <Link href="/me" className="flex items-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 hover:fill-pink-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </li>
                    <li className='m-3 '>
                      <Link href="/shopCar" className="flex items-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 hover:fill-pink-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                      </Link>
                    </li>
                    <li className='m-3 '>
                      <Link href="/shipping" className="flex items-center ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 hover:fill-pink-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-2a1 1 0 00-.293-.707l-4-4A1 1 0 0015 7h-1V5a1 1 0 00-1-1H3zM14 7v4h2.586L14 7z" />
                        </svg>
                      </Link>
                    </li>
                    <li className='m-3'>
                    <Link href="/addProduct" className="flex items-center ">add</Link>
                      </li>
                </ul>
            </nav>
        </div>
        <div>
            <div className="relative w-full h-screen">
                <video 
                    autoPlay 
                    loop 
                    muted 
                    className="absolute inset-0 w-full h-3/4 object-cover"
                    style={{ marginTop: '4rem' }}
                >
                    <source src="/mp4/eyes.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 flex items-end justify-center mb-52">
                    <div className="text-white text-2xl font-thin bg-opacity-50 px-4 py-2 rounded-lg hover:text-3xl hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 transition-all duration-300">
                        520-为她甄选
                    </div>
                </div>
            </div>
          
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
                {loading ? (
                  <div className="col-span-full flex justify-center">
                    <div className="loading loading-spinner loading-lg"></div>
                  </div>
                ) : (
                  products.map(product => (
                    <div key={product.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
                      <figure className="relative overflow-hidden h-64">
                        <img 
                          src={product.imageUrl} 
                          alt={product.productName} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onClick={() => openProductModal(product)}
                        />
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                          ¥{product.price}
                        </div>
                      </figure>
                      <div className="card-body p-4">
                        <h2 
                          className="card-title text-lg font-semibold hover:text-pink-500 transition-colors cursor-pointer"
                          onClick={() => openProductModal(product)}
                        >
                          {product.productName}
                        </h2>
                        <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-2xl font-bold text-pink-500">¥{product.price}</span>
                          <div className="card-actions">
                            <button 
                              onClick={() => handleBuyNow(product.id)}
                              className="btn btn-primary btn-sm bg-gradient-to-r from-pink-500 to-purple-600 border-none hover:from-pink-600 hover:to-purple-700"
                            >
                              立即购买
                            </button>
                            <button 
                              className="btn btn-outline btn-sm hover:bg-pink-500 hover:border-pink-500"
                              onClick={() => handleAddToCart(product.id)}
                            >
                              加入购物车
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
            </div>
        </div>

        {/* 商品详情弹窗 */}
        {showModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-800">{selectedProduct.productName}</h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* 商品图片 */}
                  <div className="space-y-4">
                    <div className="aspect-square overflow-hidden rounded-lg">
                      <img 
                        src={selectedProduct.imageUrl} 
                        alt={selectedProduct.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* 商品信息 */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">商品描述</h3>
                      <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg text-gray-600">价格：</span>
                        <span className="text-3xl font-bold text-pink-500">¥{selectedProduct.price}</span>
                      </div>
                      
                      <div className="text-sm text-gray-500 mb-4">
                        <p>商品ID: {selectedProduct.id}</p>
                        <p>上架时间: {new Date(selectedProduct.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    {/* 操作按钮 */}
                    <div className="flex space-x-4">
                      <button 
                        onClick={() => {
                          handleBuyNow(selectedProduct.id);
                          closeModal();
                        }}
                        className="flex-1 btn btn-primary bg-gradient-to-r from-pink-500 to-purple-600 border-none hover:from-pink-600 hover:to-purple-700 text-white py-3"
                      >
                        立即购买
                      </button>
                      <button 
                        onClick={() => {
                          handleAddToCart(selectedProduct.id);
                          closeModal();
                        }}
                        className="flex-1 btn btn-outline hover:bg-pink-500 hover:border-pink-500 py-3"
                      >
                        加入购物车
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 悬浮AI客服按钮 */}
        <Link href="/aiChat">
          <div className="fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group z-40">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
            <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              AI客服助手
            </div>
          </div>
        </Link>
    </div>
    </>
  )
}

export default Home

