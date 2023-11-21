import axios from "axios";

const getTinhThanhPho = () =>
     axios.get(`https://vapi.vnappmob.com/api/province`); // Call API

const getQuanHuyen = (id) =>
     axios.get(`https://vapi.vnappmob.com/api/province/district/${id}`); // Call API

const getPhuongXa = (id) =>
     axios.get(`https://vapi.vnappmob.com/api/province/ward/${id}`); // Call API



export {getTinhThanhPho, getQuanHuyen,getPhuongXa};
