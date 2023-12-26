import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
// components
import { ProductSort, ProductListAll, ProductfilterSB } from '../../sections/@dashboard/products';
// mock

//
import { getSpGiamGiaForClient } from '../../service/SanPhamService';

// ----------------------------------------------------------------------

export default function SaleProductsPage() {
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
      const res = await getSpGiamGiaForClient();
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

  const [listLoc, setListLoc] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const handleFilter = (filteredProducts) => {
    setListLoc(filteredProducts);
    setIsFiltered(true);
  };

  const displayProducts = isFiltered ? listLoc : listSP;

  console.log("displayProducts: ", displayProducts);

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products Sale
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductfilterSB
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
              listSP={listSP}
              onFilter={handleFilter}
            />
          </Stack>
        </Stack>

        {listSP.length > 0 && (
          <div>
            {displayProducts.length > 0 ? (
              <ProductListAll products={displayProducts} sx={{ marginBottom: '50px' }} />
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
