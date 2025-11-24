'use client';

import { useActionState } from 'react';
import { createPost } from '@/app/actions';

const initialState = {
    success: false,
    error: '',
};

export default function PostForm({ authorId }: { authorId: number }) {
    const [state, formAction, isPending] = useActionState(async (prevState: any, formData: FormData) => {
        const result = await createPost(formData);
        if (result.error) {
            return { success: false, error: result.error };
        }
        return { success: true, error: '' };
    }, initialState);

    return (
        <form action={formAction} style={{ marginTop: '1rem' }}>
            <input type="hidden" name="authorId" value={authorId} />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                    type="text"
                    name="title"
                    placeholder="New post title..."
                    required
                    className="input"
                    style={{ flex: 1 }}
                />
                <button type="submit" disabled={isPending} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                    {isPending ? '...' : 'Post'}
                </button>
            </div>
            {state.error && <p style={{ color: 'var(--danger)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{state.error}</p>}
        </form>
    );
}
