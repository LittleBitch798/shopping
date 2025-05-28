import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '@/lib/database';
import { UserTableCreation } from '@/lib/entities/UserTableCreation';
import { ProductTableCreation } from '@/lib/entities/ProductTableCreation';

export async function POST(request: NextRequest) {
    try {
        const { phone, password } = await request.json();
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        
        const userRepository = AppDataSource.getRepository(UserTableCreation);
        const productRepository = AppDataSource.getRepository(ProductTableCreation);

        const user = await userRepository.findOne({
            where: { phone, password }
        });

        if (user) {
            // 获取购物车商品详情
            const cartItems = JSON.parse(user.shopCar || '[]');
            const products = await productRepository.findByIds(cartItems);
            
            return NextResponse.json({ 
                message: '登录成功', 
                user,
                cart: products // 返回购物车商品详情
            });
        } else {
            return NextResponse.json(
                { error: '手机号或密码错误' },
                { status: 401 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { error: '登录失败' },
            { status: 500 }
        );
    }
}