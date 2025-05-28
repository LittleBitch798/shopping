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
        // 简化处理，使用第一个用户
        const user = await userRepository.findOne({ where: { id: 1 } });
        
        if (!user) {
            return NextResponse.json(
                { error: '用户不存在' },
                { status: 404 }
            );
        }
        
        // 解析现有购物车
        const cart = JSON.parse(user.shopCar || '[]');
        // 过滤掉要移除的商品ID
        const updatedCart = cart.filter((id: number) => id !== productId);
        // 更新购物车
        user.shopCar = JSON.stringify(updatedCart);
        
        await userRepository.save(user);
        
        return NextResponse.json({ message: '商品已移除' });
    } catch (error) {
        console.error('移除商品失败:', error);
        return NextResponse.json(
            { error: '移除商品失败', details: (error as Error).message },
            { status: 500 }
        );
    }
}