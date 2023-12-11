import { useState, useEffect, useCallback } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
// import ModalDetailProduct from './Modal-Detail-SanPham';
import { fetchSpForClient } from '../service/SanPhamService';
// @mui
import { ProductListADM, ProductfilterSB } from '../sections/@dashboard/products';

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

  const getAllData = useCallback(async () => {
    try {
      // const getData = await fetchAllCTSPBySize();
      const getData = await fetchSpForClient();
      console.log('getDataSanPham: ', getData);
      if (getData) {
        setListData(getData);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  //   Select card product
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  // filter
  const [listLoc, setListLoc] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const handleFilter = (filteredProducts) => {
    setListLoc(filteredProducts);
    setIsFiltered(true);
  };

  const displayProducts = isFiltered ? listLoc : listData;

  const hanldeSetCloser = () => {
    setIsFiltered(false);
    handleClose();
  };

  return (
    <>
      <div>
        <Dialog open={show} onClose={hanldeSetCloser} maxWidth="xl" fullWidth sx={{ zIndex: 1200 }}>
          <DialogTitle>
            <Typography variant="h4" sx={{ mb: 5 }}>
              Danh Sách Sản Phẩm
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
              <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                <ProductfilterSB
                  openFilter={openFilter}
                  onOpenFilter={handleOpenFilter}
                  onCloseFilter={handleCloseFilter}
                  listSP={listData}
                  onFilter={handleFilter}
                  sx={{ zIndex: 1300 }}
                />
              </Stack>
            </Stack>
            <ProductListADM products={displayProducts} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => hanldeSetCloser()}>Hủy</Button>
            <Button onClick={() => hanldeSetCloser()}>Hoàn Tất</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default ModalAddProduct;
