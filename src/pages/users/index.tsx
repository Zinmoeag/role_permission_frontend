import AppErrorBoundary from "../../components/AppErrorBoundary";
import UserList from "./components/UserLIst";
import { Box } from "@mui/material";

const Users = () => {
  return (
    <Box sx={{padding : 2}}>
      <AppErrorBoundary>
        <UserList />
      </AppErrorBoundary>
    </Box>
  );
};

export default Users;
