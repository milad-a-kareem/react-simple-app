import React, { useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import Axios from 'axios'
import { makeSelectItems } from './selector';
import { setItems } from './actions';
import './items.css'
import '../CategoriesPage/cat.css'
import { HomeButton } from "../../components/homeButton/homeButton";
import { BackButton } from "../../components/backButton/backButton";


const stateSelector = createSelector(makeSelectItems, (items) => ({items,}));
const actionDispatch = (dispatch) => ({setItems: (items) => dispatch(setItems(items))});

export function ItemsPage(){
    const { storeId, catId } = useParams();
    const history = useHistory();
    const { setItems } = actionDispatch(useDispatch())
    const { items } = useSelector(stateSelector)

    const fetchItems = async () => {
        const response = await Axios.get(`http://localhost:4500/stores/${storeId}/${catId}/items`).catch(
        (err) => console.log("Err: ", err)
        );

        setItems(response.data.data);
    }

    useEffect(() => {
        fetchItems();
    }, [])

    console.log(items)

    return (
        <div className='CategoriesPage'>
            <div className="home-header">
                <div className='left-header'>
                    <BackButton link={`/cats/${storeId}`}/>
                    <HomeButton/>
                    <h1>Items</h1>
                </div>
                <button onClick={()=> history.push(`/items/${storeId}/${catId}/add-item`)}>+ Add New Item</button>
            </div>

            <div className="cat-container">
            {
                items.map((cat,idx)=>
                (
                    <div key={cat.ID} className="cat-card" >
                        <img src={cat.image_url + "?width=77&height=77"} alt={cat.category_name} width="77" height="77"/>
                        <h3>{cat.name}</h3>
                        <h3>${cat.price}</h3>
                        <h4>{cat.color}</h4>

                    </div>
                )
                )
            }
        </div>
        </div>
    )
}