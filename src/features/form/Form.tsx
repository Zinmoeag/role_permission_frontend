import { PropsWithChildren, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, SubmitBtn, PasswordInput } from "./components";
import { z } from "zod";
import { useMemo } from "react";
import CheckInput from "./CheckInput";
import SelectInput from "./components/SelectInput";

function getDefaults<Schema extends z.AnyZodObject>(schema: Schema) {
  return Object.fromEntries(
    Object.entries(schema.shape).map(([key, value]) => {
      if (value instanceof z.ZodDefault)
        return [key, value._def.defaultValue()];
      return [key, undefined];
    })
  );
}

type formProps<T extends z.AnyZodObject> = {
  schema: T;
  loading: boolean;
  onSubmit: (data: z.infer<T>) => void;
  returnError: Record<string, string>[] | null;
  defaultValue?: z.infer<T>;
};

const Form = <T extends z.AnyZodObject>({
  children,
  ...props
}: PropsWithChildren<formProps<T>>) => {
  const methods = useForm({
    defaultValues:  props.defaultValue || getDefaults(props.schema),
    resolver: zodResolver(props.schema),
  });

  const errorMessage = useMemo(() => {
    return methods.formState.errors.form_error?.message;
  }, [methods.formState.errors.form_error]);

  useEffect(() => {
    if (props.returnError != null) {
      props.returnError.forEach((error) => {
        Object.entries(error).forEach(([key, value]) => {
          methods.setError(key as string, { message: value });
        });
      });
    }
  }, [props.returnError, methods]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(props.onSubmit)}>{children}</form>
    </FormProvider>
  );
};

Form.PasswordInput = PasswordInput;
Form.TextInput = TextInput;
Form.SubmitBtn = SubmitBtn;
Form.CheckInput = CheckInput;
Form.SelectInput = SelectInput

export default Form;
