import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { makeSelectCategories } from "./selector";
import Axios from "axios";
import { setCategories } from "./actions";

import './cat.css'
import '../HomePage/home.css'
import { HomeButton } from "../../components/homeButton/homeButton";

const stateSelector = createSelector(makeSelectCategories, (cats) => ({
  cats,
}));

const actionDispatch = (dispatch) => ({
  setCategories: (cats) => dispatch(setCategories(cats)),
});

export function CategoriesPage(props){
    const { cats } = useSelector(stateSelector);
    const { setCategories } = actionDispatch(useDispatch());

    const { storeId } = useParams();
    const history = useHistory();

    const fetchCat = async (id) => {
        const response = await Axios.get(`http://localhost:4500/stores/${id}/categories`).catch(
        (err) => {
            console.log("Err: ", err);
        }
        );

        console.log("Categories: ", response.data.data);

        if (response) setCategories(response.data.data);
    };

    useEffect(() => {
        if (storeId && storeId !== "") fetchCat(storeId);
    }, [storeId]);

    if (!cats) return <div>Loading...</div>;

  return ( 
    <div className='CategoriesPage'>
        <div className="home-header">
            <div className='left-header'>
                <HomeButton/>
                <h1>Categories</h1>
            </div>
            <button onClick={()=> history.push(`/cats/${storeId}/add-category`)}>+ Add New Category</button>
        </div>
        <div className="cat-container">
            {
                cats.map((cat,idx)=>
                (
                    <div key={cat.ID} className="cat-card" onClick={()=> history.push(`/items/${storeId}/${cat.ID}`)}>
                        <img src={cat.category_image_url + "?width=55&height=55"} alt={cat.category_name} width="55" height="55"/>
                        <h3>{cat.category_name}</h3>

                    </div>
                )
                )
            }
        </div>
        
        
    </div>
    );
}