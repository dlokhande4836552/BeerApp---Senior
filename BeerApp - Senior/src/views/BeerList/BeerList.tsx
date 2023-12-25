import { useEffect, useState } from 'react';
import {Beer, BeerListMetaData, SORT} from '../../types';
import {fetchBeerListMetaDataData, fetchBeerList} from './utils';
import {Avatar, Input, List, ListItemAvatar, ListItemButton, ListItemText, TextField} from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import { useNavigate } from 'react-router-dom';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import BeerPagination from "../../components/Pagination/BeerPagination";

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [beerListMetaData, setBeerListMetaData] = useState<BeerListMetaData>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortType, setSortType] = useState<SORT>('asc');
  const [totalBeerCount, setTotalBeerCount] = useState<number | undefined>(beerListMetaData?.total);

  useEffect(fetchBeerListMetaDataData.bind(this, setBeerListMetaData,setTotalBeerCount), []);

  useEffect(fetchBeerList.bind(this, setBeerList, {sort: sortType, page: currentPage}), [currentPage, sortType]);

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

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
          {/*<TextField id="outlined-basic" label="Filter by name or id" variant="outlined" value={filterBeerListByText} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterBeerListByText(event.target.value);
          }}/>*/}
          Total beers: {totalBeerCount}
          {totalBeerCount &&
            <BeerPagination total={totalBeerCount} perPageCount={50} currentPage={currentPage} onPageChange={(value) => onPageChange(value)}></BeerPagination>
          }
          <div onClick={toggleSortType}>
            <SortByAlphaIcon color={sortType === 'asc' ? 'primary' : 'secondary'}></SortByAlphaIcon>
          </div>
        </header>
        <main>
          <List >
            {beerList.map((beer) => (
              <ListItemButton key={beer.id} onClick={onBeerClick.bind(this, beer.id)}>
                <ListItemAvatar>
                  <Avatar>
                    <SportsBar />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={beer.name} secondary={beer.brewery_type} />
              </ListItemButton>
            ))}
          </List>
        </main>
      </section>
    </article>
  );
};

export default BeerList;
