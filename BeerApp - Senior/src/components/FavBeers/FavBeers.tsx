import styles from "../../views/Home/Home.module.css";
import {Button, Checkbox, Link, Paper} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {clearBeerLocalStorage, getExistingFavBeers} from "../../views/BeerList/utils";
import {useBeerLocalStorage} from "../../hooks/useBeerLocalStorage";

export default function FavBeers() {

    const {clearAllFavBeers} = useBeerLocalStorage();

    return<Paper>
        <div className={styles.listContainer}>
            <div className={styles.listHeader}>
                <h3>Favorite beers</h3>
                <Button variant='contained' size='small' onClick={() => {
                    clearAllFavBeers();
                }}>
                    Remove all items
                </Button>
            </div>
            <ul className={styles.list}>
                {getExistingFavBeers().map((beer, index) => <li key={index.toString()}>
                        <Checkbox />
                        <Link component={RouterLink} to={`/beers/${beer}`}>
                            {beer.name}
                        </Link>
                    </li>)}
                {!getExistingFavBeers().length && <p>No saved items</p>}
            </ul>
        </div>
    </Paper>
}