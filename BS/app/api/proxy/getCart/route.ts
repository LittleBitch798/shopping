import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '@/lib/database';
import { UserTableCreation } from '@/lib/entities/UserTableCreation';

export async function GET() {
    try {
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
        
        return NextResponse.json(user);
    } catch (error) {
        console.error('获取购物车失败:', error);
        return NextResponse.json(
            { error: '获取购物车失败', details: (error as Error).message },
            { status: 500 }
        );
    }
}