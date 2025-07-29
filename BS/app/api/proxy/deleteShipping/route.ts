import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '@/lib/database';
import { ShippingTable } from '@/lib/entities/ShippingTable';

// 删除物流订单
export async function POST(request: NextRequest) {
    try {
        const { orderId } = await request.json();
        
        if (!orderId) {
            return NextResponse.json(
                { error: '缺少必要参数: orderId' },
                { status: 400 }
            );
        }

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        
        const shippingRepository = AppDataSource.getRepository(ShippingTable);
        const result = await shippingRepository.delete(orderId);
        
        if (result.affected === 0) {
            return NextResponse.json(
                { error: '未找到指定订单' },
                { status: 404 }
            );
        }
        
        return NextResponse.json({ message: '订单删除成功' });
    } catch (error) {
        console.error('删除订单失败:', error);
        return NextResponse.json(
            { error: '删除订单失败', details: (error as Error).message },
            { status: 500 }
        );
    }
}