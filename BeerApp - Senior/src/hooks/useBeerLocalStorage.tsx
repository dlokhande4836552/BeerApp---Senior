
import { useState} from "react";
import {Beer} from "../types";
import {getExistingFavBeers} from "../views/BeerList/utils";

export function useBeerLocalStorage () {


    const [existingBeers, setExistingBeers] = useState(() => {
        return getExistingFavBeers()
    });

    const addBeerInFavoriteList = (beer: Beer) => {
        localStorage.setItem("favBeers", JSON.stringify([...existingBeers, beer]));
        setExistingBeers([...existingBeers, beer]);
    }

    const removeBeerFromFavoriteList = (beer: Beer) => {
        if (existingBeers.length === 0) {
            console.error('No valid list stored');
        }
        const newBeerList = existingBeers.filter(existingBeer => existingBeer.id !== beer.id);
        localStorage.setItem("favBeers", JSON.stringify(newBeerList));
        setExistingBeers(newBeerList);
    }

    const isBeerAlreadyFavorite = (beer: Beer): Beer | undefined => {
        return existingBeers.find(existingBeer => existingBeer.id === beer.id);
    }

    const clearAllFavBeers = () => {
        localStorage.setItem("favBeers", JSON.stringify([]));
        setExistingBeers([]);
    }


    return {addBeerInFavoriteList,  removeBeerFromFavoriteList, isBeerAlreadyFavorite, clearAllFavBeers};
}