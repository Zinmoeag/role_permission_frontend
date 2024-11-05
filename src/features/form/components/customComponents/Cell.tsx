
import { TableCell, Box } from "@mui/material";
import {styled} from "@mui/system";
import { PropsWithChildren } from "react";

type SizeType = 'mini' | 'small' | 'medium' | 'large' | 'w10' | 'w15' | 'w20' | 'w30' | 'w40' | 'w50';

const cellWidth = (size : SizeType) : string => {
    const widthMapping = {
        mini: '50px',
        small: '100px',
        medium: '150px',
        large: '200px',

        w10: '10%',
        w15: '15%',
        w20: '20%',
        w30: '30%',
        w40: '40%',
        w50: '50%'
    };

    return widthMapping[size] || 'auto';
};

type styledCellProps = {
    size? : SizeType,
    backgroundColor? : string,
}

type CellProps = {
    size? : SizeType,
    colspan? : number,
    backgroundColor? : string,
    direction? : "column" | "row",
}

type styledCellBoxProps = {
    direction? : "column" | "row",
}


const StyledCell = styled(TableCell)<styledCellProps>(({...props}) => ({
    border : '1px solid #e1e3e3',
    padding : '10px',
    width : props?.size ? cellWidth(props.size) : "auto",
    backgroundColor : props?.backgroundColor || 'transparent',
}))

const StyledCellBox = styled(Box)<styledCellBoxProps>(({...props}) => ({
    display : 'flex',
    flexDirection : props?.direction || "row",
    gap : "4px",
    alignItems : "start",
    justifyContent : "top",

}))


const Cell = ({children, ...props} : PropsWithChildren<CellProps>) => {
    return (
        <StyledCell {...props}>
            <StyledCellBox {...props}>
                {children}
            </StyledCellBox>
        </StyledCell>
    )
}

export default Cell;