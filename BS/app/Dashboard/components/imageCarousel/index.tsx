import React, { useState, useEffect, useRef, forwardRef } from 'react';
import './index.css';

interface ImageCarouselProps {
  images?: string[];
  autoplay?: boolean;
  interval?: number;
}

const ImageCarousel = forwardRef<HTMLDivElement, ImageCarouselProps>((props, ref) => {

  const { images = [], autoplay = true, interval = 5000 } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const imageCount = images.length;

  //非URL时加载失败图片
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).src = '';
    (e.target as HTMLImageElement).alt = '图片加载失败';
  };

  //切换下一张图片
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % imageCount);
  };

  //切换上一张图片
  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + imageCount) % imageCount);
  };

  //切换指定图片
  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  //启动索引播放
  const startAutoplay = () => {
    if (autoplay && imageCount > 1 && !intervalRef.current) {
      intervalRef.current = setInterval(goToNext, interval);
    }
  };

  //暂停索引播放
  const pauseAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  //鼠标没入触发
  const handleMouseEnter = () => {
    setIsPaused(true);
    setShowControls(true);
    pauseAutoplay();
  };
  
  //鼠标没出触发
  const handleMouseLeave = () => {
    setIsPaused(false);
    setShowControls(false);
    startAutoplay();
  };

  //挂载和卸载时的生命周期处理
  useEffect(() => {
    startAutoplay();
    return () => pauseAutoplay();
  }, [autoplay, interval, imageCount]);

  //监听当前索引变化，更新索引播放状态
  useEffect(() => {
    if (!isPaused)
      startAutoplay();
    else 
      pauseAutoplay();
  }, [currentIndex, isPaused, autoplay, interval, imageCount]);

  return (
    <div 
      className="relative w-full rounded-xl overflow-hidden shadow-lg"
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
        {imageCount > 0 ? (
          <div className="carousel-container relative h-full">
            {/* 图片轮播项 */}
            {images.map((image, index) => (
              <div
                key={index}
                className={`carousel-item absolute inset-0 transition-opacity duration-500 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={image}
                  alt={`商品预览 ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              </div>
            ))}
          
            <button
              className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-all duration-300 ${
                showControls ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              } prev-btn`}
              onClick={goToPrev}
              disabled={imageCount <= 1}
            >
              <div>《</div>
            </button>
            
            <button
              className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 transition-all duration-300 ${
                showControls ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
              } next-btn`}
              onClick={goToNext}
              disabled={imageCount <= 1}
            >
              <div>》</div>
            </button>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 indicators">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentIndex ? 'bg-white' : 'bg-white/50'
                  } transition-all duration-300`}
                  onClick={() => goToIndex(index)}
                />
              ))}
            </div>
            
          </div>
        ) : (
          <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
            <i className="fa fa-camera text-5xl text-neutral-300" />
          </div>
        )}
      </div>
    </div>
  );
});

export default ImageCarousel;