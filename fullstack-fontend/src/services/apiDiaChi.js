import axios from "axios";

const getTinh_ThanhPho = () => {
    return axios.get(`https://vapi.vnappmob.com/api/province`); // Call API
};
const getQuan_Huyen = (id) => {
    return axios.get(`https://vapi.vnappmob.com/api/province/district/${id}`); // Call API
};
const getPhuong_Xa = (id) => {
    return axios.get(`https://vapi.vnappmob.com/api/province/ward/${id}`); // Call API
};


export {getTinh_ThanhPho, getQuan_Huyen,getPhuong_Xa};
