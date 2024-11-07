import AppErrorBoundary from "../../components/AppErrorBoundary";
import UserList from "./components/UserLIst";

const Users = () => {
  return (
    <AppErrorBoundary>
      <UserList />
    </AppErrorBoundary>
  );
};

export default Users;
