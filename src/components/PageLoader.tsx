import { LinearProgress, Box, styled } from "@mui/material";

const PageLoaderContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 99,
}));

const PageLoader = () => {
  return (
    <PageLoaderContainer>
      <LinearProgress color="primary" />
    </PageLoaderContainer>
  );
};

export default PageLoader;
