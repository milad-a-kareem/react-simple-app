import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { makeSelectCounter, makeSelectCurrentPage, makeSelectStores } from "./selector";
import Axios from "axios";
import { setStores, setCounter, incCurrentPage, decCurrentPage } from "./actions";
import { useHistory } from "react-router-dom";

import { StoresList } from './storesList'


const stateSelector = createSelector(makeSelectStores, (stores) => ({
  stores,
}));

const stateSelector2 = createSelector(makeSelectCounter, (counter) => ({
  counter,
}));
const stateSelector3 = createSelector(makeSelectCurrentPage, (currentPage) => ({
  currentPage,
}));

const actionDispatch = (dispatch) => ({
  setStore: (stores) => dispatch(setStores(stores)),
  setNewCounter: (counter) => dispatch(setCounter(counter)),
  incCurrentPage: (currentPage) => dispatch(incCurrentPage(currentPage)),
  decCurrentPage: (currentPage) => dispatch(decCurrentPage(currentPage)),
});

export function HomePage(props){
    const { stores } = useSelector(stateSelector);
    const { counter } = useSelector(stateSelector2);
    const { currentPage } = useSelector(stateSelector3);

    const { setStore, setNewCounter, incCurrentPage, decCurrentPage } = actionDispatch(useDispatch());
    const limit = 5

    let history = useHistory();

    const fetchStores = async () => {
        const response = await Axios.get(`http://localhost:4500/stores?limit=${limit}&start=${currentPage*limit}`).catch(
        (err) => {
            console.log("Err: ", err);
        }
        );

        setStore(response.data.data);
        setNewCounter(response.data.count);
    };

    useEffect(() => {
        fetchStores();
    }, []);

    useEffect(() => {
        fetchStores();
    }, [currentPage]);

    const pageHandler = async (type)=>{
        if (type == 'inc'){
            incCurrentPage(1)
        }
        else if (type == 'dec'){
            decCurrentPage(1)
        }
    }

    const newStoreClickHandler = () => {
      history.push("/add-store")
    }

    console.log("Stores:", stores,currentPage);

  return ( 
    <div className="container">
        <div className="home-header">
            <h1>Stores List</h1>
            <button onClick={newStoreClickHandler}>+ Add New Store</button>
        </div>
        <StoresList />
        <div className="h-page-controls">
            {(currentPage > 0 ) ? <h3 className="h-prev" onClick={()=> pageHandler('dec')}>Previous</h3> :  <h3 className="h-prev">Previous</h3>} 
            <h3>Page {currentPage+1}/{Math.round((counter/limit))}</h3>
            {(currentPage+1 < (Math.round((counter/limit))) ) ? <h3 className="h-next" onClick={()=> pageHandler('inc')}>Next</h3> :  <h3 className="h-next">Next</h3>}
        </div>
    </div>
    );
}