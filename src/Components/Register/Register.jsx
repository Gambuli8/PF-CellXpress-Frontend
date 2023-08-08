import React, { useState } from "react";
import style from "./Register.module.css";
import { useDispatch } from "react-redux";
import { postUser } from "../../Redux/Actions";
import { validate } from "../Validate/Validate";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const {signup} = useAuth()
  const navigate = useNavigate()
  
    
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    //? Manejo del input
    const { name, value } = event.target;
    const error = validate(name, value);
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      //? Manejo de errores
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors("")
    const validationErrors = validate(input);
    
    if (Object.keys(validationErrors).length === 0) {
    
      try {
        await signup(input.email, input.password)
        navigate("/home")
      } catch (error) {
        alert(error.message)
      }

      dispatch(postUser(input));
      setInput({
        name: "",
        lastname: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className={style.contenedor}>
      <a href="/home" className={style.back}>
        Volver
      </a>
      <div className={style.container}>
        <form className={style.inputContainer} onSubmit={handleSubmit}>
          <h2>Registrarse</h2>
          <label className={style.label}>Nombre</label>
          <input
            className={style.input}
            onChange={handleChange}
            value={input.name}
            type="text"
            name="name"
          />
          {errors.name && <p className={style.error}>{errors.name}</p>}
          <label className={style.label}>Apellido</label>
          <input
            className={style.input}
            onChange={handleChange}
            value={input.lastname}
            type="text"
            name="lastname"
          />
          {errors.lastname && <p className={style.error}>{errors.lastname}</p>}
          <label className={style.label}>Email</label>
          <input
            className={style.input}
            onChange={handleChange}
            value={input.email}
            type="email"
            name="email"
          />
          {errors.email && <p className={style.error}>{errors.email}</p>}
          <label className={style.label}>Contraseña</label>
          <input
            className={style.input}
            onChange={handleChange}
            value={input.password}
            type="password"
            name="password"
          />
          {errors.password && <p className={style.error}>{errors.password}</p>}
          <button type="submit" className={style.button}>
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};
export default Register;
