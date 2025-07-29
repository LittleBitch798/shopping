import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '@/lib/database';
import { ShippingTable } from '@/lib/entities/ShippingTable';

// 添加物流信息
export async function POST(request: NextRequest) {
    try {
        const requestData = await request.json();
        console.log('收到物流请求:', requestData);
        
        const { 
            productId, 
            address, 
            phone, 
            productName, 
            description, 
            imageUrl, 
            price
        } = requestData;
        
        if (!productId || !address) {
            throw new Error('缺少必要参数: productId或address');
        }

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        
        const shippingRepository = AppDataSource.getRepository(ShippingTable);
        const shippingItem = new ShippingTable();
        
        shippingItem.productId = productId;
        shippingItem.address = address;
        shippingItem.phone = phone || '';
        shippingItem.productName = productName || '';
        shippingItem.description = description || '';
        shippingItem.imageUrl = imageUrl || '';
        shippingItem.price = price ? Number(price) : 0;
        shippingItem.trackingNumber = '';
        shippingItem.shippingStatus = 'pending';
        shippingItem.shippingCompany = '';
        
        console.log('准备保存物流信息:', shippingItem);
        const savedItem = await shippingRepository.save(shippingItem);
        console.log('物流信息保存成功:', savedItem);
        
        return NextResponse.json({ 
            message: '物流信息已添加',
            id: savedItem.id 
        });
    } catch (error) {
        console.error('保存物流信息失败详情:', error);
        return NextResponse.json(
            {
                error: '添加物流信息失败',
                details: (error as Error).message,
                stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined
            },
            { status: 500 }
        );
    }
}

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
        
        return NextResponse.json(shippingItems);
    } catch (error) {
        console.error('获取物流信息失败:', error);
        return NextResponse.json(
            { error: '获取物流信息失败', details: (error as Error).message },
            { status: 500 }
        );
    }
}