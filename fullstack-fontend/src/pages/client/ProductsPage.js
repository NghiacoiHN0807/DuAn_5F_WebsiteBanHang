import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useCallback } from 'react';
// @mui
import { Container, Grid, InputAdornment, OutlinedInput, Typography, alpha, styled } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import Iconify from '../../components/iconify';

// components
import { ProductListAll, ProductfilterSB } from '../../sections/@dashboard/products';
// mock
import { fetchSpForClient } from '../../service/SanPhamService';

// ----------------------------------------------------------------------

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

export default function ProductsPage() {
  const [listSP, setListSP] = useState([]);

  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const getListData = useCallback(async () => {
    try {
      const res = await fetchSpForClient();
      console.log('Check res: ', res);
      setListSP(res);
    } catch (error) {
      console.error('Error in list bill: ', error);
    }
  }, []);

  useEffect(() => {
    getListData();
  }, [getListData]);

  // filter

  const [listLoc, setListLoc] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const handleFilter = (filteredProducts) => {
    setListLoc(filteredProducts);
    setIsFiltered(true);
  };

  const [dsList, setDsList] = useState([]);

<<<<<<< HEAD
=======
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
      setDsList(listSP);
    }
  }, [isFiltered, listLoc, listSP]);

>>>>>>> origin/vinhlt
  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Danh sách sản phẩm
        </Typography>
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
              listSP={listSP}
              onFilter={handleFilter}
              onClearAll={handleClearAll}
            />
          </Grid>
        </Grid>

        {listSP.length > 0 && (
          <div>
            {filteredProducts.length > 0 ? (
              <ProductListAll products={filteredProducts} sx={{ marginBottom: '50px' }} />
            ) : (
              <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', marginBottom: '50px' }}>
                <SearchOffIcon sx={{ fontSize: 80 }} /> Không tìm thấy sản phẩm phù hợp!
              </Typography>
            )}
          </div>
        )}
      </Container>
    </>
  );
}
