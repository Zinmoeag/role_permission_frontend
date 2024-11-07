import { useState } from "react";
import devDB from "../../../utils/_devdb";
import useMockQuery from "../../../hooks/useMockQuery";
import { Avatar, Paper, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AppError from "../../../utils/AppError";
import { StatusCode } from "../../../utils/Status";
import PageLoader from "../../../components/PageLoader";
import useUser from "../../../hooks/user/useUser";
import { UserParams } from "../../../api/userApi";

const columns = [
  { field: "id", headerName: "ID", width: 300 },
  {
    field: "avatar",
    headerName: "Avatar",
    sortable: false,
    renderCell: ({ row }) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Avatar
          sx={{ width: 30, height: 30 }}
          alt={row.name}
          src={row.avatar}
        />
      </Box>
    ),
  },
  {
    field: "name",
    headerName: "Name",
    flex : 1,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field : "role_name",
    headerName : "Role",
    width : 100
  }
];

const pageSize = [5,10,15];

const UserList = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: pageSize[1],
  });

  //query
  const { data, isPending, isFetching, isError } = useUser({
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
  });

  //DEBUG MOCK query
  //   const { data, isPending, isFetching, isError } = useMockQuery(
  //     ["users"],
  //     devDB.users()
  //   );

  if (isError)
    throw new AppError(StatusCode.InternalServerError, "server error");

  if (isPending || isFetching) return <PageLoader />;

  return (
    <>
      <Paper>
        <DataGrid
          paginationMode="server"
          rows={data.paginatedData || []}
          rowCount={data.totalCount}
          loading={isPending || isFetching}
          columns={columns}
          paginationModel={paginationModel}
          pageSizeOptions={pageSize}
          sx={{ border: 0, backgroundColor: "#f5f5f5" }}
          onPaginationModelChange={(params) => {
            setPaginationModel(params);
          }}
        />
      </Paper>
    </>
  );
};

export default UserList;
