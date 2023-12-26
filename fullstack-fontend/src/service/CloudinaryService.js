import custom from './custom-axios';

const postAddCloud = (image, idSp) => custom.post('/cloudinary/upload', image, idSp);

const deleteCloud = (imgName) => custom.get(`/cloudinary/delete?imgName=${imgName}`);

export { postAddCloud, deleteCloud };
