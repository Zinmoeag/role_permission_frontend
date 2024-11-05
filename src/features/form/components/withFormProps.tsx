import { ComponentProps, JSXElementConstructor } from "react";
import { useFormContext } from "react-hook-form";

const WithFormProps = (WrappedComponent: JSXElementConstructor<any>) => {
  const PropsSetupComponent = (props: ComponentProps<any>) => {
    const form = useFormContext();
    return <WrappedComponent {...props} {...form} />;
  };

  return PropsSetupComponent;
};

export default WithFormProps;
