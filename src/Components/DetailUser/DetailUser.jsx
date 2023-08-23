import style from "./DetailUser.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../../context/authContext";
import StarRating from "../StarRating/StarRating"

import { useParams,  } from "react-router-dom";
import { useState, useEffect } from "react";
import { getOrderById, editPutUser, getUserById, postCalificar, star} from "../../Redux/Actions";


const DetailUser = () => {




  const stars = useSelector((state) => state.star);
console.log("2222222222222222", stars)

  const { id } = useParams();
  const { user } = useAuth();

  

 

  const [calificar, setcalificar] = useState({
    productId:"",
    nickname: "",
    num: stars,
    comment: ""
    
  })
  
console.log("/////////////////////////////////",calificar )
  //  useEffect(()=>{ 
  //   setcalificar(calificar)
  //  },[stars])




  const dispatch = useDispatch();
  const allOrderByID = useSelector((state) => state.orderById);
  const allUsuariosByID = useSelector((state) => state.allUsers);
  const [input, setInput] = useState({
    name: "",
    phone: "",
    id: id,
  });
  useEffect(() => {
    dispatch(getOrderById(id));
    dispatch(getUserById(id));
    setInput({
      name: allUsuariosByID.name,
      phone: allUsuariosByID.phone,
      id: id,
    });
  }, [dispatch, id]);

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(editPutUser(input));
    console.log(allOrderByID.products)
   
 };
 const handleSubmitCalificar = (event) => {
  if(!stars){
    alert("Debes Calificar  las estrellitas")
    return
  }else

  setTimeout(()=>{
    dispatch(postCalificar(calificar))
  }, 3000)


 
};

const onChangeCalificar= (eve)=>{
  eve.preventDefault()
  setcalificar({
     ...calificar, 
    [eve.target.name]: eve.target.value,
  });
}

  return (
    <div className={style.container}>
      <a className={style.btn_back} href="/home">
        Atras
      </a>
      <div className={style.containerEditUser}>
        <div>
          <img
            src={
              user && user.photoURL
                ? user.photoURL
                : "https://cdn-icons-png.flaticon.com/128/2986/2986624.png"
            }
            alt=""
            className={style.img}
          />

        </div>
        <form onSubmit={handleSubmit} className={style.formEditUser}>
          <label>Su usuario</label>
          <input
            type="text"
            name="name"
            className={style.input}
            placeholder={allUsuariosByID.name}
            onChange={handleChange}
          />
          <label>Su teléfono</label>
          <input
            type="number"
            name="phone"
            className={style.input}
            placeholder={
              allUsuariosByID.phone ? allUsuariosByID.phone : "ej: 3519887123"
            }
            onChange={handleChange}
          />
          <button className={style.btn_back}>Editar usuario</button>
        </form>
      </div>
      <h2>Ordenes de compras</h2>
      <div className={style.containerOrdenesCompras}>
        {allOrderByID.map((elemento) => {
          return (
            <div key={elemento._id} className={style.ordenCompra}> 
              <div className={style.ordenDetail}>
                {elemento.products.map((e) => {
                  return (
                    
                    <ul key={e._id} className={style.containerProduct}  
                                 
                    onClick=
                    {()=>setcalificar({
                      productId: e.product._id,
                      nickname: elemento.userId,
                       num: stars,
                       comment: calificar.comment
                      
                        })  }>
                          
                  {/* {console.log("PRUEBASSSSSSSSSSSSSSSSSSSSS",e._id)} */}
                      <img
                        src={e.product.image}
                        alt={e.product.title}
                        width="80px"
                        height="80px"
                      />

                      <li className={style.label}>{e.product.title}</li>
                      <li className={style.label}>{e.product.brand}</li>
                      <li className={style.label}>${elemento.total}</li>
                      <div>
                      
                      
                      <StarRating />
                      
                      
                      <textarea  name="comment" onChange={onChangeCalificar}   ></textarea>
                      </div>
                      <li className={style.label}>{e.quantity}</li>
                      
                      <button  onClick={handleSubmitCalificar}>Enviar</button>
                    </ul>
                    
                  );
                })}
              </div>
              
            </div>
          );
        })}
      </div>
      
    </div>
  );
};
export default DetailUser;