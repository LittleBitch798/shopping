import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '@/lib/database';
import { ShippingTable } from '@/lib/entities/ShippingTable';

// 获取物流信息
export async function GET(request: NextRequest) {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        
        const shippingRepository = AppDataSource.getRepository(ShippingTable);
        const shippingItems = await shippingRepository.find({
            order: { createdAt: 'DESC' }
        });
        
        // 将物流信息格式化为shipping页面期望的格式
        const formattedItems = shippingItems.map(item => ({
            id: item.id,
            productId: item.productId,
            address: item.address,
            status: item.shippingStatus as 'pending' | 'shipped' | 'delivered',
            phone: item.phone,
            productName: item.productName,
            description: item.description,
            imageUrl: item.imageUrl,
            price: item.price
        }));
        
        return NextResponse.json({ shippingInfo: formattedItems });
    } catch (error) {
        console.error('获取物流信息失败:', error);
        return NextResponse.json(
            { error: '获取物流信息失败', details: (error as Error).message },
            { status: 500 }
        );
    }
}

// 删除物流信息
export async function POST(request: NextRequest) {
    try {
        const { orderId } = await request.json();
        
        if (!orderId) {
            throw new Error('缺少必要参数: orderId');
        }

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        
        const shippingRepository = AppDataSource.getRepository(ShippingTable);
        await shippingRepository.delete(orderId);
        
        return NextResponse.json({ message: '物流信息已删除' });
    } catch (error) {
        console.error('删除物流信息失败:', error);
        return NextResponse.json(
            { error: '删除物流信息失败', details: (error as Error).message },
            { status: 500 }
        );
    }
}