import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Box, OutlinedInput } from "@mui/material";

type TextInputProps = {
  name: string;
  type?: "number" | "string";
  label: string;
  isLoading: boolean;
  placeholder: string;
  disabled?: boolean;
  className?: string;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TextInput: React.FC<TextInputProps> = (props) => {

  const form = useFormContext();
  const customOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChangeFromFormHook: (e: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    if (props.type) {
      let value = e.target.value;
      value = value.replace(/\D/g, "");
      e.target.value = value;
    }

    if (props.onChange) {
      props.onChange(e);
    }
    onChangeFromFormHook(e);
  };

  return (
    <>
      <Controller
        name={props.name}
        control={form.control}
        render={({ field: { onChange, value, ...field } }) => (
          <>
            <Box width="100%">
              <OutlinedInput
                size="small"
                placeholder={props.placeholder}
                className={`w-full ${props.className}`}
                value={value || ""}
                disabled={props?.disabled}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
                  customOnChange(e, onChange)
                }}
                endAdornment={props.endAdornment}
                {...field}
              />
            </Box>
          </>
        )}
      />
    </>
  );
};
