import {ChangeEvent } from "react";
import {Autocomplete, TextField} from "@mui/material";
import {BEER_TYPES2} from "../../const/BeerConstants";
import './BeerListFilter.module.css';
import styles from './BeerListFilter.module.css';

type BeerListFilterProps = {
    setFilterBeerListByText: (value: string) => void;
    setFilterBeerListByType:(value: string | null) => void;

}
export default function BeerListFilter(props: BeerListFilterProps) {

    return (
        <div className={styles.beerListFilter}>
            <TextField id="outlined-basic" label="Filter by name" variant="outlined" onChange={(event: ChangeEvent<HTMLInputElement>) => {
                props.setFilterBeerListByText(event.target.value);
            }}/>

            <Autocomplete
                disablePortal
                id="combo-box-demo"
                onChange={(event: any, newValue: string | null) => {
                    props.setFilterBeerListByType(newValue)
                }}
                options={BEER_TYPES2}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Type" />}
            />
        </div>
    )
}