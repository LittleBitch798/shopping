import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '@/lib/database';
import { UserTableCreation } from '@/lib/entities/UserTableCreation';

export async function POST(request: NextRequest) {
    try {
        // 验证请求体
        if (!request.body) {
            return NextResponse.json(
                { error: '请求体不能为空' },
                { status: 400 }
            );
        }

        const { orderId } = await request.json();
        
        // 验证必要字段
        if (!orderId) {
            return NextResponse.json(
                { error: '缺少必要参数: orderId' },
                { status: 400 }
            );
        }

        // 初始化数据库连接
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
        
        // 解析现有物流信息
        const shippingInfo = user.shippingInfo ? JSON.parse(user.shippingInfo) : [];
        
        // 过滤掉要删除的订单
        const updatedShippingInfo = shippingInfo.filter((item: any) => item.id !== orderId);
        
        // 更新并保存
        user.shippingInfo = JSON.stringify(updatedShippingInfo);
        await userRepository.save(user);
        
        return NextResponse.json({ 
            success: true,
            message: '订单已删除',
            remainingOrders: updatedShippingInfo.length
        });
        
    } catch (error) {
        console.error('删除订单失败:', error);
        return NextResponse.json(
            { 
                error: '删除订单失败',
                details: (error as Error).message 
            },
            { status: 500 }
        );
    }
}