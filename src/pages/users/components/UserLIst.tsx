//debugger
import devDB from "../../../utils/_devdb";
import useMockQuery from "../../../hooks/useMockQuery";
import { useSearchParams } from "react-router-dom";
import useUser from "../../../hooks/user/useUser";
import { Avatar, Paper, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PageLoader from "../../../components/PageLoader";
import { AxiosError } from "axios";
import { AxiosErrorToAppError } from "../../../utils/AppError";
import { handlePageChange } from "..";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 300,
    sortable: false,
    headerClassName: "bg-skin-main",
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "bg-skin-main",
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
    headerClassName: "bg-skin-main",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    headerClassName: "bg-skin-main",
    flex: 1,
  },
  {
    field: "role_name",
    headerName: "Role",
    headerClassName: "bg-skin-main",
    width: 100,
  },
];

const pageSize = [5, 10, 15];

type UserList = {
  pagination: { page: number; pageSize: number };
  handlePageChange: handlePageChange;
  filter : {searchBy : string, searchValue : string, role ?: string, sort ?: string, sortBy ?: string};
};

const UserList = (props: UserList) => {
  const { pagination, handlePageChange, filter } = props;

  //query
  const { data, isPending, isFetching, isError, error } = useUser({
    page: String(pagination.page + 1),
    limit: String(pagination.pageSize),
    searchBy : filter.searchBy || "",
    searchValue : filter.searchValue || "",
    role : filter.role || "",

    sort : filter.sort || "",
    sortBy : filter.sortBy || "",
  });

  //DEBUG MOCK query
  //   const { data, isPending, isFetching, isError } = useMockQuery(
  //     ["users"],
  //     devDB.users()
  //   );

  if (isError) throw AxiosErrorToAppError(error as AxiosError);

  if (isPending || isFetching) return <PageLoader />;

  if(data && data.paginatedData.length === 0) return <h1>No users found</h1>;

  return (
    <>
      <Paper
        sx={{
          backgroundColor: "transparent",
          "& .headerClass": {
            backgroundColor: "primary",
          },
        }}
      >
        <DataGrid
          paginationMode="server"
          loading={isPending || isFetching}
          rows={data?.paginatedData || []}
          rowCount={data?.totalCount || 0}
          columns={columns}
          paginationModel={pagination}
          pageSizeOptions={pageSize}
          onPaginationModelChange={(params) => {
            handlePageChange({
              page: params.page + 1,
              pageSize: params.pageSize,
            })
          }}
        />
      </Paper>
    </>
  );
};

export default UserList;
