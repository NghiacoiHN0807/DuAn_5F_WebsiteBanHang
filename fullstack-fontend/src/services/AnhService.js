import custom from "./custom-axios";

const fetchAnh = () => {
  return custom.get(`/anh/listAnh`); // Call API
};

const postAddAnh = (idSp, url, trangThai) => {
  return custom.post("/anh/add", { idSp, url, trangThai });
};

export { fetchAnh, postAddAnh };
