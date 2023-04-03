import React, { useState , useContext } from 'react'
import axios from 'axios'
import { AuthContext } from "../../context/authContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduits = () => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [categories, setCategories] = useState('')
  const [desc, setDesc] = useState('')
  const [photoProduit, setPhotoProduit] = useState(null)
  const [taille, setTaille] = useState('')
  const [marque, setMarque] = useState('')
  const { currentUser } = useContext(AuthContext);

  const handleSubmit = async event => {
    event.preventDefault()

    try {

      if(title==="" || price==="" || price===0 || categories==="" || desc==="" || photoProduit==="" || taille==="" || marque===""){
        toast.error('Choix obligatoire')
      }
      const formData = new FormData()
      formData.append('title', title)
      formData.append('price', price)
      formData.append('categories', categories)
      formData.append('desc', desc)
      formData.append('photoProduit', photoProduit)
      formData.append('taille', taille)
      formData.append('marque', marque)

      await axios.post(`http://localhost:4000/api/produits/addproduct/${currentUser.user._id}`, formData)
      

     
      setTitle('')
      setPrice(0)
      setCategories('')
      setDesc('')
      setPhotoProduit(null)
      setTaille('')
      setMarque('')

      
      toast.success('Produit Publier')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='containerAddProduit'>
      <div className='pub'>
        <img src="https://i.pinimg.com/564x/dc/ae/66/dcae66764a7bd4d470bd2446f062b1ff.jpg" alt=""/>
        <p className='desc'> Si vous êtes un vendeur, vous pouvez créer votre propre boutique en ligne, ajouter des produits à vendre, gérer vos commandes et vos expéditions. Nous offrons également des fonctionnalités pour promouvoir vos produits, telles que la publicité ciblée et la mise en avant de vos offres.</p>
      </div>
    <div className='formProduit'>
<ToastContainer
  position="top-center"
  reverseOrder={false}
/>  

  
      <h1>Ajouter Produit pour vente</h1>
      <div className='ajouter_produit'>
        <form onSubmit={handleSubmit}>
          titre <input type="text" value={title} onChange={event => setTitle(event.target.value)} placeholder="ex : capuche etc" />
          prix <input type="number" value={price} onChange={event => setPrice(event.target.value)} placeholder="ex : 90 etc"/>
          <p>select categorie</p>
          <select value={categories} onChange={event => setCategories(event.target.value)}>
            <option value="sans categories" >Sans categorie</option>
            <option value="femmes">Femmes</option>
            <option value="hommes">Hommes</option>
            <option value="enfants">Enfants</option>
            <option value="animaux">Animaux</option>
            <option value="electroniques">Electroniques</option>
            <option value="maison">Maison</option>
          </select><br />
          description <input type="text" value={desc} onChange={event => setDesc(event.target.value)} placeholder="ex : capuche rouge taille .. etc" />
          photo de produit <input type="file" onChange={event => setPhotoProduit(event.target.files[0])} />
          taille <input type="text" value={taille} onChange={event => setTaille(event.target.value)} placeholder="ex : s ,m ,xl.."/>
          marque <input type="text" value={marque} onChange={event => setMarque(event.target.value)} placeholder="ex : gucci , lc etc" />
          <input type="submit" value="Ajouter Produit" className='BtnForm' />
        </form>
      </div>
    </div>
    </div>
  )
}

export default AddProduits