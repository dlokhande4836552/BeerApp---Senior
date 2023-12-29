import {useEffect, useState} from 'react';
import {ApiParams, Beer, BeerListMetaData, SORT} from '../../types';
import {
  fetchBeerListMetaDataData,
  fetchBeerList
} from './utils';
import {Avatar, IconButton, List, ListItemAvatar, ListItemButton, ListItemText} from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import { useNavigate } from 'react-router-dom';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import BeerPagination from "../../components/Pagination/BeerPagination";
import BeerListFilter from "../../components/BeerListFilter/BeerListFilter";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useBeerLocalStorage} from "../../hooks/useBeerLocalStorage";

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [beerListMetaData, setBeerListMetaData] = useState<BeerListMetaData>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortType, setSortType] = useState<SORT>('asc');
  const [filterBeerListByText, setFilterBeerListByText] = useState<string>('');
  const [filterBeerListByType, setFilterBeerListByType] = useState<string | null>(null);
  const {addBeerInFavoriteList, removeBeerFromFavoriteList, isBeerAlreadyFavorite} = useBeerLocalStorage();


  useEffect(fetchBeerListMetaDataData.bind(this, setBeerListMetaData), []);


  const isFilterOn = () => {
    return filterBeerListByText || filterBeerListByType;
  }

  const perPage = 10;
  const getParams = () => {
    return {
      sort: sortType,
      page: currentPage,
      per_page: isFilterOn() ? beerListMetaData?.total : 10,
      by_name: filterBeerListByText,
      by_type: filterBeerListByType?.toLowerCase()
    } as ApiParams;
  };

  useEffect(fetchBeerList.bind(this, setBeerList, getParams()), [currentPage, sortType, filterBeerListByText, filterBeerListByType]);

  const onBeerClick = (id: string) => navigate(`/beers/${id}`);

  const onPageChange = (value: number) => {
    if (currentPage === value) {
      return;
    }
    setCurrentPage(value);
  }

  const toggleSortType = () => {
    setSortType(sortType === 'asc' ? 'desc' : 'asc');
    setCurrentPage(1);
  }

  const getTotalListCount = () => {
    return isFilterOn() ? beerList.length : (beerListMetaData?.total || 0);
  }

  return (
    <article>
      <section>
        <header>
          <h1>Browse beers</h1>
          <BeerListFilter setFilterBeerListByText={(value: string) => setFilterBeerListByText(value)} setFilterBeerListByType={(value: string | null) => setFilterBeerListByType(value)}></BeerListFilter>
          Total beers: {getTotalListCount()} {isFilterOn() ? '(Filtered)' : ''}

          <div onClick={toggleSortType}>
            <SortByAlphaIcon color={sortType === 'asc' ? 'primary' : 'secondary'}></SortByAlphaIcon>
          </div>
        </header>
        <main>
          <List >
            {beerList.map((beer) => (
              <ListItemButton key={beer.id} >
                <ListItemAvatar>
                  <Avatar>
                    <SportsBar />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={beer.name} secondary={beer.brewery_type} onClick={onBeerClick.bind(this, beer.id)}/>
                {
                    isBeerAlreadyFavorite(beer) !== undefined ? <IconButton onClick={() => removeBeerFromFavoriteList(beer)}><FavoriteIcon></FavoriteIcon></IconButton> :
                        <IconButton onClick={() => addBeerInFavoriteList(beer)}><FavoriteBorderIcon></FavoriteBorderIcon></IconButton>
                }

              </ListItemButton>
            ))}
          </List>
          {getTotalListCount() &&
              <BeerPagination total={getTotalListCount()} perPageCount={perPage} currentPage={currentPage} onPageChange={(value) => onPageChange(value)}></BeerPagination>
          }
        </main>
      </section>
    </article>
  );
};

export default BeerList;
