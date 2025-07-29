import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '@/lib/database';
import { CartTable } from '@/lib/entities/CartTable';

// 添加商品到购物车
export async function POST(request: NextRequest) {
    try {
        const { productId, productName, description, imageUrl, price, phone } = await request.json();
        
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        
        const cartRepository = AppDataSource.getRepository(CartTable);
        const cartItem = cartRepository.create({
            productName,
            description,
            imageUrl,
            price: Number(price),
            phone
        });
        
        await cartRepository.save(cartItem);
        return NextResponse.json({ message: '商品已添加到购物车' });
    } catch (error) {
        console.error('添加购物车失败:', error);
        return NextResponse.json(
            { error: '添加购物车失败', details: (error as Error).message },
            { status: 500 }
        );
    }
}

// 获取用户购物车商品
export async function GET(request: NextRequest) {
    try {
        const phone = request.nextUrl.searchParams.get('phone');
        
        
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        
        const cartRepository = AppDataSource.getRepository(CartTable);
        const cartItems = await cartRepository.find({
            order: { createdAt: 'DESC' }
        });
        
        console.log('数据库查询结果:', cartItems); // 添加调试日志
        return NextResponse.json(cartItems.map(item => ({
          ...item,
          mainImageUrl: item.imageUrl
        })));
    } catch (error) {
        console.error('获取购物车失败:', error);
        return NextResponse.json(
            { error: '获取购物车失败', details: (error as Error).message },
            { status: 500 }
        );
    }
}