import { getUsers } from './actions';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const users = await getUsers();

  return (
    <div className="container">
      <h1>User Management</h1>

      <UserForm />

      <div style={{ marginTop: '2rem' }}>
        <h2 className="section-title" style={{ marginBottom: '1rem' }}>All Users</h2>
        <UserList users={users} />
      </div>
    </div>
  );
}