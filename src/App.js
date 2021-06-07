import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { HomePage } from './containers/HomePage'
import { CategoriesPage } from './containers/CategoriesPage';
import { AddStorePage } from './containers/AddStorePage';
import { AddCategoryPage } from './containers/AddCategoryPage';
import { ItemsPage } from './containers/ItemsPage';
import { AddItemPage } from './containers/AddItemPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/add-store" component={AddStorePage} />
          <Route exact path="/cats/:storeId" component={CategoriesPage} />
          <Route exact path="/cats/:storeId/add-category" component={AddCategoryPage} />
          <Route exact path="/items/:storeId/:catId" component={ItemsPage} />
          <Route exact path="/items/:storeId/:catId/add-item" component={AddItemPage} />
          <Route><h1>404 Not Found!</h1></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
