import { Button } from "@mui/material";

type SubmitBtnProps = {
  text: string;
  width? : string;
  isLoading : boolean;
};

export const SubmitBtn: React.FC<SubmitBtnProps> = (props) => {

  const { text, width, isLoading} = props;
  return (
    <>
      <Button 
      type="submit" 
      variant="contained"
      sx = {{
        width : width || '100%'
      }}
      >
        {isLoading ? "loading" : text}
      </Button>
    </>
  );
};
