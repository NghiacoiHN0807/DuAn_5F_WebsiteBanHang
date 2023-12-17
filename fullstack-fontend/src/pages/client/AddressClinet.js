import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
// components
import { Container } from '@mui/system';
import { Helmet } from 'react-helmet-async';

// sections
import { selectDiaChiByTK } from '../../service/client/Payment';
import ModalAddAddressById from '../../forms/ModalsAddAddressById';
import { deleteDiaChi } from '../../service/diaChiSevice';
import ModalsUpdateAddressById from '../../forms/ModalsUpdateAddressById';
// APIs

const ModalAddAddress = () => {
  // Select address
  const [listData, setListData] = useState([]);
  const tong = listData.length;

  const getAllData = useCallback(async () => {
    try {
      // Get KH
      const getLocalStore = localStorage.getItem('userFormToken');
      const authorities = getLocalStore ? JSON.parse(getLocalStore).taiKhoan : '';
      const getData = await selectDiaChiByTK(authorities.maTaiKhoan);

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

  const handleDelete = async (item) => {
    const res = await deleteDiaChi(item.id);
    if (res) {
      getAllData();
      handleClose();
    } else {
      handleClose();
    }
  };

  // Get number

  const [showModalsAddress, setShowModal] = useState(false);
  const handleAddAddress = () => {
    setShowModal(true);
  };
  const handleCloseAddress = () => {
    setShowModal(false);
  };

  const [showModalsUpdate, setShowModalsUpdate] = useState(false);
  const handleUpdateAddress = (id) => {
    setShowModalsUpdate(true);
    setIdDC(id);
  };
  const handleCloseUpdate = () => {
    setShowModalsUpdate(false);
  };
  const [open, setOpen] = useState(false);
  const [idDC, setIdDC] = useState('');

  const handleClickOpenDelete = (id) => {
    setOpen(true);
    setIdDC(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Helmet>
        <title> 5FStore || Địa Chỉ </title>
      </Helmet>
      <Container>
        <TableContainer component={Paper} sx={{ marginBottom: '70px' }}>
          <Table sx={{ minWidth: 700 }} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell>Địa Chỉ || {tong} trên 5 địa chỉ</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleAddAddress()}
                    sx={{
                      backgroundColor: 'black',
                      color: 'white',
                      float: 'right',
                      marginRight: '10px',
                      '&:hover': {
                        backgroundColor: 'white',
                        color: 'black',
                      },
                    }}
                    disabled={tong === 5}
                  >
                    {tong >= 5 ? 'Đã Khóa Thêm ' : ' Thêm Địa Chỉ Mới'}
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listData.map((row, index) => {
                const { id, loaiDiaChi, diaChiCuThe, phuongXa, quanHuyen, tinhThanh, tenNguoiNhan, sdt } = row;
                return (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row" align="left">
                      <div>
                        <div>
                          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{tenNguoiNhan}</span> | {sdt}
                        </div>
                        <div>{diaChiCuThe}</div>
                        <div>
                          {tinhThanh}, {phuongXa}, {quanHuyen}
                        </div>
                        <div style={{ fontSize: loaiDiaChi === 1 ? '14px' : '12px' }}>
                          {loaiDiaChi === 0 ? 'Nhà Riêng' : 'Nơi Làm Việc'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="left" scope="row">
                      <Button onClick={() => handleUpdateAddress({ id })}>Cập Nhật</Button>
                      <Button onClick={() => handleClickOpenDelete({ id })}>Xóa</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <ModalAddAddressById open={showModalsAddress} handleClose={handleCloseAddress} getAllData={getAllData} />
      <ModalsUpdateAddressById
        open={showModalsUpdate}
        handleClose={handleCloseUpdate}
        getAllData={getAllData}
        idDC={idDC}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Xác nhận xóa?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa địa chỉ này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={() => handleDelete(idDC)} autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ModalAddAddress;
