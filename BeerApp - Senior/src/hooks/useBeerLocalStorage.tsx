import { useState } from "react";
import { Beer } from "../types";
import { LOCAL_STORAGE_KEY_FAV_BEER } from "../const/BeerConstants";

export function useBeerLocalStorage() {
  const getExistingFavBeers = () => {
    const existingBeers = localStorage.getItem(LOCAL_STORAGE_KEY_FAV_BEER);
    if (existingBeers !== null) {
      return JSON.parse(existingBeers) as Beer[];
    } else {
      return [] as Beer[];
    }
  };

  const [existingBeers, setExistingBeers] = useState(() => {
    return getExistingFavBeers();
  });

  const addBeerInFavoriteList = (beer: Beer) => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY_FAV_BEER,
      JSON.stringify([...existingBeers, beer]),
    );
    setExistingBeers([...existingBeers, beer]);
  };

  const removeBeerFromFavoriteList = (beer: Beer) => {
    if (existingBeers.length === 0) {
      console.error("No valid list stored");
    }
    const newBeerList = existingBeers.filter(
      (existingBeer) => existingBeer.id !== beer.id,
    );
    localStorage.setItem(
      LOCAL_STORAGE_KEY_FAV_BEER,
      JSON.stringify(newBeerList),
    );
    setExistingBeers(newBeerList);
  };

  const isBeerAlreadyFavorite = (beer: Beer): boolean => {
    return !!existingBeers.find((existingBeer) => existingBeer.id === beer.id);
  };

  const clearAllFavBeers = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY_FAV_BEER, JSON.stringify([]));
    setExistingBeers([]);
  };

  return {
    addBeerInFavoriteList,
    removeBeerFromFavoriteList,
    isBeerAlreadyFavorite,
    clearAllFavBeers,
    getExistingFavBeers,
  };
}
