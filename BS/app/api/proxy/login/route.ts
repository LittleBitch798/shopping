import { NextRequest, NextResponse } from 'next/server';
import { AppDataSource } from '@/lib/database';
import { UserTableCreation } from '@/lib/entities/UserTableCreation';

export async function POST(request: NextRequest) {
    try {
        const { phone, password } = await request.json();
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        const userRepository = AppDataSource.getRepository(UserTableCreation);

        const user = await userRepository.findOne({
            where: { phone, password }
        });

        if (user) {
            return NextResponse.json({ message: '登录成功', user });
        } else {
            return NextResponse.json(
                { error: '手机号或密码错误' },
                { status: 401 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { error: '登录失败' },
            { status: 500 }
        );
    }
}