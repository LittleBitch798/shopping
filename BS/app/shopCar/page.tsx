'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  description: string;
  mainImageUrl: string;
  price?: number;
}

export default function ShopCarPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('/api/proxy/getCart');
        // 获取购物车商品ID列表
        const cartItemIds = JSON.parse(response.data.shopCar || '[]');
        // 查询商品详情
        const productsResponse = await axios.post('/api/proxy/getProductsByIds', { ids: cartItemIds });
        setCartItems(productsResponse.data);
      } catch (error) {
        console.error('获取购物车失败:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  const removeFromCart = async (productId: number) => {
    try {
      await axios.post('/api/proxy/removeFromCart', { productId });
      // 更新本地状态
      setCartItems(cartItems.filter(item => item.id !== productId));
    } catch (error) {
      console.error('移除商品失败:', error);
      alert('移除商品失败，请重试');
    }
  };

  const calculateTotal = () => {
    const sum = cartItems.reduce((total, item) => {
      // 确保price是数字且不为NaN
      const price = Number(item.price) || 0;
      return total + price;
    }, 0);
    return sum.toFixed(2); // 保留两位小数
  };

  const handleCheckout = async () => {
    try {
      const address = prompt('请输入收货地址');
      if (address) {
        await axios.post('/api/proxy/checkout', { 
          productIds: cartItems.map(item => item.id),
          address 
        });
        window.location.href = '/shipping';
      }
    } catch (error) {
      console.error('结算失败:', error);
      alert('结算失败，请重试');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">我的购物车</h1>
      
      {loading ? (
        <div className="flex justify-center">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl mb-4">您的购物车是空的</p>
          <Link href="/home" className="btn btn-primary">
            去购物
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-6">
            {cartItems.map(item => (
              <div key={item.id} className="card card-side bg-base-100 shadow-xl">
                <figure className="w-48">
                  <img src={item.mainImageUrl} alt={item.name} className="h-full object-cover" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{item.name}</h2>
                  <p>{item.description}</p>
                  <div className="card-actions justify-between items-center">
                    <span className="text-lg font-bold">¥{item.price || '--'}</span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="btn btn-error btn-sm"
                    >
                      删除
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-base-200 rounded-box">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">总计: ¥{calculateTotal()}</span>
              // 修改结算按钮
              <button 
                onClick={handleCheckout}
                className="btn btn-primary btn-lg"
              >
                结算
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}