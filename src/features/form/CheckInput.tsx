import { useEffect, useState } from "react";
import { TextInput } from "./components";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { CircularProgress } from "@mui/material";
import { state, stateType } from "../../type/common";
import { useMutation } from "@tanstack/react-query";
import axiosClient from "../../axios/axiosClient";
import useDebounce from "../../hooks/useDebounce";
import { useFormContext } from "react-hook-form";

type CheckInputProps<v> = {
  name: string;
  isLoading: boolean;
  checkedDecision: (data: v) => boolean;
  setDecisionState?: (data : stateType) => void;
  // DesicionState : stateType
};

const InputEndIcon = ({ val }: { val: stateType }) => {
  switch (true) {
    case val === state.LOADING:
      return <CircularProgress size={20} color="inherit" />;
    case val === state.SUCCESS:
      return <CheckIcon />;
    case val === state.FAILED:
      return <ClearIcon />;
    default:
      return <></>;
  }
};

const CheckInput = <v extends object>({
  name,
  isLoading,
  checkedDecision,
  setDecisionState
}: CheckInputProps<v>) => {

  const form = useFormContext() as FormContextType;
  const [value, setValue] = useState<string>("");
  const [checkState, setCheckState] = useState<stateType>("IDLE");
  const debouncedVal = useDebounce<string>(value, 1000);

  const handleIsSuccess = (data: v) => {
    if (checkedDecision(data)) {
      setDecisionState && setDecisionState(state.FAILED);
      setCheckState(state.FAILED);
      form.setError(name, { type: 'Checking', message: 'checking failed' })
    } else {
      setDecisionState && setDecisionState(state.SUCCESS);
      setCheckState(state.SUCCESS);
    }
  };

  const { mutate } = useMutation({
    mutationFn: (id: string) => {
      setCheckState(state.LOADING);
      return axiosClient.post(`/dashboard/role/checkid/${id}`);
    },
    onSuccess: (res) => {
      handleIsSuccess(res.data);
    },

    onError: () => {
      setCheckState(state.FAILED);
    },
  });

  useEffect(() => {
    if (debouncedVal) {
      mutate(debouncedVal);
    }
  }, [debouncedVal, mutate]);

  return (
    <>
      <TextInput
        name={name}
        type="number"
        onChange={(e) => setValue(e.target.value)}
        label="Role ID"
        placeholder="Role ID"
        isLoading={isLoading}
        disabled={checkState === state.LOADING}
        endAdornment={<InputEndIcon val={checkState} />}
      />
    </>
  );
};

export default CheckInput;
