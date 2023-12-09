import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Grid, Typography } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import ShopProductCard from './ProductCardADM';
import { findById } from '../../../service/BillSevice';
import ModalDetailProduct from '../../../forms/Modal-Detail-SanPham';

// ----------------------------------------------------------------------

ProductListADM.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductListADM({ products, ...other }) {
  const [listImages, setListImages] = useState([]);
  const [dataDetail, setDataDetail] = useState([]);
  const [showModalDetail, setShowModalDetail] = useState(false);

  const handleChoose = async (id, cover) => {
    const getOneSP = await findById(id);
    setListImages(cover);
    setDataDetail(getOneSP);
    setShowModalDetail(true);
  };
  const handleCloseDetail = () => {
    setShowModalDetail(false);
  };
  return (
    <>
      {products.length > 0 ? (
        <div>
          <Grid container spacing={3} {...other}>
            {products.map((product) => (
              <Grid
                key={product.idSp}
                item
                xs={12}
                sm={6}
                md={3}
                onClick={() => handleChoose(product.idSp, product.url)}
              >
                <ShopProductCard product={product} />
              </Grid>
            ))}
          </Grid>
          <ModalDetailProduct
            show={showModalDetail}
            handleCloseDetai={handleCloseDetail}
            dataDetail={dataDetail}
            selectDataCart={products[0].selectDataCart}
            DataCart={products[0].DataCart}
            listImages={listImages}
          />
        </div>
      ) : (
        <div>
          <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', marginBottom: '50px' }}>
            <SearchOffIcon sx={{ fontSize: 80 }} /> Không tìm thấy sản phẩm phù hợp!
          </Typography>
        </div>
      )}
    </>
  );
}
