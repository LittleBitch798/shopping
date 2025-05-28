import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '@/lib/database';
import { UserTableCreation } from '@/lib/entities/UserTableCreation';

export async function POST(request: NextRequest) {
    try {
        const { productId } = await request.json();
        
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        
        const userRepository = AppDataSource.getRepository(UserTableCreation);
        // 这里需要获取当前登录用户，简化处理使用第一个用户
        const user = await userRepository.findOne({ where: { id: 1 } });
        
        if (!user) {
            return NextResponse.json(
                { error: '用户不存在' },
                { status: 404 }
            );
        }
        
        // 解析现有购物车
        const cart = JSON.parse(user.shopCar || '[]');
        // 添加新商品ID
        cart.push(productId);
        // 更新购物车
        user.shopCar = JSON.stringify(cart);
        
        await userRepository.save(user);
        
        return NextResponse.json({ message: '购物车更新成功' });
    } catch (error) {
        console.error('更新购物车失败:', error);
        return NextResponse.json(
            { error: '更新购物车失败', details: (error as Error).message },
            { status: 500 }
        );
    }
}