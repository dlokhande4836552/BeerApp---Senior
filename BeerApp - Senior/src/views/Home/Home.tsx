import { Beer } from "../../types";
import { Link as RouterLink } from "react-router-dom";
import { Button, Paper, Link } from "@mui/material";
import styles from "./Home.module.css";
import FavBeers from "../../components/FavBeers/FavBeers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRandomBeerList } from "../../api";
import CircularProgress from "@mui/material/CircularProgress";

const Home = () => {
  const { data: beerList = [], isLoading } = useQuery({
    queryKey: ["fetch-random-beers"],
    enabled: true,
    queryFn: () =>
      getRandomBeerList(10).then((response) => {
        return response.data as Beer[];
      }),
  });

  const queryClient = useQueryClient();

  const onReloadListClick = async () => {
    await queryClient.invalidateQueries({ queryKey: ["fetch-random-beers"] });
  };

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Random beers</h3>
                {/*<TextField label="Filter..." variant="outlined" />*/}
                <Button variant="contained" onClick={() => onReloadListClick()}>
                  Reload list
                </Button>
              </div>
              <ul className={styles.list}>
                {isLoading && <CircularProgress />}
                {beerList.map((beer, index) => (
                  <li key={index.toString()} className={styles.listItem}>
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
