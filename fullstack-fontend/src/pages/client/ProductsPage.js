import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useCallback } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import InfiniteScroll from 'react-infinite-scroll-component';
// components
import { ProductListAll, ProductfilterSB } from '../../sections/@dashboard/products';
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

  const [currentPage, setCurrentPage] = useState(0);
  const getListData = useCallback(async () => {
    try {
      const res = await fetchSpForClient(currentPage);
      console.log('Check res: ', res);
      setListSP((prevList) => [...prevList, ...res.content]);
      setSoTrangDaHasagi(res.totalPages);
    } catch (error) {
      console.error('Error in list bill: ', error);
    }
  }, [currentPage]);

  const [soTrangDaHasagi, setSoTrangDaHasagi] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const fetchMoreData = () => {
    console.log(soTrangDaHasagi, 'hasagi');
    console.log(currentPage, 'currentPage');
    if (soTrangDaHasagi - 1 <= currentPage) {
      setHasMore(false);
    } else {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  console.log(listSP.length, 'length');

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

  const displayProducts = isFiltered ? listLoc : listSP;

<<<<<<< HEAD
=======
  console.log('displayProducts: ', displayProducts);

>>>>>>> origin/nghiant0807
  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Danh sách sản phẩm
        </Typography>
        <InfiniteScroll
          dataLength={listSP && listSP.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<p style={{ textAlign: 'center' }}>Loading...</p>}
          endMessage={<p style={{ textAlign: 'center' }}>Đã tải hết sản phẩm !!!</p>}
        >
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
        </InfiniteScroll>
      </Container>
    </>
  );
}
