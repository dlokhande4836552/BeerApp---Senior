import { getBeerList, getBeerMetaData } from "../../api";
import { ApiParams, Beer, BeerListMetaData } from "../../types";
import handle from "../../utils/error";

const fetchBeerList = (
  setData: (data: Array<Beer>) => void,
  params: ApiParams,
) => {
  (async () => {
    try {
      const response = await getBeerList(params);
      setData(response.data);
    } catch (error) {
      handle(error);
    }
  })();
};

const fetchBeerListMetaDataData = (
  setBeerListMetaData: (data: BeerListMetaData) => void,
) => {
  (async () => {
    try {
      const response = await getBeerMetaData();
      setBeerListMetaData(response.data as BeerListMetaData);
    } catch (error) {
      handle(error);
    }
  })();
};

export { fetchBeerList, fetchBeerListMetaDataData };
