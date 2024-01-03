import { useEffect, useState } from "react";
import { ApiParams, Beer, BeerListMetaData, SORT } from "../../types";
import { fetchBeerListMetaDataData, fetchBeerList } from "./utils";
import {
  Avatar,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import SportsBar from "@mui/icons-material/SportsBar";
import { useNavigate } from "react-router-dom";
import BeerPagination from "../../components/Pagination/BeerPagination";
import BeerListFilter from "../../components/BeerListFilter/BeerListFilter";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useBeerLocalStorage } from "../../hooks/useBeerLocalStorage";
import styles from "./BeerList.module.css";

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [beerListMetaData, setBeerListMetaData] = useState<BeerListMetaData>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortType, setSortType] = useState<SORT>("asc");
  const [filterBeerListByText, setFilterBeerListByText] = useState<string>("");
  const [filterBeerListByType, setFilterBeerListByType] = useState<
    string | null
  >(null);
  const {
    addBeerInFavoriteList,
    removeBeerFromFavoriteList,
    isBeerAlreadyFavorite,
  } = useBeerLocalStorage();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchBeerListMetaDataData.bind(this, setBeerListMetaData), []);

  const isFilterOn = () => {
    return filterBeerListByText || filterBeerListByType;
  };

  const perPage = 10;
  const getParams = () => {
    return {
      sort: sortType,
      page: currentPage,
      per_page: isFilterOn() ? beerListMetaData?.total : 10,
      by_name: filterBeerListByText,
      by_type: filterBeerListByType?.toLowerCase(),
    } as ApiParams;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchBeerList.bind(this, setBeerList, getParams()), [
    currentPage,
    sortType,
    filterBeerListByText,
    filterBeerListByType,
  ]);

  const onBeerClick = (id: string) => navigate(`/beers/${id}`);

  const onPageChange = (value: number) => {
    if (currentPage === value) {
      return;
    }
    setCurrentPage(value);
  };

  const toggleSortType = () => {
    setSortType(sortType === "asc" ? "desc" : "asc");
    setCurrentPage(1);
  };

  const getTotalListCount = () => {
    return isFilterOn() ? beerList.length : beerListMetaData?.total || 0;
  };

  return (
    <article>
      <section>
        <header>
          <BeerListFilter
            toggleSortType={() => toggleSortType()}
            sortType={sortType}
            setFilterBeerListByText={(value: string) =>
              setFilterBeerListByText(value)
            }
            setFilterBeerListByType={(value: string | null) =>
              setFilterBeerListByType(value)
            }
          ></BeerListFilter>
          <h3>
            Total beers: {getTotalListCount()}{" "}
            {isFilterOn() ? "(Filtered)" : ""}
          </h3>
        </header>
        <main>
          <List>
            {beerList.map((beer, index) => (
              <ListItemButton key={beer.id}>
                <span>{index + 1}</span>
                <ListItemAvatar>
                  <Avatar>
                    <SportsBar />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={beer.name}
                  secondary={beer.brewery_type}
                  onClick={onBeerClick.bind(this, beer.id)}
                />
                {isBeerAlreadyFavorite(beer) ? (
                  <IconButton onClick={() => removeBeerFromFavoriteList(beer)}>
                    <FavoriteIcon></FavoriteIcon>
                  </IconButton>
                ) : (
                  <IconButton onClick={() => addBeerInFavoriteList(beer)}>
                    <FavoriteBorderIcon></FavoriteBorderIcon>
                  </IconButton>
                )}
              </ListItemButton>
            ))}
          </List>
          {getTotalListCount() && !isFilterOn() && (
            <div className={styles.pagination}>
              <BeerPagination
                total={getTotalListCount()}
                perPageCount={perPage}
                currentPage={currentPage}
                onPageChange={(value) => onPageChange(value)}
              ></BeerPagination>
            </div>
          )}
        </main>
      </section>
    </article>
  );
};

export default BeerList;
