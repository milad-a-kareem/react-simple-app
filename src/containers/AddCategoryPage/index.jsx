import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Axios from 'axios'
import '../AddStorePage/addStore.css'
import { HomeButton } from '../../components/homeButton/homeButton'
import { BackButton } from '../../components/backButton/backButton'

export function AddCategoryPage(){
    const { storeId } = useParams()
    const history =  useHistory()
    const alert = '* Please fill all fields of the form.'

    let form = new FormData()
    let name, file

    const saveCatToAPI = async () => {
        if(name && file){
            form.append("file", file)
            form.append("name", name)
            const res = await Axios.post(`http://localhost:4500/stores/${storeId}/categories/add`, form, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            }).catch((err) => console.log("Err: ", err))

            if(res) history.push('/cats/'+storeId)
        }

    }
    

    return (
        <div className='AddStorePage'>
            <div>
                <BackButton link={`/cats/${storeId}`}/>
                <HomeButton/>
            </div>
            <h1>Add New Category To The Store</h1>
            <h4>{alert}</h4>
            <div className='a-form'> 
                <div className='a-i-container'>
                    <label htmlFor="name">Category Name: </label>
                    <input type="text" id="name" name="name" onChange={(event) => name = event.target.value} required/>
                </div>

                <div className='a-i-container'>
                    <label htmlFor="file">Category Image: </label>
                    <input accept="image/png, image/jpeg, image/webp" type="file" id="file" name="file" onChange={(event) => file = event.target.files[0]} required/>
                </div>

            </div> 
            <button onClick={saveCatToAPI}>Add Category</button>
        </div>
            )
}