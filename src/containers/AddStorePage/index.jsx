import React from 'react'
import { useHistory } from "react-router-dom";
import Axios from "axios";
import './addStore.css'
import { HomeButton } from '../../components/homeButton/homeButton';

export function AddStorePage(props){
    const history =  useHistory()

    const alert = '* Please fill all fields of the form.'

    const saveStoreToAPI = async () => {
        if(name && file && address){
            form.append("file", file)
            form.append("name", name)
            form.append("address", address)
            const res = await Axios.post('http://localhost:4500/stores/add', form, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            }).catch((err) => console.log("Err: ", err))

            if(res) history.push('/')
        }

    }
    let form = new FormData()
    let name, address, file

    return (
        <div className='AddStorePage'>
            <HomeButton/>
            <h1>Add New Store</h1>
            <h4>{alert}</h4>
            <div className='a-form'> 
                <div className='a-i-container'>
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" name="name" onChange={(event) => name = event.target.value} required/>
                </div>

                <div className='a-i-container'>
                    <label htmlFor="address">Address: </label>
                    <input type="text" id="address" name="address" onChange={(event) => address = event.target.value} required/>
                </div>

                <div className='a-i-container'>
                    <label htmlFor="file">Logo: </label>
                    <input accept="image/png, image/jpeg, image/webp" type="file" id="file" name="file" onChange={(event) => file = event.target.files[0]} required/>
                </div>

            </div> 
            <button onClick={saveStoreToAPI}>Add Store</button>
        </div>
            )
}