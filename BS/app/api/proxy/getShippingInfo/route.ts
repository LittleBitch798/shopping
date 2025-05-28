import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '@/lib/database';
import { UserTableCreation } from '@/lib/entities/UserTableCreation';

export async function GET(request: NextRequest) {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        
        const userRepository = AppDataSource.getRepository(UserTableCreation);
        const user = await userRepository.findOne({ where: { id: 1 } });
        
        if (!user) {
            return NextResponse.json(
                { error: '用户不存在' },
                { status: 404 }
            );
        }
        
        // 返回varchar格式的物流信息
        return NextResponse.json({ 
            shippingInfo: user.shippingInfo || '[]'
        });
        
    } catch (error) {
        console.error('获取物流信息失败:', error);
        return NextResponse.json(
            { error: '获取物流信息失败' },
            { status: 500 }
        );
    }
}