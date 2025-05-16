import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '@/lib/database';
import { UserTableCreation } from '@/lib/entities/UserTableCreation';

export async function GET() {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        const userRepository = AppDataSource.getRepository(UserTableCreation);
        const users = await userRepository.find();
        return NextResponse.json(users);
    } catch (error) {
        console.error('获取用户列表失败:', error);
        return NextResponse.json(
            { 
                error: '获取用户列表失败',
                details: (error as Error).message 
            },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const userData = await request.json();
        // 添加长度验证
        if (userData.username.length > 10) {
            return NextResponse.json(
                { error: '用户名不能超过10个字符' },
                { status: 400 }
            );
        }
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        const userRepository = AppDataSource.getRepository(UserTableCreation);
        
        const user = new UserTableCreation();
        user.username = userData.username;
        user.password = userData.password;
        user.phone = userData.phone;
        
        // 添加错误日志输出
        console.log('Creating user:', user);
        await userRepository.save(user);
        
        return NextResponse.json({ message: '用户创建成功', user });
    } catch (error) {
        // 添加详细错误日志
        console.error('创建用户失败:', error);
        return NextResponse.json(
            { error: '创建用户失败', details: (error as Error).message },
            { status: 500 }
        );
    }
}