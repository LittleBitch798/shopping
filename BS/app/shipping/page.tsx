'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface ShippingItem {
  id: number;  // 添加id字段
  productId: number;
  address: string;
  status: 'pending' | 'shipped' | 'delivered';
}

interface Product {
  id: number;
  name: string;
  description: string;
  mainImageUrl: string;
}

export default function ShippingPage() {
  const [shippingItems, setShippingItems] = useState<ShippingItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShippingInfo = async () => {
      try {
        const response = await axios.get('/api/proxy/getShippingInfo');
        // 确保正确处理varchar格式的JSON字符串
        const shippingData = response.data.shippingInfo 
          ? JSON.parse(response.data.shippingInfo)
          : [];
        setShippingItems(shippingData);
        
        // 获取商品详情
        const productIds = shippingData.map((item: ShippingItem) => item.productId);
        if(productIds.length > 0) {
          const productsResponse = await axios.post('/api/proxy/getProductsByIds', { ids: productIds });
          setProducts(productsResponse.data);
        }
      } catch (error) {
        console.error('获取物流信息失败:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchShippingInfo();
  }, []);

  const handleDeleteOrder = async (orderId: number) => {
    try {
      await axios.post('/api/proxy/deleteOrder', { orderId });
      setShippingItems(shippingItems.filter(item => item.id !== orderId));
      // 同时更新关联的商品列表
      const remainingProductIds = shippingItems
        .filter(item => item.id !== orderId)
        .map(item => item.productId);
      if (remainingProductIds.length > 0) {
        const productsResponse = await axios.post('/api/proxy/getProductsByIds', { 
          ids: remainingProductIds 
        });
        setProducts(productsResponse.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('删除订单失败:', error);
      alert('删除订单失败，请重试');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-pink-600">我的物流</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg text-pink-500"></div>
        </div>
      ) : shippingItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl mb-6 text-gray-600">暂无物流信息</p>
          <Link href="/home" className="btn btn-primary bg-pink-500 border-none hover:bg-pink-600 text-white">
            去购物
          </Link>
        </div>
      ) : (
        <div className="space-y-6 w-full"> {/* 修改为垂直排列 */}
          {shippingItems.map((item, index) => {
            const product = products.find(p => p.id === item.productId);
            return (
              <div key={index} className="card bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 w-full"> {/* 添加w-full */}
                <div className="flex flex-col md:flex-row"> {/* 添加响应式flex布局 */}
                  {product && (
                    <figure className="md:w-1/3 h-60 overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
                      <img 
                        src={product.mainImageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </figure>
                  )}
                  <div className="card-body p-6 md:w-2/3"> {/* 调整宽度比例 */}
                    {product && (
                      <>
                        <h2 className="card-title text-lg font-semibold text-gray-800">{product.name}</h2>
                        <p className="text-gray-600 text-sm">{product.description}</p>
                      </>
                    )}
                    <div className="mt-4 space-y-2">
                      <p className="text-gray-700">
                        <span className="font-medium text-pink-500">收货地址:</span> 
                        <span className="ml-2">{item.address}</span>
                      </p>
                      <p className="flex items-center">
                        <span className="font-medium text-pink-500">物流状态:</span> 
                        <span className={`badge ${item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : item.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'} ml-2 px-3 py-1 rounded-full text-xs`}>
                          {item.status === 'pending' ? '待发货' : item.status === 'shipped' ? '运输中' : '已送达'}
                        </span>
                      </p>
                      // 在渲染部分添加了删除按钮
                      <button 
                        onClick={() => handleDeleteOrder(item.id)}
                        className="btn btn-error btn-sm mt-2"
                      >
                        删除订单
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}