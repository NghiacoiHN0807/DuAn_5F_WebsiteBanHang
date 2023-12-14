import { useState, useEffect, useCallback } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
// import ModalDetailProduct from './Modal-Detail-SanPham';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchSpForClient } from '../service/SanPhamService';
// @mui
import { ProductListADM, ProductfilterSB } from '../sections/@dashboard/products';

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

  const [currentPage, setCurrentPage] = useState(0);
  const getAllData = useCallback(async () => {
    try {
      // const getData = await fetchAllCTSPBySize();
      const getData = await fetchSpForClient(currentPage);
      console.log('getDataSanPham: ', getData);
      if (getData) {
        setListData((prevList) => [...prevList, ...getData.content]);
        setLastPage(getData.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  }, [currentPage]);

  const [lastPage, setLastPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const fetchMoreData = () => {
    console.log('lastPage: ', lastPage);
    console.log('currentPage: ', currentPage);
    if (lastPage - 1 <= currentPage) {
      setHasMore(false);
    } else {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

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
            <div
              style={{
                overflowY: 'auto',
                maxHeight: '500px', // Đặt chiều cao tùy ý
              }}
            >
              <InfiniteScroll
                dataLength={listData && listData.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<p style={{ textAlign: 'center' }}>Loading...</p>}
                endMessage={<p style={{ textAlign: 'center' }}>Đã tải hết sản phẩm !!!</p>}
              >
                <Stack
                  direction="row"
                  flexWrap="wrap-reverse"
                  alignItems="center"
                  justifyContent="flex-end"
                  sx={{ mb: 5 }}
                >
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

                <ProductListADM
                  getDetailHD={getDetailHD}
                  products={displayProducts}
                  selectDataCart={selectDataCart}
                  DataCart={DataCart}
                />
              </InfiniteScroll>
            </div>
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
