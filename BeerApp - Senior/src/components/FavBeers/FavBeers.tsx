import styles from "./FavBeers.module.css";
import {Button, IconButton, Link, Paper} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {useBeerLocalStorage} from "../../hooks/useBeerLocalStorage";
import DeleteIcon from '@mui/icons-material/Delete';

export default function FavBeers() {

    const {clearAllFavBeers, getExistingFavBeers, removeBeerFromFavoriteList} = useBeerLocalStorage();

    return<Paper>
        <div className={styles.favBeers}>
            <div className={styles.favBeerHeader}>
                <h3>Favorite beers</h3>
                <Button disabled={getExistingFavBeers().length === 0} variant='contained' onClick={() => {
                    clearAllFavBeers();
                }}>
                    Remove all
                </Button>
            </div>
            <ul>
                {getExistingFavBeers().map((beer, index) => <li key={index.toString()} className={styles.favBeerItem}>
                    <IconButton onClick={() => removeBeerFromFavoriteList(beer)}><DeleteIcon></DeleteIcon></IconButton>
                        <Link component={RouterLink} to={`/beers/${beer}`} className={styles.beerName}>
                            {beer.name}
                        </Link>
                    </li>)}
                {!getExistingFavBeers().length && <p>No saved items</p>}
            </ul>
        </div>
    </Paper>
}