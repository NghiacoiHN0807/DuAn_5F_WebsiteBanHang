import custom from "./custom-axios";

const postAddCloud = (image, idSp) => {
  return custom.post("/cloudinary/upload", image, idSp);
};

const deleteCloud = (imgName) => {
  return custom.get(`/cloudinary/delete?imgName=${imgName}`);
};

export { postAddCloud, deleteCloud };
