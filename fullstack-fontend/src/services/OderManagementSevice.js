import custom from "./custom-axios";
const getAllOrderManagement = (page, keyword) => {
  return custom.get(
    `/hoa-don/view-all-online-invoice?p=${page}&keyword=${keyword}`
  );
};
const getDetailOneHD = (idHd) => {
  return custom.get(`/hoa-don/detail/${idHd}`);
};
export { getAllOrderManagement, getDetailOneHD };
