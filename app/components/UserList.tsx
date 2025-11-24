'use client';

import { deleteUser } from '@/app/actions';
import PostForm from './PostForm';

export default function UserList({ users }: { users: any[] }) {
    return (
        <ul className="user-list">
            {users.map((user) => (
                <li key={user.id} className="user-card">
                    <div className="user-header">
                        <div>
                            <div className="user-name">{user.name}</div>
                            <div className="user-email">{user.email}</div>
                        </div>
                        <button
                            onClick={async () => {
                                if (confirm('Are you sure you want to delete this user?')) {
                                    await deleteUser(user.id);
                                }
                            }}
                            className="btn btn-danger"
                        >
                            Delete
                        </button>
                    </div>

                    <div className="post-list">
                        <h3 className="section-title">Posts</h3>
                        {user.posts && user.posts.length > 0 ? (
                            user.posts.map((post: any) => (
                                <div key={post.id} className="post-item">
                                    <div className="post-title">{post.title}</div>
                                    {post.content && <div className="post-content">{post.content}</div>}
                                </div>
                            ))
                        ) : (
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontStyle: 'italic', marginBottom: '0.5rem' }}>
                                No posts yet.
                            </p>
                        )}
                        <PostForm authorId={user.id} />
                    </div>
                </li>
            ))}
        </ul>
    );
}
