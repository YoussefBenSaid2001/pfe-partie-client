import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import "./container.css"
import React,{useContext , useState} from 'react';
import { AuthContext } from '../../context/authContext';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import axios from "axios"
import Form from 'react-bootstrap/Form';

function Container() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [registerForm,setRegisterForm] = useState(false);
  const [msg , setMsg] = useState("vous n'avais pas de compte ?");
  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");


  const { login } = useContext(AuthContext);
  const [logged , isLogged] = useState(true);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleClick = () =>{
    navigate("/AddProduits");
  }
  
  const handleClickV2 = () =>{
    isLogged(false)
  }
  const handleLogin = async (event)=>{
    event.preventDefault();
    window.location.reload(false);
    await login(email,password);
   }
 
 
  function FormRegister(){
    if(registerForm===false){
      setRegisterForm(true);
      setMsg("j'ai un compte")
    }
    else{
      setRegisterForm(false);
      setMsg("vous n'avais pas de compte ?")

    }
  }




  const register = async()=>{
 await axios.post("http://localhost:4000/api/users/register", {
      name,
      email,
      password
      }, {
        headers: {'Content-Type': 'application/json'}
      }).then(function(response) {
        console.log(response);
      }).catch(function(error) {
        console.log(error);
      })

}

  return (
    <>
    {
      logged && (
        <>
         <Modal show={show} onHide={handleClose}>
        
        <h2 closeButton>login</h2><hr />
        
        
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e)=> setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  name="password" onChange={(e)=> setPassword(e.target.value)}/>
      </Form.Group>
      <button  className="btnForm" onClick={handleLogin}>s'authentifier</button>
  <br />
      
      <p onClick={FormRegister}>{msg}</p>
       
      
    </Form>

{

registerForm && 
<Form>
  <h2>s'inscrire ici</h2><hr/>
  <Form.Group className='mb-3' controlId='formBasicFile'>
      <Form.Label>Ajouter votre photo</Form.Label>
      <Form.Control type='file'></Form.Control> 

     </Form.Group>
  <Form.Group className='mb-3' controlId='formBasicName'>
      <Form.Label>Ajouter votre nom et prenom</Form.Label>
      <Form.Control type='text' placeholder='entrer votre nom et prenom' name="name" onChange={(e)=> setName(e.target.value)}></Form.Control> 

     </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Ajouter votre adresse</Form.Label>
        <Form.Control type="email" placeholder="Entrer votre email" name="email"  onChange={(e)=> setEmail(e.target.value)} />
      </Form.Group>
      
     <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Ajouter votre mot de passe</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" onChange={(e)=> setPassword(e.target.value)}/>
      </Form.Group>
      <input  type="button" className="btnForm" onClick={register}  value="register"/>
      <br />
    </Form>
    
}

        </Modal.Body>
      </Modal>
        </>
      )
    }
    <Carousel className='containerSet'>
      <Carousel.Item>
        <img style={{"height":"700px"}}
          className="d-block w-100"
          src="https://img.freepik.com/photos-gratuite/coup-moyen-personnes-regardant-vetements-dans-friperie_23-2150082910.jpg?w=2000"
          alt="First slide"
        />
          </Carousel.Item>
      <Carousel.Item>
        <img style={{"height":"700px"}}
          className="d-block w-100"
          src="https://cdn.shopify.com/s/files/1/0038/5807/1622/files/vintage-shopping_600x600@2x.jpg?v=1614303612"
          alt="Second slide"
        />
  </Carousel.Item>
      <Carousel.Item>
        <img style={{"height":"700px"}}
          className="d-block w-100"
          src="https://www.10wallpaper.com/wallpaper/3840x2160/1804/Hanger_clothing_fashion_market_4K_HD_3840x2160.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
     
    </Carousel>
     <div className='Vente'>
     <h3><span> Si Vouz avez un produit</span><br /><span>plus vous puvez le</span> <br /> <span>vende avec gachar</span> </h3>
     <span className='btnVente' onClick={currentUser ? handleClick : handleClickV2}>Cluiquer ici pour vente</span>
   </div>
   
   </>
  );
}

export default Container;