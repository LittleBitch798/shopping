import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '@/lib/database';
import { UserTableCreation } from '@/lib/entities/UserTableCreation';
import { ProductTable } from '@/lib/entities/ProductTable';

export async function POST(request: NextRequest) {
    try {
        const { phone, password } = await request.json();
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        
        const userRepository = AppDataSource.getRepository(UserTableCreation);
        // 移除ProductTable相关引用
        const user = await userRepository.findOne({
            where: { phone, password }
        });

        if (user) {
            // 删除购物车相关逻辑
            return NextResponse.json({ 
                message: '登录成功', 
                user
                // 移除cart字段
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