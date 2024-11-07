import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../../../api/roleApi";
import PageLoader from "../../../components/PageLoader";
import { AxiosErrorToAppError } from "../../../utils/AppError";
import { AxiosError } from "axios";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "firstName",
    headerName: "First name",
    flex: 0.2,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "lastName",
    headerName: "Last name",
    flex: 0.2,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    // width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    flex: 0.5,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];
1;
const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

const RoleList = () => {
  const query = useQuery({
    queryKey: ["role"],
    queryFn: getRoles,
  });

  if (query.isLoading) return <PageLoader />;
  if (query.isError) throw AxiosErrorToAppError(query.error as AxiosError);

  return (
    <Paper sx={{ width: "100%", paddingX: "20px", backgroundColor: "#f5f5f5" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0, backgroundColor: "#f5f5f5" }}
      />
    </Paper>
  );
};

export default RoleList;
