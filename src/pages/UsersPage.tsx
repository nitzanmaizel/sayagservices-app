import PageWrapper from './PageWrapper';
import UsersList from '../components/UsersList';
import UsersModal from '../components/Users/UsersModal';

const UsersPage = () => {
  return (
    <PageWrapper title='רשימת משתמשים' trigger={<UsersModal />}>
      <UsersList />
    </PageWrapper>
  );
};

export default UsersPage;
