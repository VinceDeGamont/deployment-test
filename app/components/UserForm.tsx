'use client';

import { useActionState } from 'react';
import { createUser } from '@/app/actions';

const initialState = {
    success: false,
    error: '',
};

export default function UserForm() {
    const [state, formAction, isPending] = useActionState(async (prevState: any, formData: FormData) => {
        const result = await createUser(formData);
        if (result.error) {
            return { success: false, error: result.error };
        }
        return { success: true, error: '' };
    }, initialState);

    return (
        <form action={formAction} className="card">
            <h2 className="section-title">Add New User</h2>
            <div className="form-group">
                <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    required
                    className="input"
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    className="input"
                />
            </div>
            {state.error && <p style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{state.error}</p>}
            <button type="submit" disabled={isPending} className="btn btn-primary">
                {isPending ? 'Adding...' : 'Add User'}
            </button>
        </form>
    );
}
