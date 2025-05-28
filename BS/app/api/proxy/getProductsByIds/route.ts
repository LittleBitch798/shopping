import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '@/lib/database';
import { ProductTableCreation } from '@/lib/entities/ProductTableCreation';

export async function POST(request: NextRequest) {
    try {
        const { ids } = await request.json();
        
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        
        const productRepository = AppDataSource.getRepository(ProductTableCreation);
        const products = await productRepository.findByIds(ids);
        
        return NextResponse.json(products);
    } catch (error) {
        console.error('获取商品详情失败:', error);
        return NextResponse.json(
            { error: '获取商品详情失败', details: (error as Error).message },
            { status: 500 }
        );
    }
}