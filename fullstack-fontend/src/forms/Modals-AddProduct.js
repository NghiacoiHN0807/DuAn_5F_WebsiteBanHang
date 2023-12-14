import { useState, useEffect, useCallback } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  OutlinedInput,
  Typography,
  alpha,
  styled,
} from '@mui/material';
import PropTypes from 'prop-types';

// import ModalDetailProduct from './Modal-Detail-SanPham';
import Iconify from '../components/iconify';
import { fetchSpForClient } from '../service/SanPhamService';
// @mui
import { ProductListADM, ProductfilterSB } from '../sections/@dashboard/products';

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

const ModalAddProduct = (props) => {
  // Get Props
  ModalAddProduct.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    selectDataCart: PropTypes.func.isRequired,
    getDetailHD: PropTypes.func.isRequired,
    DataCart: PropTypes.array.isRequired,
  };
  const { show, handleClose, selectDataCart, DataCart, getDetailHD } = props;
  const [listData, setListData] = useState([]);

  const getAllData = useCallback(async () => {
    try {
      // const getData = await fetchAllCTSPBySize();
      const getData = await fetchSpForClient();
      setListData(getData);
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

  const hanldeSetCloser = () => {
    setIsFiltered(false);
    handleClose();
  };

  const [dsList, setDsList] = useState([]);

  // search
  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredProducts = dsList.filter((product) => product.tenSp.toLowerCase().includes(searchInput.toLowerCase()));

  // helptext

  const handleClearAll = (isPressed) => {
    setIsFiltered(isPressed);
  };

  useEffect(() => {
    if (isFiltered) {
      setDsList(listLoc);
    } else {
      setDsList(listData);
    }
  }, [isFiltered, listLoc, listData]);

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
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginBottom: '40px' }}>
              <Grid item xs={6}>
                <StyledSearch
                  placeholder="Tìm kiếm ..."
                  startAdornment={
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                    </InputAdornment>
                  }
                  value={searchInput}
                  onChange={handleSearchChange}
                />
                <Typography variant="caption" display="block" gutterBottom sx={{ margin: '10px' }}>
                  {isFiltered ? 'Đang tìm theo lọc' : ''}
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: 'right' }}>
                <ProductfilterSB
                  openFilter={openFilter}
                  onOpenFilter={handleOpenFilter}
                  onCloseFilter={handleCloseFilter}
                  listSP={listData}
                  onFilter={handleFilter}
                  onClearAll={handleClearAll}
                  sx={{ zIndex: 1300 }}
                />
              </Grid>
            </Grid>

            <ProductListADM
              getDetailHD={getDetailHD}
              products={filteredProducts}
              selectDataCart={selectDataCart}
              DataCart={DataCart}
            />
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
