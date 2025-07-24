'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  discountprice:string
  mainImageUrl: string; // 格式示例："url1,url2,url3"
}

export default function LvProductPage() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // 模拟LV商品数据（可根据实际需求替换）
  const mockProduct: Product = {
    id: 3,
    name: "LV经典包",
    description: "Monogram经典花纹，牛皮材质，内置多个收纳隔层",
    price: "15999",
    discountprice: "12999",
    mainImageUrl: "https://www.louisvuitton.cn/images/is/image/lv/1/PP_VP_L/%E8%B7%AF%E6%98%93%E5%A8%81%E7%99%BB-diane-%E6%89%8B%E8%A2%8B-monogram-denim-%E6%97%B6%E5%B0%9A%E6%89%8B%E8%A2%8B--M13070_PM1_Back%20view.png?wid=490&hei=490,https://www.louisvuitton.cn/images/is/image/lv/1/PP_VP_L/%E8%B7%AF%E6%98%93%E5%A8%81%E7%99%BB-diane-%E6%89%8B%E8%A2%8B-monogram-denim-%E6%97%B6%E5%B0%9A%E6%89%8B%E8%A2%8B--M13070_PM1_Interior%20view.png?wid=490&hei=490,https://www.louisvuitton.cn/images/is/image/lv/1/PP_VP_L/%E8%B7%AF%E6%98%93%E5%A8%81%E7%99%BB-diane-%E6%89%8B%E8%A2%8B-monogram-denim-%E6%97%B6%E5%B0%9A%E6%89%8B%E8%A2%8B--M13070_PM2_Front%20view.png?wid=1090&hei=1090"
  };

  // 切换显示图片
  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  // 左侧图片轮播区域
  const ImageCarousel = () => {
    const images = mockProduct.mainImageUrl.split(',');
    
    return (
      <div className="flex-2 relative h-full">
        {/* 主图显示 */}
        <div className="h-[60vh] rounded-lg overflow-hidden bg-white/50 backdrop-blur-sm">
          <img 
            src={images[currentImageIndex]} 
            alt={mockProduct.name} 
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        </div>
        
        {/* 缩略图导航 */}
        <div className="flex gap-4 mt-4 overflow-x-auto">
          {images.map((url, index) => (
            <div 
              key={index}
              className={`p-1 rounded-lg cursor-pointer ${
                index === currentImageIndex 
                  ? 'border-2 border-pink-100 bg-white/30 backdrop-blur-sm' 
                  : 'border-2 border-transparent'
              }`}
            >
              <img
                src={url}
                alt={`缩略图${index+1}`}
                onClick={() => handleImageChange(index)}
                className="w-24 h-24 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 右侧商品信息区域
  const ProductInfo = () => {
    // 添加选中状态管理
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>('');

    return (
      <div className="flex-1 p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-pink-600">{mockProduct.name}</h1>
        <p className="text-gray-600 mb-8">{mockProduct.description}</p>
        
        <div className="border-t border-b py-4 mb-6">
        <p className="text-2xl font-semibold ">¥{mockProduct.price}</p>
          <p className="text-sm text-gray-500">含税费及运费</p>
        </div>

        {/* 商品选项示例（已添加选中效果） */}
        <div className="space-y-6 mb-6">
          <div>
            <p className="text-sm font-medium text-gray-700">尺寸选择</p>
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => setSelectedSize('小号')}
                className={`px-4 py-2 border rounded hover:bg-pink-50 transition-colors ${
                  selectedSize === '小号' 
                    ? 'bg-pink-50 border-pink-500 font-medium'  // 选中时粉色背景+粉色边框+加粗文字
                    : 'border-gray-300'  // 未选中时灰色边框
                }`}
              >
                小号
              </button>
              <button
                onClick={() => setSelectedSize('中号')}
                className={`px-4 py-2 border rounded hover:bg-pink-50 transition-colors ${
                  selectedSize === '中号' 
                    ? 'bg-pink-50 border-pink-500 font-medium'
                    : 'border-gray-300'
                }`}
              >
                中号
              </button>
              <button
                onClick={() => setSelectedSize('大号')}
                className={`px-4 py-2 border rounded hover:bg-pink-50 transition-colors ${
                  selectedSize === '大号' 
                    ? 'bg-pink-50 border-pink-500 font-medium'
                    : 'border-gray-300'
                }`}
              >
                大号
              </button>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">颜色选择</p>
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => setSelectedColor('经典棕')}
                className={`px-4 py-2 border rounded hover:bg-pink-50 transition-colors ${
                  selectedColor === '经典棕' 
                    ? 'bg-pink-50 border-pink-500 font-medium'
                    : 'border-gray-300'
                }`}
              >
                经典棕
              </button>
              <button
                onClick={() => setSelectedColor('黑色')}
                className={`px-4 py-2 border rounded hover:bg-pink-50 transition-colors ${
                  selectedColor === '黑色' 
                    ? 'bg-pink-50 border-pink-500 font-medium'
                    : 'border-gray-300'
                }`}
              >
                黑色
              </button>
              <button
                onClick={() => setSelectedColor('酒红色')}
                className={`px-4 py-2 border rounded hover:bg-pink-50 transition-colors ${
                  selectedColor === '酒红色' 
                    ? 'bg-pink-50 border-pink-500 font-medium'
                    : 'border-gray-300'
                }`}
              >
                酒红色
              </button>
            </div>
          </div>
          <div>
            
          </div>
          <button 
              onClick={() => {
                if (!selectedSize || !selectedColor) {
                  alert(`请先选择${!selectedSize ? '尺寸' : ''}${!selectedColor ? '颜色' : ''}`);
                  return;
                }
                console.log('加入购物车', { 
                  product: mockProduct.name,
                  size: selectedSize,
                  color: selectedColor 
                });
              }}
              className="w-full bg-pink-300 hover:bg-pink-500 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              加入购物车
            </button>
          <button
            onClick={() => {
                if (!selectedSize || !selectedColor) {
                  alert(`请先选择${!selectedSize ? '尺寸' : ''}${!selectedColor ? '颜色' : ''}`);
                  return;
                }
                console.log('直接购买', { 
                  product: mockProduct.name,
                  size: selectedSize,
                  color: selectedColor 
                });
              }}
              className="w-full bg-pink-300 hover:bg-pink-500 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              直接购买
            </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className='text-xl text-center font-thin italic tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 uppercase'>
                    BS STORE 
                </h1>
        <h1 className="text-3xl text-center font-thin  tracking-wider mb-8  text-pink-500">商品页</h1>
        <button
          onClick={() => router.push('/home')}
          className="bg-transparent text-pink-700 hover:text-pink-800 focus:outline-none focus:ring-2 focus:ring-pink-700 focus:ring-opacity-100 rounded-xl"
        >
          back 
        </button>
        <div className="flex gap-8">
          {/* 左侧容器 */}
          <div className="flex-2 bg-white rounded-lg shadow-md p-6">
            <ImageCarousel />
          </div>
          
          {/* 右侧商品信息 */}
          <ProductInfo />
        </div>
      </div>
    </div>
  );
}