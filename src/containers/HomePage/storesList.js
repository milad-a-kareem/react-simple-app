import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSelector } from "reselect";
import { makeSelectStores } from "./selector";
import './home.css'


const stateSelector = createSelector(makeSelectStores, (stores) => ({
  stores,
}));

export function StoresList(props) {
  const { stores } = useSelector(stateSelector);

  const isEmptyStores = !stores || (stores && stores.length === 0);

  const history = useHistory();

  const goToUserPage = (id) => {
    history.push(`/cats/${id}`);
  };

  if (isEmptyStores) return null;

  return (
    <div>
        
        <table>
            <thead>
                <tr>
                    <th width="5%">ID</th>
                    <th>Logo</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Action</th>
                </tr>

            </thead>
            <tbody>

                {stores.map((store, idx) => (
                    <tr key={idx} >
                        <td>{store.ID}</td>
                        <td><img src={store.logo +"?width=77&height=77"} alt={store.name} width="77" height="77"/></td>
                        <td>{store.name}</td>
                        <td>{store.address}</td>
                        <td><button onClick={() => goToUserPage(store.ID)}>Open Store</button></td>
                    </tr>
                ))}
            </tbody>
      </table>
    </div>
  );
}