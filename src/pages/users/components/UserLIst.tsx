import devDB from "../../../utils/_devdb";
import useMockQuery from "../../../hooks/useMockQuery";
import { Avatar, Paper, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AppError from "../../../utils/AppError";
import { StatusCode } from "../../../utils/Status";
import PageLoader from "../../../components/PageLoader";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
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
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
];

const paginationModel = { page: 0, pageSize: 5 };

const UserList = () => {
  const { data, isPending, isFetching, isError } = useMockQuery(
    ["users"],
    devDB.users()
  );

  if (isError) throw new AppError(StatusCode.InternalServerError, "server error");

  if (isPending || isFetching) return <PageLoader />;

  return (
    <>
      <Paper
      >
        <DataGrid
          rows={data || []}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0, backgroundColor: "#f5f5f5" }}
        />
      </Paper>
    </>
  );
};

export default UserList;
