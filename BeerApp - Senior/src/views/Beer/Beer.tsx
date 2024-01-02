import { useEffect, useState } from "react";
import { Beer as IBeer } from "../../types";
import { fetchData } from "./utils";
import { useParams } from "react-router-dom";
import styles from "./Beer.module.css";
import { Avatar, ListItemAvatar } from "@mui/material";
import SportsBar from "@mui/icons-material/SportsBar";
const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();

  useEffect(fetchData.bind(this, setBeer, id), [id]);

  return (
    <article>
      {beer ? (
        <div className={styles.beerInfo}>
          <div className={styles.title}>{beer.name}</div>
          <div className={styles.type}>{beer.brewery_type}</div>
          <div className={styles.beerDetails}>
            <div className={styles.image}>
              <ListItemAvatar>
                <Avatar>
                  <SportsBar />
                </Avatar>
              </ListItemAvatar>
            </div>
            <div className={styles.distilleryInfo}>
              <h1>Distillery address</h1>
              <div>
                {beer.address_1 ? beer.address_1 : ""}{" "}
                {beer.address_2 ? beer.address_2 : ""}{" "}
                {beer.address_3 ? beer.address_3 : ""}
              </div>
              <div>
                {" "}
                {beer.city ? beer.city : ""} {beer.country ? beer.country : ""}
              </div>
              <div>
                {" "}
                {beer.postal_code ? `Postal code:${beer.postal_code}` : ""}
              </div>
              <div> {beer.phone ? `Contact no. ${beer.phone}` : ""}</div>
              <div>
                {" "}
                {beer.website_url && (
                  <a target="_blank" href={beer.website_url}>
                    {beer.website_url}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /*        <main>
            <span>
              <b>Type: </b> {beer.brewery_type}
            </span>
          </main>
          <main>
            <span>
              <b>Distillery address: </b> {beer.address_1}, {beer.country},{" "}
              {beer.postal_code}
            </span>
          </main>
          <main>
            <span>
              <b>Contact no: </b> {beer.phone}
            </span>
          </main>
          <main>
            <span>
              {beer.website_url && (
                <>
                  <b>Company website: </b>{" "}
                  <a target="_blank" href={beer.website_url}>
                    {beer.website_url}
                  </a>
                </>
              )}
            </span>
          </main>
        </section>*/
        <section>
          <header>
            <h1>No matching beer found</h1>
          </header>
        </section>
      )}
    </article>
  );
};

export default Beer;
