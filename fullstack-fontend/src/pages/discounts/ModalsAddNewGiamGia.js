import * as React from 'react';
import { useState, useEffect } from 'react';
import { vi } from 'date-fns/locale'; // Import locale cho tiếng Việt
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Button,
  Checkbox,
  Chip,
  Grid,
  Paper,
  Snackbar,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import { Col, Image, Table } from 'react-bootstrap';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { add, getAllSanPham } from '../../service/giamGiaService';
import '../../scss/GiamGiaClient.scss';
import '../../scss/GiamGiaAdd.scss';
import ModalComfirm from '../../forms/Modal-Comfirm';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

const ModelAddNewGiamGia = () => {
  // const { show, handleClose, isDataGiamGia, getGiamGia } = props;
  // console.log(dataSanPham)
  const navigate = useNavigate();
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [leftPage, setLeftPage] = useState(0);
  const [leftRowsPerPage, setLeftRowsPerPage] = useState(5);
  const [rightPage, setRightPage] = useState(0);
  const [rightRowsPerPage, setRightRowsPerPage] = useState(5);
  const [chiTietList, setchiTietList] = useState([]);
  const [image, setImage] = useState([]);
  const [alertContent, setAlertContent] = useState(null);

  const getAllSp = async () => {
    try {
      const res = await getAllSanPham();
      setLeft(res);
    } catch (error) {
      console.error('Error loading images:', error);
    }
  };

  useEffect(() => {
    getAllSp();
  }, []);

  const leftChecked = intersection(checked, left);

  const handleToggle = (value, isLeft) => () => {
    if (isLeft) {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setChecked(newChecked);
    } else {
      const currentIndex = chiTietList.indexOf(value);
      const newchiTietList = [...chiTietList];

      if (currentIndex === -1) {
        newchiTietList.push(value);
      } else {
        newchiTietList.splice(currentIndex, 1);
      }
      setchiTietList(newchiTietList);
    }
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    const newRight = right.concat(leftChecked);
    const newLeft = not(left, leftChecked);

    const sortedRight = leftChecked.concat(newRight.filter((value) => leftChecked.indexOf(value) === -1));

    setRight(sortedRight);
    setLeft(newLeft);
    setChecked(not(checked, leftChecked));

    setchiTietList([...chiTietList, ...leftChecked]);
  };

  const handleCheckedLeft = () => {
    const newLeft = left.concat(chiTietList); // Sửa từ rightChecked sang chiTietList
    const newRight = not(right, chiTietList); // Sửa từ rightChecked sang chiTietList

    // Move the selected items to the top of the newLeft array
    const sortedLeft = chiTietList.concat(newLeft.filter((value) => chiTietList.indexOf(value) === -1)); // Sửa từ rightChecked sang chiTietList

    setLeft(sortedLeft);
    setRight(newRight);
    setchiTietList([]); // Xóa các phần tử đã chọn khỏi chiTietList
    setChecked([]); // Xóa các phần tử đã chọn
  };


  const [open, setOpen] = useState(null);

  const openModal = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);

  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertContent(null);
  };

  const handleLeftPageChange = (event, newPage) => {
    setLeftPage(newPage);
  };

  const handleLeftRowsPerPageChange = (event) => {
    setLeftRowsPerPage(parseInt(event.target.value, 10));
    setLeftPage(0);
  };

  const handleRightPageChange = (event, newPage) => {
    setRightPage(newPage);
  };

  const handleRightRowsPerPageChange = (event) => {
    setRightRowsPerPage(parseInt(event.target.value, 10));
    setRightPage(0);
  };

  const isMoveLeftDisabled = chiTietList.length === 0;

  function formatCurrency(price) {
    if (!price) return '0';

    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    });

    return formatter.format(price);
  }

  const [giamGia, setGiamGia] = useState({
    maGiamGia: '',
    tenChuongTrinh: '',
    ngayBatDau: '',
    ngayKetThuc: '',
    mucGiamPhanTram: '',
    mucGiamTienMat: '',
    trangThai: 0,
  });

  const { maGiamGia, tenChuongTrinh, mucGiamPhanTram, mucGiamTienMat } = giamGia;

  const onInputChange = (e) => {
    setGiamGia({ ...giamGia, [e.target.name]: e.target.value });
  };

  const [selected, setSelected] = useState('');
  const changeHandler = (e) => {
    setSelected(e.target.value);
  };

  const getMinPrice = () => {
    if (chiTietList.length === 0) {
      return 0; // Hoặc giá trị mặc định khác tùy ý nếu danh sách trống
    }

    // Sử dụng reduce để tìm giá thấp nhất
    const minPrice = chiTietList.reduce((min, item) => {
      const itemPrice = item.sanPham.giaSmall; // Giả sử giá của sản phẩm nằm ở trường giaSmall
      return itemPrice < min ? itemPrice : min;
    }, chiTietList[0].sanPham.giaSmall); // Giả sử giá của sản phẩm đầu tiên là giá thấp nhất ban đầu

    return minPrice;
  };

  // Gọi hàm để lấy giá thấp nhất
  const minPrice = getMinPrice();

  const handleSave = async () => {
    if (!maGiamGia.trim() || !tenChuongTrinh.trim() || !ngayBatDau || !ngayKetThuc) {
      setAlertContent({
        type: 'warning',
        message: 'Vui lòng nhập đầy đủ thông tin chương trình giảm giá!',
      });
      return;
    }

    if (!selected) {
      setAlertContent({
        type: 'warning',
        message: 'Vui lòng chọn loại giảm giá!',
      });
      return;
    }

    if (
      selected === 'phanTram' &&
      (!mucGiamPhanTram || Number.isNaN(mucGiamPhanTram) || mucGiamPhanTram < 1 || mucGiamPhanTram > 50)
    ) {
      setAlertContent({
        type: 'warning',
        message: 'Vui lòng nhập mức giảm phần trăm hợp lệ (1-50)!',
      });
      return;
    }

    if (selected === 'mucGiam' && (!mucGiamTienMat || Number.isNaN(mucGiamTienMat))) {
      setAlertContent({
        type: 'warning',
        message: 'Vui lòng nhập mức giảm tiền mặt hợp lệ!',
      });
      return;
    }

    if (minPrice <= mucGiamTienMat) {
      setAlertContent({
        type: 'warning',
        message: 'Vui lòng nhập mức giảm tiền nhỏ hơn số tiền của sản phẩm!',
      });
      return;
    }

    const adjustedMucGiamTienMat = minPrice - mucGiamTienMat;
    if (adjustedMucGiamTienMat < 10000) {
      setAlertContent({
        type: 'warning',
        message: 'Mức giảm tiền phải ít nhất là 10000 VND sau khi trừ đi giá sản phẩm!',
      });
      return;
    }

    if (chiTietList.length === 0) {
      setAlertContent({
        type: 'warning',
        message: 'Vui lòng chọn ít nhất một sản phẩm để áp dụng giảm giá!',
      });
      return;
    }

    const checkDateValidity = () => ngayKetThuc.isAfter(ngayBatDau);

    const checkDateValidityNow = () => ngayBatDau.isAfter(dayjs());

    if (!checkDateValidityNow()) {
      setAlertContent({
        type: 'warning',
        message: 'Chương trình phải giảm giá sau ít nhất 5 phút!',
      });
      return;
    }

    if (!checkDateValidity()) {
      setAlertContent({
        type: 'warning',
        message: 'Thời gian kết thúc phải sau thời gian bắt đầu!',
      });
      return;
    }

    try {
      // Định dạng ngày và giờ theo múi giờ Việt Nam

      const selectedDate = dayjs(ngayBatDau);
      const ngay = selectedDate.format('YYYY-MM-DDTHH:mm:ss', { locale: vi });
      const selectedDatekt = dayjs(ngayKetThuc);
      const ngaykt = selectedDatekt.format('YYYY-MM-DDTHH:mm:ss', { locale: vi });

      // const formattedDateFirst = format(ngay, 'dd/MM/yyyy HH:mm:ss', { locale: vi });
      // const formattedDateLast = format(ngaykt, 'dd/MM/yyyy HH:mm:ss', { locale: vi });

      const giaGiaAa = {
        maGiamGia: giamGia.maGiamGia,
        tenChuongTrinh: giamGia.tenChuongTrinh,
        ngayBatDau: ngay,
        ngayKetThuc: ngaykt,
        mucGiamPhanTram: giamGia.mucGiamPhanTram,
        mucGiamTienMat: giamGia.mucGiamTienMat,
        trangThai: 0,
      };

      // Trích xuất danh sách idSp từ chiTietList
      const idSpList = chiTietList.map((item) => item.sanPham.idSp);

      // Cập nhật state listIdSp
      const giamGiaChiTietOk = {
        giamGia: giaGiaAa,
        idSp: idSpList,
      };

      const response = await add(giamGiaChiTietOk);

      if (response.status === 'Ok!') {
        const successMessage = {
          type: 'success',
          message: 'Thêm chương trình giảm giá thành công!',
        };
        localStorage.setItem('successMessage', JSON.stringify(successMessage));
        navigate('/dashboard/discounts');
      } else {
        setAlertContent({
          type: 'error',
          message: 'Thêm không thành công!',
        });
      }
    } catch (error) {
      setAlertContent({
        type: 'error',
        message: 'Đã xảy ra lỗi khi thêm giảm giá!',
      });
    }
  };
  // if (!giamGiaData) {
  //   return <div>Loading...</div>;
  // }
  const todayAtNoon = dayjs();
  const todayAt9AM = dayjs();
  const [ngayBatDau, setNgayBatDau] = useState(dayjs());
  const [ngayKetThuc, setNgayKetThuc] = useState(dayjs());

  const filteredArray = left.filter((value) => value.sanPham.trangThai === 0 && value.trangThai === null);
  const filteredArrayLength = filteredArray.length;
  return (
    <>
      <Modal.Header>
        <Modal.Title className="text-center m-25 w-100 text-uppercase">Tạo chương trình giảm giá</Modal.Title>
      </Modal.Header>
      <div className="d-flex justify-content-around">
        <div className="content-left">
          <p className="text-center info-discount">Thông tin giảm giá</p>
          <Modal.Body>
            <div className="body-add-new">
              <form>
                <div className="mb-3">
                  <TextField
                    multiline
                    maxRows={4}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    name="maGiamGia"
                    label="Mã chương trình"
                    value={maGiamGia}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>

                <div className="mb-3">
                  <TextField
                    multiline
                    maxRows={4}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    label="Tên chương trình"
                    name="tenChuongTrinh"
                    value={tenChuongTrinh}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>

                <div className="mb-3">
                  <p className="form-label">Mức Giảm</p>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        onChange={(e) => changeHandler(e)}
                        type="radio"
                        name="flexRadioDefault"
                        id="form-check-label"
                        value={'mucGiam'}
                        checked={selected === 'mucGiam'}
                      />
                      <p className="form-check-label">Tiền Mặt</p>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        onChange={(e) => changeHandler(e)}
                        type="radio"
                        name="flexRadioDefault"
                        id="form-check-label1"
                        value={'phanTram'}
                        checked={selected === 'phanTram'}
                      />
                      <p className="form-check-label1">Phần Trăm</p>
                    </div>
                  </div>
                </div>

                <div className="mb-3" aria-hidden={selected !== 'phanTram'}>
                  <TextField
                    multiline
                    maxRows={4}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    label="Mức giảm %"
                    name="mucGiamPhanTram"
                    value={mucGiamPhanTram}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>

                <div className="mb-3" aria-hidden={selected !== 'mucGiam'}>
                  <TextField
                    multiline
                    maxRows={4}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    label="Mức giảm tiền mặt"
                    name="mucGiamTienMat"
                    value={mucGiamTienMat}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>

                <div className="mb-3">
                  <p className="form-label">Thời gian bắt đầu</p>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                      <DemoItem>
                        <DateTimePicker
                          defaultValue={todayAtNoon}
                          minDateTime={todayAt9AM}
                          name="ngayBatDau"
                          value={ngayBatDau}
                          onChange={(newDate) => setNgayBatDau(newDate)}
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                </div>

                <div className="mb-3">
                  <p className="form-label">Thời gian kết thúc</p>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                      <DemoItem>
                        <DateTimePicker
                          defaultValue={todayAtNoon}
                          minDateTime={todayAt9AM}
                          name="ngayKetThuc"
                          value={ngayKetThuc}
                          onChange={(newDate) => setNgayKetThuc(newDate)}
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                </div>

                {/* <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Ngày kết thúc</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      name='ngayKetThuc'
                      value={ngayKetThuc}
                      onChange={(newDate) => onInputChange(newDate)}
                    />
                  </LocalizationProvider>
                </div> */}

                <Button onClick={() => openModal()} className="btn bg-primary text-light d-flex align-items-end">
                  Thêm
                </Button>
              </form>
            </div>
          </Modal.Body>
        </div>

        <div className="content-right">
          <p className="text-center info-discount">Chọn sản phẩm cần giảm giá</p>
          <div>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              <Grid item>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox
                            onClick={handleToggleAll(left)}
                            checked={numberOfChecked(left) === left.length && left.length !== 0}
                            indeterminate={numberOfChecked(left) !== left.length && numberOfChecked(left) !== 0}
                            disabled={left.length === 0}
                            inputProps={{
                              'aria-label': 'all items selected',
                            }}
                          />
                        </TableCell>
                        <TableCell>STT</TableCell>
                        <TableCell>Mã</TableCell>
                        <TableCell>Tên sản phẩm</TableCell>
                        <TableCell>Trạng thái</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {left
                        .filter((value) => value.sanPham.trangThai === 0 && value.trangThai === null)
                        .slice(leftPage * leftRowsPerPage, leftPage * leftRowsPerPage + leftRowsPerPage)
                        .map((value, index) => (
                          <TableRow key={`left_${value.sanPham.idSp}`} onClick={handleToggle(value, true)}>
                            <TableCell padding="checkbox">
                              <Checkbox value={value.sanPham.idSp} checked={checked.indexOf(value) !== -1} />
                            </TableCell>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{value.sanPham.maSp}</TableCell>
                            <TableCell>{value.sanPham.tenSp}</TableCell>
                            <TableCell>
                              {value.sanPham.trangThai === 0 ? (
                                <Chip label="Hoạt động" className="bg-success text-light" />
                              ) : value.sanPham.trangThai === 1 ? (
                                <Chip label="Chờ giảm giá" className="bg-warning text-light" />
                              ) : (
                                <Chip label="Ngưng hoạt động" className="bg-danger text-light" />
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={filteredArrayLength}
                  rowsPerPage={leftRowsPerPage}
                  page={leftPage}
                  onPageChange={handleLeftPageChange}
                  onRowsPerPageChange={handleLeftRowsPerPageChange}
                />
              </Grid>
              <Grid item>
                <Grid container direction="column" alignItems="center">
                  <Button
                    sx={{ my: 0.5 }}
                    variant="outlined"
                    size="small"
                    onClick={handleCheckedRight}
                    disabled={leftChecked.length === 0}
                    aria-label="move selected right"
                  >
                    &gt;
                  </Button>
                  <Button
                    sx={{ my: 0.5 }}
                    variant="outlined"
                    size="small"
                    onClick={handleCheckedLeft}
                    disabled={isMoveLeftDisabled}
                    aria-label="move selected left"
                  >
                    &lt;
                  </Button>
                </Grid>
              </Grid>
              <Grid item>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell> </TableCell>
                        <TableCell>STT</TableCell>
                        <TableCell>Ảnh sản phẩm</TableCell>
                        <TableCell>Mã sản phẩm</TableCell>
                        <TableCell>Tên sản phẩm</TableCell>
                        <TableCell>Giá sản phẩm</TableCell>
                        <TableCell>Trạng thái</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {right
                        .slice(rightPage * rightRowsPerPage, rightPage * rightRowsPerPage + rightRowsPerPage)
                        .map((value, index) => (
                          <TableRow key={`right_${value.sanPham.idSp}`}>
                            <TableCell padding="checkbox">
                              <Checkbox
                                value={value.sanPham.idSp}
                                checked={chiTietList.indexOf(value) !== -1} // Sử dụng chiTietList thay vì checked
                                onClick={handleToggle(value, false)} // Đặt isLeft là false để xác định là bảng phải
                              // onChange={handleChange}
                              />
                            </TableCell>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                              <Col xs={6} md={4}>
                                <Image
                                  rounded
                                  style={{ width: '150px', height: 'auto' }}
                                  src={value.url_image}
                                  alt={`Ảnh sản phẩm ${value.maSp}`}
                                />
                              </Col>
                            </TableCell>
                            <TableCell>{value.sanPham.maSp}</TableCell>
                            <TableCell>{value.sanPham.tenSp}</TableCell>
                            <TableCell>
                              {value.sanPham.giaSmall === value.sanPham.giaBig
                                ? formatCurrency(value.sanPham.giaSmall)
                                : `${formatCurrency(value.sanPham.giaSmall)} - ${formatCurrency(value.sanPham.giaBig)}`}
                            </TableCell>
                            <TableCell>
                              {value.trangThai === null || value.trangThai === 0 ? (
                                <Chip label="Hoạt động" className="bg-success text-light" />
                              ) : value.trangThai === 1 ? (
                                <Chip label="Chờ giảm giá" className="bg-warning text-light" />
                              ) : (
                                <Chip label="Ngưng hoạt động" className="bg-danger text-light" />
                              )}
                            </TableCell>

                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={right.length}
                  rowsPerPage={rightRowsPerPage}
                  page={rightPage}
                  onPageChange={handleRightPageChange}
                  onRowsPerPageChange={handleRightRowsPerPageChange}
                />
              </Grid>
            </Grid>
            {/* <ModelAddNewGiamGia dataSanPham={chiTietList}/> */}
          </div>
        </div>
      </div>
      {alertContent && (
        <Snackbar
          open
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleSnackbarClose} severity={alertContent.type} sx={{ width: '100%' }}>
            {alertContent.message}
          </Alert>
        </Snackbar>
      )}
      <ModalComfirm open={open} handleClose={handleClose} information={handleSave} title={"Xác nhận thêm"} discription={"Xác nhận thêm giảm giá"} />
    </>
  );
};

export default ModelAddNewGiamGia;
