import { Controller } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select, Box, FormHelperText } from "@mui/material";
import { CSSProperties } from "react";

type Option = {
  label: string;
  value: string;
};

type SelectInputProps = {
  name: string;
  options: Option[];
  label: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputStyle?: CSSProperties;
  menuStyle?: CSSProperties;
};

const SelectInput = (props: SelectInputProps) => {
  const { name, options, label, inputStyle, menuStyle } = props;
  const form = useFormContext();

  const customOnChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onChangeFromFormHook: (e: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    // const result = await form.validate(name)
    const isValidate = await form.trigger(name);
    if (isValidate) {
      if (props.type) {
        let value = e.target.value;
        value = value.replace(/\D/g, "");
        e.target.value = value;
      }

      if (props.onChange) {
        props.onChange(e);
      }
      onChangeFromFormHook(e);
    }
  };

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => {
        return (
          <FormControl
            fullWidth
            sx={{ height: "40px", padding: "0", ...(inputStyle && inputStyle) }}
          >
            <InputLabel
              id={`label-${name}`}
              sx={{ fontSize: "14px", height: "40px" }}
            >
              {label}
            </InputLabel>
            <Select
              sx={{
                height: "40px",
                ...(inputStyle && inputStyle),
              }}
              labelId={`label-${name}`}
              id={`id-${name}`}
              label={label}
              {...field}
              onChange={(e) => customOnChange(e, field.onChange)}
            >
              {options.map((option: Option) => (
                <MenuItem
                  value={option.value}
                  sx={{ fontSize: "14px", ...(menuStyle && menuStyle) }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText sx={{ fontSize: "10px" }} error>{form?.formState?.errors[name]?.message}</FormHelperText>
          </FormControl>
        );
      }}
    />
  );
};

export default SelectInput;
