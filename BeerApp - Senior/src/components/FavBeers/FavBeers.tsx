import styles from "../../views/Home/Home.module.css";
import {Button, IconButton, Link, Paper} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {useBeerLocalStorage} from "../../hooks/useBeerLocalStorage";
import DeleteIcon from '@mui/icons-material/Delete';

export default function FavBeers() {

    const {clearAllFavBeers, getExistingFavBeers, removeBeerFromFavoriteList} = useBeerLocalStorage();

    return<Paper>
        <div className={styles.listContainer}>
            <div className={styles.listHeader}>
                <h3>Favorite beers</h3>
                <Button disabled={getExistingFavBeers().length === 0} variant='contained' size='small' onClick={() => {
                    clearAllFavBeers();
                }}>
                    Remove all items
                </Button>
            </div>
            <ul className={styles.list}>
                {getExistingFavBeers().map((beer, index) => <li key={index.toString()}>
                        <Link component={RouterLink} to={`/beers/${beer}`}>
                            {beer.name}
                        </Link>
                    <IconButton onClick={() => removeBeerFromFavoriteList(beer)}><DeleteIcon></DeleteIcon></IconButton>
                    </li>)}
                {!getExistingFavBeers().length && <p>No saved items</p>}
            </ul>
        </div>
    </Paper>
}