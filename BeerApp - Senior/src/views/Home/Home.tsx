import { useEffect, useState } from "react";
import { fetchData } from "./utils";
import { Beer } from "../../types";
import { Link as RouterLink } from "react-router-dom";
import { Button, Checkbox, Paper, TextField, Link } from "@mui/material";
import styles from "./Home.module.css";
import FavBeers from "../../components/FavBeers/FavBeers";

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [savedList, setSavedList] = useState<Array<Beer>>([]);

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList), []);

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <TextField label="Filter..." variant="outlined" />
                <Button variant="contained">Reload list</Button>
              </div>
              <ul className={styles.list}>
                {beerList.map((beer, index) => (
                  <li key={index.toString()}>
                    <Checkbox />
                    <Link component={RouterLink} to={`/beers/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Paper>
          <FavBeers></FavBeers>
        </main>
      </section>
    </article>
  );
};

export default Home;
