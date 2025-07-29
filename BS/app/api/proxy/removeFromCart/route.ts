import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '@/lib/database';
import { CartTable } from '@/lib/entities/CartTable';

export async function POST(request: NextRequest) {
    try {
        const { productId } = await request.json();
        
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        
        const cartRepository = AppDataSource.getRepository(CartTable);
        await cartRepository.delete(productId);
        
        return NextResponse.json({ message: '商品已从购物车删除' });
    } catch (error) {
        console.error('删除购物车商品失败:', error);
        return NextResponse.json(
            { error: '删除购物车商品失败', details: (error as Error).message },
            { status: 500 }
        );
    }
}