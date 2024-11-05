import { Table, TableRow, Button, Grid } from "@mui/material";
import Cell from "../../../features/form/components/customComponents/Cell";
import Form from "../../../features/form/Form";
import { RoleFormSchema } from "../../../schema/RoleSchema";
import { useMutation } from "@tanstack/react-query";
import axiosClient from "../../../axios/axiosClient";
import {Schema, z} from "zod"
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type FormComponentProps = {
  formType: "create" | "update";
};

type CheckData = {
  isExist: boolean;
};

const FormComponent: React.FC<FormComponentProps> = (props) => {
  const schema = props.formType === "create" ? RoleFormSchema : RoleFormSchema;
  const [serverReturnError, setServerReturnError] = useState<Record<string, string>[] | null>(null);
  const navigate = useNavigate();

  const {mutate} = useMutation({
    mutationFn : (data : z.infer<Schema>) => {
      return axiosClient.post("/dashboard/role/create", data)
    },
    onSuccess : () => {
        navigate("/")
    },
    onError : (err : AxiosError) => {
        if(err.response?.status === 422){
            console.log("hello")
            setServerReturnError([{role_id : "cannot proceed with this Id"}])
        }
    }
  })

  const handleSubmit = (data : z.infer<typeof RoleFormSchema>) => {
    mutate(data)
  }

  return (
    <Form
      loading={false}
      returnError={serverReturnError}
      onSubmit={(data) => handleSubmit(data)}
      schema={schema}
      defaultValue={{
        role_id : "",
        role_name : "",
      }}
    >
      <Table>
        <TableRow>
          <Cell backgroundColor="#f0f5e4" size="w10">
            Role ID
          </Cell>
          <Cell colspan={3}>
            <Form.CheckInput<CheckData>
              isLoading={false}
              name="role_id"
              checkedDecision={(data) => data.isExist}
            />
          </Cell>
        </TableRow>
        <TableRow>
          <Cell backgroundColor="#f0f5e4" size="w10">
            Role Name
          </Cell>
          <Cell colspan={3}>
            <Form.TextInput
              isLoading={false}
              name="role_name"
              label="Role Name"
              placeholder="Role Name"
            />
          </Cell>
        </TableRow>
      </Table>
      <Grid
        display={"flex"}
        alignItems={"flex-end"}
        justifyContent={"flex-end"}
        gap={1}
        sx={{ my: 2 }}
      >
        <Button variant="outlined"> List</Button>

        <Form.SubmitBtn width="100px" text="Submit" />
      </Grid>
    </Form>
  );
};

export default FormComponent;
