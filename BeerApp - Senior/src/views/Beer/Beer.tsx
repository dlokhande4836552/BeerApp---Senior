import { useEffect, useState } from 'react';
import { Beer as IBeer } from '../../types';
import { fetchData } from './utils';
import { useParams } from 'react-router-dom';

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);

  return (
    <article>
      <section>
        <header>
          <h1>{beer?.name}</h1>
        </header>
        <main>
          <span>
            <b>Type: </b> {beer?.brewery_type}
          </span>
        </main>
        <main>
          <span>
            <b>Distillery address: </b> {beer?.address_1}, {beer?.country}, {beer?.postal_code}
          </span>
        </main>
        <main>
          <span>
            <b>Contact no: </b> {beer?.phone}
          </span>
        </main>
        <main>
          <span>
            {
              beer?.website_url &&  <><b>Company website: </b> <a target='_blank' href={beer?.website_url}>{beer?.website_url}</a></>
          }
          </span>
        </main>
      </section>
    </article>
  );
};

export default Beer;
