// import { createContext, useContext, useEffect, useState } from "react";
// import { listProductOnCart } from "../../service/client/Detail-Cart";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//     const [cartItems, setCartItems] = useState([]);

//     const fetchCartData = async () => {
//         try {
//             const getLocalStore = localStorage.getItem('userFormToken');
//             if (getLocalStore) {
//                 const authorities = JSON.parse(getLocalStore).taiKhoan;
//                 const getData = await listProductOnCart(authorities.idTaiKhoan);
//                 setCartItems(getData || []);
//             }
//         } catch (error) {
//             console.error(error);
//             setCartItems([]);
//         }
//     };

//     const updateLocalStorage = (items) => {
//         const getLocalStore = localStorage.getItem('userFormToken');
//         if (getLocalStore) {
//             const authorities = JSON.parse(getLocalStore).taiKhoan;
//             // Lưu giỏ hàng vào localStorage
//             localStorage.setItem(`cartItems_${authorities.idTaiKhoan}`, JSON.stringify(items));
//         }
//     };

//     useEffect(() => {
//         fetchCartData();
//     }, []); // Run only once on component mount

//     const addToCart = (item) => {
//         setCartItems((prevItems) => {
//             const newItems = [...prevItems, item];
//             updateLocalStorage(newItems); // Cập nhật localStorage khi thêm sản phẩm
//             return newItems;
//         });
//     };

//     // CartContext.js
//     const removeFromCart = (itemId) => {
//         return new Promise((resolve) => {
//             setCartItems((prevItems) => {
//                 const newCart = prevItems.filter((item) => item.id !== itemId);
//                 resolve(newCart);
//                 return newCart;
//             });
//         });
//     };


//     return (
//         <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
//             {children}
//         </CartContext.Provider>
//     );
// };

// export const useCart = () => {
//     const context = useContext(CartContext);
//     if (!context) {
//         throw new Error('useCart must be used within a CartProvider');
//     }
//     return context;
// };
