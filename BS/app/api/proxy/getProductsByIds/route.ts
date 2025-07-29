import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '@/lib/database';
import { ProductTable } from '@/lib/entities/ProductTable';

// 根据ID列表获取产品信息
export async function POST(request: NextRequest) {
    try {
        const { ids } = await request.json();
        
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json(
                { error: '请提供有效的产品ID列表' },
                { status: 400 }
            );
        }

        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        
        const productRepository = AppDataSource.getRepository(ProductTable);
        const products = await productRepository.findByIds(ids);
        
        // 将产品信息格式化为shipping页面期望的格式
        const formattedProducts = products.map(product => ({
            id: product.id,
            name: product.productName,
            description: product.description,
            mainImageUrl: product.imageUrl,
            price: product.price
        }));
        
        return NextResponse.json(formattedProducts);
    } catch (error) {
        console.error('获取产品信息失败:', error);
        return NextResponse.json(
            { error: '获取产品信息失败', details: (error as Error).message },
            { status: 500 }
        );
    }
}