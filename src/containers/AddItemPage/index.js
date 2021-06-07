import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Axios from 'axios'
import '../AddStorePage/addStore.css'
import { HomeButton } from '../../components/homeButton/homeButton'
import { BackButton } from '../../components/backButton/backButton'

export function AddItemPage(){
    const { storeId, catId } = useParams()
    const history =  useHistory()
    const alert = '* Please fill all fields of the form.'

    let form = new FormData()
    let name, file, price, color

    const saveItemToAPI = async () => {
        if(name && file && color && price){
            form.append("file", file)
            form.append("name", name)
            form.append("price", price)
            form.append("color", color)
            const res = await Axios.post(`http://localhost:4500/stores/${storeId}/${catId}/items/add`, form, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            }).catch((err) => console.log("Err: ", err))

            if(res) history.push('/items/'+storeId+"/"+catId)
        }

    }
    

    return (
        <div className='AddStorePage'>
            <div>
                <BackButton link={`/items/${storeId}/${catId}`}/>
                <HomeButton/>
            </div>
            <h1>Add New Category To The Store</h1>
            <h4>{alert}</h4>
            <div className='a-form'> 
                <div className='a-i-container'>
                    <label htmlFor="name">Item Name: </label>
                    <input type="text" id="name" name="name" onChange={(event) => name = event.target.value} required/>
                </div>
                <div className='a-i-container'>
                    <label htmlFor="price">Item Price: </label>
                    <input type="number" id="price" name="price" onChange={(event) => price = event.target.value} required/>
                </div>
                <div className='a-i-container'>
                    <label htmlFor="color">Item Color: </label>
                    <input type="text" id="color" name="color" onChange={(event) => color = event.target.value} required/>
                </div>

                <div className='a-i-container'>
                    <label htmlFor="file">Item Image: </label>
                    <input accept="image/png, image/jpeg, image/webp" type="file" id="file" name="file" onChange={(event) => file = event.target.files[0]} required/>
                </div>

            </div> 
            <button onClick={saveItemToAPI}>Add Item</button>
        </div>
            )
}