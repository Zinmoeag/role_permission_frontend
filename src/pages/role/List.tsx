import { Suspense } from "react";
import AppErrorBoundary from "../../components/AppErrorBoundary";
import RoleList from "./component/RoleList";
import { Box, styled } from "@mui/material";
import PageLoader from "../../components/PageLoader";

const MainContentWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  marginTop: "1rem",
}));
const List = () => {
  return (
    <MainContentWrapper>
      <AppErrorBoundary>
          <RoleList />
      </AppErrorBoundary>
    </MainContentWrapper>
  );
};

export default List;
