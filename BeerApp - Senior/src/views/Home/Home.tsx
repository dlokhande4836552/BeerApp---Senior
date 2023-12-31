import { Beer } from "../../types";
import { Link as RouterLink } from "react-router-dom";
import { Button, Checkbox, Paper, TextField, Link } from "@mui/material";
import styles from "./Home.module.css";
import FavBeers from "../../components/FavBeers/FavBeers";
import { useQuery } from "@tanstack/react-query";
import { getRandomBeerList } from "../../api";
import CircularProgress from "@mui/material/CircularProgress";
import handle from "../../utils/error";

const Home = () => {
  const { data: beerList = [], isLoading } = useQuery({
    queryKey: ["fetch-random-beers"],
    enabled: true,
    queryFn: () =>
      getRandomBeerList(10).then((response) => {
        return response.data as Beer[];
      }),
  });

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
                {isLoading && <CircularProgress />}
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
