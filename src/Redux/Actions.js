/* eslint-disable no-unused-vars */
import Swal from "sweetalert2";
import {
  GET_ALL_PRODUCTS,
  GET_USERS,
  POST_USER,
  GET_PRODUCTS_BY_NAME,
  GETFILTERS,
  ORDERPHONE,
  POST_PRODUCT,
  PUT_PRODUCT,
  POST_ORDER,
  POST_USERID,
  LOGIN_USER,
  RAMFILTERS,
  PIXELESFILTERS,
  DELETE_PRODUCT_CART,
  GET_ORDER_BUY,
} from "./ActionsTypes";

import axios from "axios";
// import swal from "sweetalert2";

// funcion  para traer todos los productos de la db...
export function getProduct() {
  return async function (dispatch) {
    try {
      const response = (await axios.get("/products")).data;
      console.log("6666", response);
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: response,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export const postProduct = (products) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/products", products);
      dispatch({ type: POST_PRODUCT, payload: response.data });
      alert(`${products.title} Agregado correctamente`);
      return response;
    } catch (error) {
      alert(error.message);
    }
  };
};

export const putProduct = (products) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/products/${products.id}`, {
        isDeactivated: products.isDeactivated,
      });
      console.log("8888", response);
      if (products.isDeactivated) {
        Swal.fire({
          text: `${products.title} desactivado Correctamente`,
          icon: "error",
        });
      } else {
        Swal.fire({
          text: `${products.title} Activado Correctamente`,
          icon: "success",
        });
      }

      dispatch(getProduct());
    } catch (error) {
      console.log(error);
      /*alert(error.message)*/
    }
  };
};

export const getUsers = () => {
  return async (dispatch) => {
    try {
      const response = (await axios.get("/")).data;
      dispatch({
        type: GET_USERS,
        payload: response,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getProductsByName = (name) => {
  return async (dispatch) => {
    try {
      const response = (await axios.get(`/products/search?keyword=${name}`))
        .data.products;
      console.log(response);
      if (response.length === 0) {
        Swal.fire({
          text: "No se encontro el producto",
          icon: "error",
          confirmButtonText: "ok",
        });
        dispatch({
          type: GET_ALL_PRODUCTS,
          payload: response,
        });
      }
      return dispatch({
        type: GET_PRODUCTS_BY_NAME,
        payload: response,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const postUser = (user) => {
  console.log("usuario", user);
  return async (dispatch) => {
    console.log("hola");
    try {
      const response = await axios.post(
        "https://cellxpress.onrender.com/",
        user
      );
      dispatch({ type: POST_USER, payload: response.data });
      alert(`${user.name} Bienvenido  a CELLXPRESS`);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
};

export const postInfo = (info) => {
  return async (dispatch) => {
    try {
      console.log(info);
      const response = await axios.post(
        "http://localhost:3002/order/add-to-cart",
        info
      );
      dispatch({ type: POST_ORDER, payload: response.data });
    } catch (error) {
      console.log(error.message.data);
    }
  };
};

export const deleteProduct = (productId, userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://localhost:3002/order/remove-from-cart/${userId}/${productId}`
      );
      dispatch({ type: DELETE_PRODUCT_CART, payload: response.data });
    } catch (error) {
      console.log(error.message.data);
    }
  };
};

export const postUserId = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:3002/order/checkout/?userId=${userId}`
      );
      dispatch({ type: POST_USERID, payload: response.data });
    } catch (error) {
      console.log(error.message.data);
    }
  };
};

export const getfilters = (info) => {
  return async (dispatch) => {
    try {
      const response = (
        await axios.get(
          `/products/filter?brand=${info.brand}&minPrice=${info.minPrice}&maxPrice=${info.maxPrice}&ram=${info.ram}&cameraInches=${info.camera}&screenSize=`
        )
      ).data.products;
      if (response.length === 0) {
        Swal.fire({
          text: "Producto no encontrado",
          icon: "error",
          confirmButtonText: "ok",
        });
      }
      dispatch({
        type: GETFILTERS,
        payload: response,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const getfiltersram = (info) => {
  return async (dispatch) => {
    try {
      const response = (
        await axios.get(`/products/filter?brand=&ram=${info}&cameraInches=`)
      ).data.products;
      if (response.length === 0) {
        Swal.fire({
          text: "Producto no encontrado",
          icon: "error",
          confirmButtonText: "ok",
        });
      }
      dispatch({
        type: RAMFILTERS,
        payload: response,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const getfilterspixeles = (info) => {
  return async (dispatch) => {
    try {
      const response = (
        await axios.get(`/products/filter?brand=&ram=&cameraInches=${info}`)
      ).data.products;
      if (response.length === 0) {
        Swal.fire({
          text: "Producto no encontrado",
          icon: "error",
          confirmButtonText: "ok",
        });
      }
      dispatch({
        type: PIXELESFILTERS,
        payload: response,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export function orderPhone(order) {
  return function (dispatch) {
    return dispatch({
      type: ORDERPHONE,
      payload: order,
    });
  };
}
export const loginUser = (userlog) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/users", userlog);
      dispatch({ type: LOGIN_USER, payload: response.data });
      alert(`Bienvenido de nuevo a CELLXPRESS`);
      return response;
    } catch (error) {
      alert(error.message);
    }
  };
};

//funcion para traer todas las ordenes de compras
export const orderBuy = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/order/all/`);
      console.log("response ORderrrr", response);
      dispatch({
        type: GET_ORDER_BUY,
        payload: response.data,
      });
    } catch (error) {
      console.log("errorrr", error);
    }
  };
};

// export const postOrder = (order) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.post("/order/add-to-cart", order);
//       alert(`Gracias por tu compra`);
//       dispatch({ type: POST_ORDER, payload: response.data });
//       return response;
//     } catch (error) {
//       alert(error.message);
//     }
//   };
// };
