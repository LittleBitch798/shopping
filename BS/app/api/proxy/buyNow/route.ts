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

        const { productId, address } = await request.json();
        
        // 验证必要字段
        if (!productId || !address) {
            return NextResponse.json(
                { error: '缺少必要参数: productId或address' },
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
        
        // 解析或初始化shippingInfo
        const shippingInfo = user.shippingInfo ? JSON.parse(user.shippingInfo) : [];
        
        // 添加新的购买记录
        shippingInfo.push({ productId, address });
        
        // 更新并保存
        user.shippingInfo = JSON.stringify(shippingInfo);
        await userRepository.save(user);
        
        return NextResponse.json({ 
            success: true,
            message: '购买信息已保存'
        });
        
    } catch (error) {
        console.error('保存购买信息失败:', error);
        return NextResponse.json(
            { 
                error: '保存购买信息失败',
                details: (error as Error).message 
            },
            { status: 500 }
        );
    }
}