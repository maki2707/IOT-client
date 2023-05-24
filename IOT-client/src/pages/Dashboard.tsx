import { Loading } from '../components/Loading';
import useGetUser from '../hooks/useGetUser';

export const Dashboard = () => {
  const { data: userData, isLoading } = useGetUser();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loading />
      </div>
    );
  }

  return <div className="login-text">Hi, {userData.firstName}! Welcome back!</div>;
};
