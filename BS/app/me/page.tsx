'use client';
import Link from 'next/link';
import { useState } from 'react';

function Me() {
  const [activeTab, setActiveTab] = useState('account');
  const [showContactPrefs, setShowContactPrefs] = useState(false);

  return (
    <>
      <div className='min-w-[740px]'>
        {/* 顶部导航栏 */}
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 hover:fill-pink-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </Link>
              </li>
              <li className='m-3'>
                <Link href="/me" className="flex items-center ">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 fill-pink-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </Link>
              </li>
              <li className='m-3 '>
                <Link href="#" className="flex items-center ">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 hover:fill-pink-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* 二级导航 */}
        <div className="flex justify-between items-center border-b text-sm py-4 px-8 ">
          <div className="flex-1">
            <h1 className='text-2xl font-thin italic tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 uppercase'>
              STORE
            </h1>
          </div>
          <div className="flex justify-end w-3/5 space-x-4">
            <Link 
              href="/me" 
              className={`${activeTab === 'account' ? 'text-pink-500 border-pink-500' : 'hover:text-pink-500 hover:border-pink-500'} border-b-2 px-3 py-1 transition-all flex items-center`}
              onClick={() => setActiveTab('account')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              账户
            </Link>
            <Link 
              href="#" 
              className={`${activeTab === 'orders' ? 'text-pink-500 border-pink-500' : 'hover:text-pink-500 hover:border-pink-500'} border-b-2 px-3 py-1 transition-all flex items-center`}
              onClick={() => setActiveTab('orders')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              订单
            </Link>
            <Link 
              href="#" 
              className={`${activeTab === 'coupons' ? 'text-pink-500 border-pink-500' : 'hover:text-pink-500 hover:border-pink-500'} border-b-2 px-3 py-1 transition-all flex items-center`}
              onClick={() => setActiveTab('coupons')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
              </svg>
              优惠
            </Link>
            <Link 
              href="#" 
              className={`${activeTab === 'wishlist' ? 'text-pink-500 border-pink-500' : 'hover:text-pink-500 hover:border-pink-500'} border-b-2 px-3 py-1 transition-all flex items-center`}
              onClick={() => setActiveTab('wishlist')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              收藏
            </Link>
            <Link 
              href="#" 
              className={`${activeTab === 'service' ? 'text-pink-500 border-pink-500' : 'hover:text-pink-500 hover:border-pink-500'} border-b-2 px-3 py-1 transition-all flex items-center`}
              onClick={() => setActiveTab('service')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
              售后
            </Link>
            <Link 
              href="#" 
              className={`${activeTab === 'support' ? 'text-pink-500 border-pink-500' : 'hover:text-pink-500 hover:border-pink-500'} border-b-2 px-3 py-1 transition-all flex items-center`}
              onClick={() => setActiveTab('support')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              客服
            </Link>
          </div>
        </div>

        {/* 主内容区 */}
        <div className="flex flex-col items-center text-sm text-gray-800 w-full mt-8">
          {/* 账户信息卡片 */}
          <div className="w-4/5 bg-white shadow-md p-6 rounded mb-8">
            <div className="flex items-start mb-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mr-6 overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">欢迎回来，用户</h2>
                <p className="mb-2">登录账号: +8615678584668</p>
                <p className="mb-4">会员等级: <span className="text-pink-500">普通会员</span></p>
                <button className="text-sm text-pink-500 hover:underline" onClick={() => setShowContactPrefs(!showContactPrefs)}>
                  {showContactPrefs ? '隐藏联系偏好' : '查看联系偏好'}
                </button>
              </div>
            </div>

            {showContactPrefs && (
              <div className="mb-6 p-4 bg-gray-50 rounded">
                <h3 className="font-medium mb-3">联系喜好设定</h3>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="p-3 hover:bg-gray-100 rounded transition cursor-pointer">
                    <div className="text-2xl mb-2">✉</div>
                    <div>电子邮件</div>
                    <div className="text-xs text-gray-500 mt-1">已启用</div>
                  </div>
                  <div className="p-3 hover:bg-gray-100 rounded transition cursor-pointer">
                    <div className="text-2xl mb-2">📱</div>
                    <div>电话</div>
                    <div className="text-xs text-gray-500 mt-1">已启用</div>
                  </div>
                  <div className="p-3 hover:bg-gray-100 rounded transition cursor-pointer">
                    <div className="text-2xl mb-2">💬</div>
                    <div>短信</div>
                    <div className="text-xs text-gray-500 mt-1">已禁用</div>
                  </div>
                  <div className="p-3 hover:bg-gray-100 rounded transition cursor-pointer">
                    <div className="text-2xl mb-2">📬</div>
                    <div>邮寄</div>
                    <div className="text-xs text-gray-500 mt-1">已禁用</div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col items-center space-y-4">
              <button className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition">
                编辑我的信息
              </button>
              <button className="border px-4 py-2 rounded flex items-center hover:bg-gray-50 transition">
                📍 编辑我的地址
              </button>
              <button className="border px-4 py-2 rounded flex items-center hover:bg-gray-50 transition">
                💳 编辑付款方式
              </button>
            </div>
          </div>

          {/* 订单状态卡片 */}
          {activeTab === 'orders' && (
            <div className="w-4/5 bg-white shadow-md p-6 rounded mb-8">
              <h2 className="text-xl font-bold mb-6">我的订单</h2>
              
              <div className="grid grid-cols-4 gap-4 text-center mb-6">
                <div className="p-4 border rounded hover:shadow-md transition cursor-pointer">
                  <div className="text-2xl mb-2">🛒</div>
                  <div className="font-medium">待付款</div>
                  <div className="text-pink-500">0</div>
                </div>
                <div className="p-4 border rounded hover:shadow-md transition cursor-pointer">
                  <div className="text-2xl mb-2">🚚</div>
                  <div className="font-medium">待发货</div>
                  <div className="text-pink-500">0</div>
                </div>
                <div className="p-4 border rounded hover:shadow-md transition cursor-pointer">
                  <div className="text-2xl mb-2">📦</div>
                  <div className="font-medium">待收货</div>
                  <div className="text-pink-500">0</div>
                </div>
                <div className="p-4 border rounded hover:shadow-md transition cursor-pointer">
                  <div className="text-2xl mb-2">⭐</div>
                  <div className="font-medium">待评价</div>
                  <div className="text-pink-500">0</div>
                </div>
              </div>
              
              <div className="text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="mb-4">您还没有任何订单</p>
                <button className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition">
                  开始购物
                </button>
              </div>
            </div>
          )}

          {/* 优惠券卡片 */}
          {activeTab === 'coupons' && (
            <div className="w-4/5 bg-white shadow-md p-6 rounded mb-8 text-center">
              <h2 className="text-xl font-bold mb-4">我的优惠券</h2>
              <div className="flex justify-center mb-6">
                <div className="border border-dashed border-pink-300 bg-pink-50 p-4 rounded-lg w-64">
                  <div className="text-pink-500 font-bold mb-1">暂无可用优惠券</div>
                  <div className="text-xs text-gray-500">购物时可用的优惠券将显示在此处</div>
                </div>
              </div>
              <button className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition">
                查看所有优惠
              </button>
            </div>
          )}

          {/* 保养服务卡片 */}
          {activeTab === 'service' && (
            <div className="w-4/5 bg-white shadow-md p-6 rounded mb-8 text-center">
              <h2 className="text-xl font-bold mb-4">我的保养服务</h2>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="mb-4">保养服务项目中当前没有产品</p>
              <button className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition">
                联系服务中心
              </button>
            </div>
          )}

          {/* 愿望清单卡片 */}
          {activeTab === 'wishlist' && (
            <div className="w-4/5 bg-white shadow-md p-6 rounded mb-8 text-center">
              <h2 className="text-xl font-bold mb-4">我的愿望录</h2>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <p className="mb-4">您的愿望录中还没有添加任何产品</p>
              <button className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition">
                浏览商品
              </button>
            </div>
          )}

          {/* 回到顶部按钮 */}
          <div className="mb-10">
            <button 
              className="border px-4 py-2 rounded hover:bg-gray-50 transition flex items-center"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              回到顶部 <span className="ml-1">⮝</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Me;