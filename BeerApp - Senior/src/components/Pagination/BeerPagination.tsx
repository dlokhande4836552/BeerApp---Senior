import {Stack} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import {ChangeEvent} from "react";

type PaginationProps = {
    total: number;
    perPageCount: number;
    currentPage: number;
    onPageChange:(value: number) => void;
}
export default function BeerPagination(props: PaginationProps) {
    const handleChange = (event: ChangeEvent<unknown>, value: number) => {
        props.onPageChange(value);
    };

    return (
        <Stack spacing={2}>
            <Pagination count={Math.ceil(props.total / props.perPageCount)} color="primary" onChange={handleChange} page={props.currentPage}/>
        </Stack>
    );
}