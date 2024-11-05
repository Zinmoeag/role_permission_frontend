import { Typography, Box } from '@mui/material';
import FormComponent from './component/Form';
import { useQuery } from '@tanstack/react-query';

const Create = () => {
    return (
        <>
            <Box backgroundColor="#fff" borderRadius={2} sx={{px : 3, py :1 , my : 2}}>
                <Typography variant="h5" className="uppercase" sx={{my: 1}}> Create </Typography>
                <FormComponent 
                    formType="create"
                />
            </Box>
        </>
    )
}
export default Create;