import {getBeerList, getBeerMetaData} from '../../api';
import {ApiParams, Beer, BeerListMetaData} from '../../types';
import handle from '../../utils/error';

const fetchBeerList = (setData: (data: Array<Beer>) => void, params: ApiParams) => {
  (async () => {
    try {
      const response = await getBeerList(params);
      setData(response.data);
    } catch (error) {
      handle(error);
    }
  })();
};

const fetchBeerListMetaDataData =  (setBeerListMetaData: (data: BeerListMetaData) => void) => {
    (async () => {
        try {
            const response = await  getBeerMetaData();
            setBeerListMetaData(response.data as BeerListMetaData);
        } catch (error) {
            handle(error);
        }
    })();
};

const getExistingFavBeers = () => {
    const existingBeers1 = localStorage.getItem("favBeers");
    if (existingBeers1 !== null) {
        return JSON.parse(existingBeers1) as Beer[];
    } else {
        return [] as Beer[];
    }
}

const clearBeerLocalStorage = () => {
    localStorage.removeItem('favBeers');
}



export { fetchBeerList, fetchBeerListMetaDataData, getExistingFavBeers,clearBeerLocalStorage};
