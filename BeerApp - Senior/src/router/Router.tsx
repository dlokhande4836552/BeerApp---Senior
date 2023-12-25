import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Offline from '../views/Offline/Offline';
import Home from '../views/Home/Home';
import NotFound from '../views/PageNotFound/PageNotFound';
import BeerList from '../views/BeerList/BeerList';
import Beer from '../views/Beer/Beer';
import Footer from '../components/Footer';
import Menu from '../components/Menu';

const Router = () => (
  <BrowserRouter>
    <Menu>
      <Offline />
      <Routes>
        <Route index element={<Home />} />
        <Route path='beers'>
          <Route index element={<BeerList />} />
          <Route path=':id' element={<Beer />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Menu>
  </BrowserRouter>
);

export default Router;
