import { useState, useEffect, useCallback } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { sample } from 'lodash';
import PropTypes from 'prop-types';
// import ModalDetailProduct from './Modal-Detail-SanPham';
import { fetchAllCTSPBySize } from '../service/BillSevice';
// @mui
import { ProductSort, ProductListADM, ProductFilterSidebar } from '../sections/@dashboard/products';

const ModalAddProduct = (props) => {
  // Get Props
  ModalAddProduct.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    selectDataCart: PropTypes.func.isRequired,
    DataCart: PropTypes.array.isRequired,
  };
  const { show, handleClose, selectDataCart, DataCart } = props;
  const [listData, setListData] = useState([]);
  // const [numberPages, setNumberPages] = useState(0);

  const getAllData = useCallback(async (page) => {
    try {
      const getData = await fetchAllCTSPBySize(page);
      console.log('getData.content: ', getData);
      if (getData) {
        setListData(getData);
        // setNumberPages(getData.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  // const handlePageClick = (page) => {
  //   getAllData(page);
  //   setCurrentPage(page);
  // };

  // const handleChoose = async (id, cover) => {
  //   console.log('idSp: ', id);
  //   console.log('imgs: ', cover);

  // };

  //   Select card product
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const PRODUCTS = listData.map((item, index) => {
    const setIndex = index + 1;
    const imagesArray = item[0].split(',');
    const firstImage = imagesArray[0];
    const arrayPrice = item[4].split(',');
    const price = arrayPrice.map((price) => parseFloat(price));
    // find max and min of price
    const minPrice = Math.min(...price);
    const maxPrice = Math.max(...price);
    // Select price
    const priceRange = minPrice === maxPrice ? minPrice : `${minPrice} ${maxPrice}`;

    const PRODUCT_COLOR = ['#00AB55', '#000000', '#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF', '#94D82D', '#FFC107'];

    return {
      id: item[1],
      cover: firstImage,
      name: item[3],
      price: priceRange,
      priceSale: item[2],
      colors:
        (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
        (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
        (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
        (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
        (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
        (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
        PRODUCT_COLOR,
      status: sample(['sale', 'new', '', '']),
      selectDataCart,
      DataCart,
    };
  });

  return (
    <>
      <div>
        <Dialog open={show} onClose={handleClose} maxWidth="xl" fullWidth>
          <DialogTitle>
            <Typography variant="h4" sx={{ mb: 5 }}>
              Danh Sách Sản Phẩm
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
              <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                <ProductFilterSidebar
                  openFilter={openFilter}
                  onOpenFilter={handleOpenFilter}
                  onCloseFilter={handleCloseFilter}
                />
                <ProductSort />
              </Stack>
            </Stack>

            <ProductListADM products={PRODUCTS} />
            {/* <ProductCartWidget /> */}

            {/* <Stack direction="row" spacing={2} justify="center" alignItems="center">
              <Pagination
                onChange={(event, page) => handlePageClick(page - 1)}
                count={numberPages}
                variant="outlined"
              />
            </Stack> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleClose}>Hoàn Tất</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default ModalAddProduct;
