import { useState } from 'react';
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { pink } from '@mui/material/colors';
import Paper from '@mui/material/Paper';
import ModalDetailItemReturn from './Modals-DetailReturnItem';
import ModalAllItemReturn from './Modals-ReturnAllItem';

// @mui

const ModalItemReturn = (props) => {
  // Sle
  // Get Props
  ModalItemReturn.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    selectDataCart: PropTypes.func.isRequired,
    DataCart: PropTypes.array.isRequired,
    getListData: PropTypes.func.isRequired,
  };
  const { show, handleClose, selectDataCart, DataCart, getListData } = props;

  //   Select card product
  // const [openFilter, setOpenFilter] = useState(false);

  // const handleOpenFilter = () => {
  //   setOpenFilter(true);
  // };

  // const handleCloseFilter = () => {
  //   setOpenFilter(false);
  // };

  // Return one product on cart
  const [showModalsReturnOne, setShowModalReturnOne] = useState(false);
  const [showModalsReturnAll, setShowModalReturnAll] = useState(false);
  const [itemReturnOne, setIntemReturnOne] = useState();

  const handleReturnOne = (item) => {
    console.log('item return: ', item);
    setShowModalReturnOne(true);
    setIntemReturnOne(item);
  };

  const handleCloseModalReturnOne = () => {
    setShowModalReturnOne(false);
  };

  const handleReturnAll = async () => {
    setShowModalReturnAll(true);
    // await returnAllItem(idHdParam,mota, 6)
  };
  const handleCloseModalReturnAll = () => {
    setShowModalReturnAll(false);
  };

  // Format thanhTien
  const formatCurrency = (amount) => amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  return (
    <>
      <Container>
        <Dialog open={show} onClose={handleClose} maxWidth="xl" fullWidth>
          <DialogTitle>
            <Typography variant="h4" sx={{ mb: 5 }}>
              Danh Sách Sản Phẩm
            </Typography>
          </DialogTitle>
          <DialogContent>
            <TableContainer sx={{ marginTop: 2, marginBottom: 2 }} component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Ảnh</TableCell>
                    <TableCell>Mã Sản Phẩm</TableCell>
                    <TableCell align="right">Sản Phẩm</TableCell>
                    <TableCell align="right">Thuộc tính</TableCell>
                    <TableCell align="right">Giá</TableCell>
                    <TableCell align="right">Số Lượng</TableCell>
                    <TableCell align="right">Tổng</TableCell>
                    <TableCell align="right">Thao Tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {DataCart && DataCart.length > 0 ? (
                    DataCart.map((item, index) => {
                      const imagesArray = item[2].split(','); // Tách chuỗi thành mảng
                      const firstImage = imagesArray[0];
                      return (
                        <TableRow
                          key={index}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell>
                            <Image rounded style={{ width: '150px', height: 'auto' }} src={firstImage} />
                          </TableCell>
                          <TableCell>{item[4]}</TableCell>
                          <TableCell align="right">{item[5]}</TableCell>
                          <TableCell align="right">
                            Size: {item[6]}
                            <br />
                            Màu: {item[11]}
                          </TableCell>
                          <TableCell align="right">{formatCurrency(item[7])}</TableCell>
                          <TableCell align="right">{item[8]}</TableCell>
                          <TableCell align="right">{formatCurrency(item[9])}</TableCell>
                          <TableCell align="right">
                            <IconButton aria-label="delete" size="large" onClick={() => handleReturnOne(item)}>
                              <KeyboardReturnIcon sx={{ color: pink[500] }} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell align="right" colSpan={8}>
                        KHÔNG CÓ DỮ LIỆU
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell rowSpan={3} />
                  </TableRow>
                </TableBody>
              </Table>{' '}
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handleReturnAll}>Hoàn Trả Tất Cả</Button>
          </DialogActions>
        </Dialog>
      </Container>
      {itemReturnOne && (
        <ModalDetailItemReturn
          show={showModalsReturnOne}
          handleClose={handleCloseModalReturnOne}
          itemReturnOne={itemReturnOne}
          selectDataCart={selectDataCart}
          getListData={getListData}
        />
      )}
      <ModalAllItemReturn
        show={showModalsReturnAll}
        selectDataCart={selectDataCart}
        getListData={getListData}
        handleClose={handleCloseModalReturnAll}
      />
    </>
  );
};

export default ModalItemReturn;
