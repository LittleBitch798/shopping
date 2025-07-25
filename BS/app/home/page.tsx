

'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Outlet } from 'react-router-dom'

interface Product {
  id: number
  name: string
  description: string
  mainImageUrl: string
  createdAt: string
}

function Home() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchKeyword, setSearchKeyword] = useState('') 
  const [showForm, setShowForm] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/api/proxy/addProduct');
      setAllProducts(res.data);
      setFilteredProducts(res.data);
    } catch {
      console.error('获取商品列表失败');
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = () => {
    if (searchKeyword.length < 2) {
      alert('请输入您需要搜索的商品');
      return;
    }
    const matchedProducts = allProducts.filter(product => {
      for (let i = 0; i <= product.name.length - 2; i++) {
        const twoChars = product.name.slice(i, i + 2);
        if (searchKeyword.includes(twoChars)) {
          return true;
        }
      }
      return false;
    });

    if (matchedProducts.length > 0) {
      setFilteredProducts(matchedProducts);
      setSelectedProduct(matchedProducts[0]);
      setShowForm(true);
    } else {
      alert('未找到匹配的商品，请尝试其他关键字');
      setFilteredProducts(allProducts);
      setShowForm(false);
      setSelectedProduct(null);
    }
  };

  const handleAddToCart = async (productId: number) => {
    try {
      await axios.post('/api/proxy/updateCart', { productId });
      alert('商品已添加到购物车');
    } catch (error) {
      console.error('添加购物车失败:', error);
    }
  };

  const handleBuyNow = async (productId: number) => {
    try {
      const address = prompt('请输入收货地址');
      if (address) {
        await axios.post('/api/proxy/buyNow', { 
          productId,
          address 
        });
        window.location.href = '/shipping';
      }
    } catch (error) {
      console.error('购买失败:', error);
      alert('购买失败，请重试');
    }
  };

  // 处理键盘按下事件
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
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
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
// {/* 添加键盘按下事件处理 */}
                onKeyDown={handleKeyDown} 
                placeholder="搜索商品"
                className="ml-2 p-1 border border-gray-300 rounded"
              />
              <button
                onClick={handleSearch}
                className="ml-2 p-1 bg-pink-500 text-white rounded hover:bg-pink-600"
              >
                搜索
              </button>
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
            <div>
                接下来的内容
            </div>
          
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
                {loading ? (
                  <div className="col-span-full flex justify-center">
                    <div className="loading loading-spinner loading-lg"></div>
                  </div>
                ) : (
                  filteredProducts.map(product => (
                    <div key={product.id} className="card bg-base-100 shadow-xl">
                      <figure>
                        <img src={product.mainImageUrl} alt={product.name} className="h-48 w-full object-cover" />
                      </figure>
                      <div className="card-body">
                        <h2 className="card-title">{product.name}</h2>
                        <p>{product.description}</p>
                        <div className="card-actions justify-end">
                          <button 
                            onClick={() => handleBuyNow(product.id)}
                            className="btn btn-primary"
                          >
                            购买
                          </button>
                          <button 
                              className="btn btn-primary"
                              onClick={() => handleAddToCart(product.id)}
                          >
                              加入购物车
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
            </div>
        </div>
    </div>
    {showForm && selectedProduct && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded shadow-lg max-h-[90vh] max-w-[90vw] overflow-y-auto">
          <div className="flex justify-end mb-4">
            <button 
              onClick={() => setShowForm(false)}
              className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              ×
            </button>
          </div>
          <h2 className="text-xl font-bold mb-4">商品信息</h2>
          <img 
            src={selectedProduct.mainImageUrl} 
            alt={selectedProduct.name} 
            className="w-full object-cover mb-4"
          />
          <p><strong>名称:</strong> {selectedProduct.name}</p>
          <p><strong>描述:</strong> {selectedProduct.description}</p>
          <p><strong>创建时间:</strong> {selectedProduct.createdAt}</p>
          <div className="mt-4 flex space-x-4">
            <button 
              onClick={() => handleAddToCart(selectedProduct.id)}
              className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
            >
              添加购物车
            </button>
            <button 
              onClick={() => handleBuyNow(selectedProduct.id)}
              className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
            >
              立即购买
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

export default Home

