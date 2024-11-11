import Form from "../../../features/form/Form";
import { Box } from "@mui/material";
import { z } from "zod";

const postFilterSchema = z.object({
  searchValue: z.string(),
  searchBy: z.string(),
  role: z.string().optional(),
  sort : z.string().optional(),
});

type UserfilterFormProps = {
  defaultValue: z.infer<typeof postFilterSchema>;
  handleSearchChange: (value: z.infer<typeof postFilterSchema>) => void;
  handleRoleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hamdleSortingChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const UserFilterForm = (props: UserfilterFormProps) => {
  const {
    defaultValue,
    handleSearchChange,
    handleRoleChange,
    hamdleSortingChange,
  } = props;

  return (
    <Box sx={{ mb: "30px" }}>
      <Form
        defaultValue={defaultValue}
        schema={postFilterSchema}
        onSubmit={handleSearchChange}
        loading={false}
        returnError={null}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            <Form.SelectInput
              inputStyle={{ width: "200px" }}
              name="role"
              label="User Role"
              placeholder=""
              options={[
                { value: "all", label: "All" },
                { value: "USER", label: "User" },
                { value: "ADMIN", label: "Admin" },
              ]}
              onChange={handleRoleChange}
            />

            <Form.SelectInput
              inputStyle={{ width: "200px" }}
              name="sort"
              label="Sort By"
              placeholder=""
              options={[
                { value: "desc", label: "Lastest" },
                { value: "asc", label: "Eldest" },
              ]}
              onChange={hamdleSortingChange}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Form.SelectInput
              name="searchBy"
              label="Search By"
              placeholder=""
              inputStyle={{ width: "200px" }}
              options={[
                { value: "all", label: "All" },
                { value: "name", label: "Name" },
                { value: "email", label: "Email" },
              ]}
            />

            <Form.TextInput
              isLoading={false}
              className=""
              inputStyle={{ width: "300px" }}
              label="search"
              name="searchValue"
              placeholder="Search ......"
            />
            <Form.SubmitBtn isLoading={false} text="Search" width="100px" />
          </Box>
        </Box>
      </Form>
    </Box>
  );
};

export default UserFilterForm;
