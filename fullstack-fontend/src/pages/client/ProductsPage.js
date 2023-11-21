import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useMemo } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import { ProductSort, ProductListAll, ProductfilterSB } from '../../sections/@dashboard/products';
// mock

//
import { fetchSpForClient } from '../../service/SanPhamService';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [listSP, setListSP] = useState([]);

  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const getListData = async () => {
    try {
      const res = await fetchSpForClient();
      console.log('Check res: ', res);
      setListSP(res);
    } catch (error) {
      console.error('Error in list bill: ', error);
    }
  };
  useEffect(() => {
    getListData();
  }, []);

  // filter
  // const listLoc = listSP.filter((sp) => sp.chatLieus.includes('12'));

  const [filteredList, setFilteredList] = useState([]);

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductfilterSB
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
              listSP={listSP}
              // onFilter={(filteredList) => {
              //   // Lấy kết quả đã lọc từ ProductFilterSB
              //   setFilteredList(filteredList);
              // }}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductListAll products={listSP} />
      </Container>
    </>
  );
}
