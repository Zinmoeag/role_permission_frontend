import { LoginFormSchema } from "../../schema/AuthSchema";
import { z } from "zod";
import AuthFormComponent from "../../components/authFormComponent";
import Form from "../../features/form/Form";
import useSignInHook from "../../hooks/auth/useSignInHook";

const SignIn = () => {
  //login logic
  const { isPending, mutate, returnError } = useSignInHook();

  const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
    mutate(data);
  };

  //ui
  return (
    <>
      <AuthFormComponent component="LOGIN">
        <div className="mb-4">
          <Form
            loading={isPending}
            returnError={returnError}
            onSubmit={onSubmit}
            schema={LoginFormSchema}
          >
            <Form.TextInput
              isLoading={false}
              label="Email"
              name="email"
              placeholder="Enter your email"
              className="my-2"
            />
            <Form.PasswordInput
              label="Password"
              name="password"
              placeholder="Enter your password"
              className="my-2"
              passwordToggler={true}
            />
            <Form.SubmitBtn isLoading={false} text="Login" width="100%" />
          </Form>
        </div>
      </AuthFormComponent>
    </>
  );
};

export default SignIn;
