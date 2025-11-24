'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getUsers() {
    return await prisma.user.findMany({
        include: { posts: true },
        orderBy: { id: 'desc' },
    });
}

export async function createUser(formData: FormData) {
    const email = formData.get('email') as string;
    const name = formData.get('name') as string;

    if (!email || !name) {
        return { error: 'Email and Name are required' };
    }

    try {
        await prisma.user.create({
            data: {
                email,
                name,
            },
        });
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        return { error: 'Failed to create user' };
    }
}

export async function deleteUser(id: number) {
    try {
        await prisma.user.delete({
            where: { id },
        });
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        return { error: 'Failed to delete user' };
    }
}

export async function createPost(formData: FormData) {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const authorId = Number(formData.get('authorId'));

    if (!title || !authorId) {
        return { error: 'Title and Author ID are required' };
    }

    try {
        await prisma.post.create({
            data: {
                title,
                content,
                authorId,
            },
        });
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        return { error: 'Failed to create post' };
    }
}
