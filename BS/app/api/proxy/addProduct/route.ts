import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '@/lib/database';
import { ProductTableCreation } from '@/lib/entities/ProductTableCreation';

export async function GET() {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        const productRepository = AppDataSource.getRepository(ProductTableCreation);
        const products = await productRepository.find();
        return NextResponse.json(products);
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
        const { name, description, mainImageUrl, price } = await request.json();
        
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        
        const productRepository = AppDataSource.getRepository(ProductTableCreation);
        const product = productRepository.create({
            name,
            description,
            mainImageUrl,
            price: Number(price) || 0 // 确保price有值
        });
        
        await productRepository.save(product);
        return NextResponse.json(product);
    } catch (error) {
        // 添加详细错误日志
        console.error('创建用户失败:', error);
        return NextResponse.json(
            { error: '创建用户失败', details: (error as Error).message },
            { status: 500 }
        );
    }
}