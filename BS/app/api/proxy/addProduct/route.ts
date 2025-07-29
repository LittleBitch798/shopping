import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '@/lib/database';
import { ProductTable } from '@/lib/entities/ProductTable';

export async function GET() {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        const productRepository = AppDataSource.getRepository(ProductTable);
        const products = await productRepository.find();
        return NextResponse.json(products); // 数据库字段自动映射为imageUrl
    } catch (error) {
        console.error('获取商品列表失败:', error);
        return NextResponse.json(
            { 
                error: '获取商品列表失败',
                details: (error as Error).message 
            },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        // 修改请求参数匹配实体字段
        const { productName, description, imageUrl, price } = await request.json();
        
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        
        const productRepository = AppDataSource.getRepository(ProductTable);
        const product = productRepository.create({
            productName,  // 字段名从name改为productName
            description,
            imageUrl,     // 字段名从mainImageUrl改为imageUrl
            price: Number(price) || 0
        });
        
        await productRepository.save(product);
        return NextResponse.json(product);
    } catch (error) {
        // 修正错误日志描述
        console.error('创建商品失败:', error);
        return NextResponse.json(
            { error: '创建商品失败', details: (error as Error).message },
            { status: 500 }
        );
    }
}