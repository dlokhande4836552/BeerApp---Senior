import {getBeerList, getBeerMetaData} from '../../api';
import {ApiParams, Beer, BeerListMetaData, SORT} from '../../types';
import handle from '../../utils/error';

const fetchBeerList = (setData: (data: Array<Beer>) => void, params: ApiParams) => {
  (async () => {
    try {
      const response = await getBeerList({page: params.page, sort: params.sort});
      setData(response.data);
    } catch (error) {
      handle(error);
    }
  })();
};

const fetchBeerListMetaDataData =  (setBeerListMetaData: (data: BeerListMetaData) => void, setTotalBeerCount: (value: number) => void) => {
    (async () => {
        try {
            const response = await  getBeerMetaData();
            setBeerListMetaData(response.data as BeerListMetaData);
            setTotalBeerCount((response.data as BeerListMetaData).total);
        } catch (error) {
            handle(error);
        }
    })();
};
export { fetchBeerList, fetchBeerListMetaDataData };
