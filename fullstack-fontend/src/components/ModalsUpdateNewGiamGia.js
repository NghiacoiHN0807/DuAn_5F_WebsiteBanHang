import * as React from 'react';
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { add, addGiamGia, getAllSanPham, getCtspByIdSp, getIdGiamGia, getImgByIdSp, update, updateGiamGia } from "../services/giamGiaService";
import "../scss/GiamGiaAdd.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Checkbox, Chip, Grid, Paper, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import { Col, Image, Table } from 'react-bootstrap';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

const ModelUpdateNewGiamGia = (props) => {

  const { listGiamGia } = props;

  console.log(listGiamGia);

  const { id } = useParams();

  // const { show, handleClose, isDataGiamGia, getGiamGia } = props;
  // console.log(dataSanPham)
  let navigate = useNavigate();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);
  const [leftPage, setLeftPage] = React.useState(0);
  const [leftRowsPerPage, setLeftRowsPerPage] = React.useState(5);
  const [rightPage, setRightPage] = React.useState(0);
  const [rightRowsPerPage, setRightRowsPerPage] = React.useState(5);
  const [chiTietList, setchiTietList] = React.useState([]);
  const [image, setImage] = useState([]);

  const getAllSp = async () => {
    try {
      let res = await getAllSanPham();
      setLeft(res);

      // Tạo một danh sách tạm thời để lưu hình ảnh
      const tempImages = [];

      // Tải hình ảnh cho từng sản phẩm và lưu vào danh sách tạm thời
      for (let index = 0; index < res.length; index++) {
        let resImg = await getImgByIdSp(res[index].idSp);
        if (resImg && resImg.length > 0) {
          tempImages.push(resImg[0].images);
        }
      }

      // Cập nhật danh sách hình ảnh sau khi đã tải xong
      setImage(tempImages);
    } catch (error) {
      console.error('Error loading images:', error);
    }
  }

  console.log("Img: ", image)

  React.useEffect(() => {
    getAllSp();
  }, [])

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
    console.log([...chiTietList, ...leftChecked])
  };
  console.log(chiTietList)


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
    if (!price) return "0";

    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });

    return formatter.format(price);
  }


  const [giamGia, setGiamGia] = useState({
    maGiamGia: '',
    tenChuongTrinh: '',
    ngayBatDau: '',
    ngayKetThuc: '',
    mucGiamPhanTram: null,
    mucGiamTienMat: null,
    trangThai: 0,
  });



  const { maGiamGia, tenChuongTrinh, mucGiamPhanTram, mucGiamTienMat } = giamGia;

  const onInputChange = (e) => {
    setGiamGia({ ...giamGia, [e.target.name]: e.target.value });
  };

  const [selected, setSelected] = useState("");
  const changeHandler = e => {
    setSelected(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!maGiamGia.trim() || !tenChuongTrinh.trim() || !ngayBatDau || !ngayKetThuc) {
      toast.warning('Vui lòng nhập đầy đủ thông tin chương trình giảm giá.');
      return;
    }

    if (!selected) {
      toast.warning('Vui lòng chọn loại giảm giá.');
      return;
    }

    if (selected === 'phanTram' && (!mucGiamPhanTram || isNaN(mucGiamPhanTram) || mucGiamPhanTram < 1 || mucGiamPhanTram > 50)) {
      toast.warning('Vui lòng nhập mức giảm phần trăm hợp lệ (1-50).');
      return;
    }

    if (selected === 'mucGiam' && (!mucGiamTienMat || isNaN(mucGiamTienMat))) {
      toast.warning('Vui lòng nhập mức giảm tiền mặt hợp lệ.');
      return;
    }

    if (chiTietList.length === 0) {
      toast.warning('Vui lòng chọn ít nhất một sản phẩm để áp dụng giảm giá.');
      return;
    }

    const checkDateValidity = () => {
      if (ngayKetThuc.isBefore(ngayBatDau)) {
        return false;
      } else {
        return true;
      }
    };

    if (!checkDateValidity()) {
      toast.warning('Ngày kết thúc phải sau ngày bắt đầu.');
      return;
    }
    
    try {
      const selectedDate = dayjs(ngayBatDau);
      const ngay = selectedDate.format('YYYY-MM-DDTHH:mm:ss');
      const selectedDatekt = dayjs(ngayKetThuc);
      const ngaykt = selectedDatekt.format('YYYY-MM-DDTHH:mm:ss');
      
      const giaGiaAa = {
        maGiamGia: giamGia.maGiamGia,
        tenChuongTrinh: giamGia.tenChuongTrinh,
        ngayBatDau: ngay,
        ngayKetThuc: ngaykt,
        mucGiamPhanTram: giamGia.mucGiamPhanTram,
        mucGiamTienMat: giamGia.mucGiamTienMat,
        trangThai: 0,
      }
      

      const idGg = await getIdGiamGia(id);
      // Gọi hàm thêm giảm giá với danh sách sản phẩm
      const response = await addGiamGia(giamGia);

      // console.log(chiTietList.length);
      for (let index = 0; index < chiTietList.length; index++) {
        const chiTietSanPham = await getCtspByIdSp(chiTietList[index].sanPham.idSp);
        for (let i = 0; i < chiTietSanPham.length; i++) {
          let soTienConLai = 0;

          if (giamGia.mucGiamPhanTram !== null) {
            // Nếu mucGiamPhanTram không null, tính số tiền còn lại dựa trên phần trăm giảm
            const mucGiam = giamGia.mucGiamPhanTram / 100;
            soTienConLai = chiTietList[index].sanPham.giaBan * (1 - mucGiam);
          } else {
            // Nếu mucGiamPhanTram là null, số tiền còn lại bằng giá tiền mặt giảm
            soTienConLai = chiTietList[index].sanPham.giaBan - giamGia.mucGiamTienMat;
          }
          const giamGiaChiTietOk = {
            idCtsp: chiTietSanPham[i],
            idGiamGia: response.data,
            donGia: chiTietList[index].sanPham.giaBan,
            soTienConLai: soTienConLai,
            trangThai: 0
          }
          await update(giamGiaChiTietOk, id);
        }
      }

      console.log(response);
      if (response.status === 'Ok!') {
        navigate('/quan-ly-giam-gia');
        toast.success('Chỉnh sửa thành công!');
      } else {
        toast.error('Chỉnh sửa không thành công!');
      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi chỉnh sửa giảm giá.');
    }
  };
  // if (!giamGiaData) {
  //   return <div>Loading...</div>;
  // }
  const todayAtNoon = dayjs().set('hour', 12).startOf('hour');
  const todayAt9AM = dayjs().set('hour', 9).startOf('hour');
  const [ngayBatDau, setNgayBatDau] = useState(dayjs().set('hour', 12).startOf('hour'));
  const [ngayKetThuc, setNgayKetThuc] = useState(dayjs().set('hour', 12).startOf('hour'));

  return (
    <>
      <Modal.Header>
        <Modal.Title className='text-center m-25 w-100 text-uppercase'>Chỉnh sửa chương trình giảm giá</Modal.Title>
      </Modal.Header>
      <div className="d-flex justify-content-around">
        <div className="content-left">
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
                    name='maGiamGia'
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
                    name='tenChuongTrinh'
                    value={tenChuongTrinh}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Thiết lập giảm giá</label>
                  <div>
                    <div className="form-check">
                      <input className="form-check-input" onChange={(e) => changeHandler(e)} type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={"mucGiam"} checked={selected === "mucGiam"} />
                      <label className="form-check-label">
                        Mức giảm
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" onChange={(e) => changeHandler(e)} type="radio" name="flexRadioDefault" id="flexRadioDefault2" value={"phanTram"} checked={selected === "phanTram"} />
                      <label className="form-check-label">
                        Theo %
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-3" aria-hidden={selected !== "phanTram"}>
                  <TextField
                    multiline
                    maxRows={4}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    label="Mức giảm %"
                    name='mucGiamPhanTram'
                    value={mucGiamPhanTram}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>

                <div className="mb-3" aria-hidden={selected !== "mucGiam"}>
                  <TextField
                    multiline
                    maxRows={4}
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    label="Mức giảm tiền mặt"
                    name='mucGiamTienMat'
                    value={mucGiamTienMat}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Ngày bắt đầu</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                      <DemoItem>
                        <DateTimePicker
                          defaultValue={todayAtNoon}
                          minDateTime={todayAt9AM}
                          name='ngayBatDau'
                          value={ngayBatDau}
                          onChange={(newDate) => setNgayBatDau(newDate)}
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Ngày kết thúc</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                      <DemoItem>
                        <DateTimePicker
                          defaultValue={todayAtNoon}
                          minDateTime={todayAt9AM}
                          name='ngayKetThuc'
                          value={ngayKetThuc}
                          onChange={(newDate) => setNgayKetThuc(newDate)}
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                </div>

                <button onClick={(e) => handleSave(e)} className="btn bg-primary text-light d-flex align-items-end">Chỉnh sửa</button>
              </form>
            </div>
          </Modal.Body>
        </div>

        <div className="content-right">
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
                        {/* <TableCell>Ảnh</TableCell> */}
                        <TableCell>Mã</TableCell>
                        <TableCell>Tên sản phẩm</TableCell>
                        <TableCell>Trạng thái</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {left.slice(leftPage * leftRowsPerPage, leftPage * leftRowsPerPage + leftRowsPerPage).map((value, index) =>
                      (
                        <TableRow key={`left_${value.sanPham.idSp}`} onClick={handleToggle(value, true)}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              value={value.sanPham.idSp}
                              checked={checked.indexOf(value) !== -1}

                            />
                          </TableCell>
                          <TableCell>{index + 1}</TableCell>
                          {/* <TableCell>
                            <Col xs={6} md={4}>
                              <Image
                                rounded
                                style={{ width: "150px", height: "auto" }}
                                src={image[index]}
                                alt={`Ảnh sản phẩm ${value.maSp}`}
                              />
                            </Col>
                          </TableCell> */}
                          <TableCell>{value.sanPham.maSp}</TableCell>
                          <TableCell>{value.sanPham.tenSp}</TableCell>
                          <TableCell>{value.sanPham.trangThai === 0 ? <Chip label="Hoạt động" className="bg-success text-light" /> : <Chip label="Ngưng hoạt động" className="bg-danger text-light" />}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={left.length}
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
                        <TableCell padding="checkbox">
                        </TableCell>
                        <TableCell>STT</TableCell>
                        <TableCell>Ảnh sản phẩm</TableCell>
                        <TableCell>Mã sản phẩm</TableCell>
                        <TableCell>Tên sản phẩm</TableCell>
                        <TableCell>Giá sản phẩm</TableCell>
                        <TableCell>Trạng thái</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {right.slice(rightPage * rightRowsPerPage, rightPage * rightRowsPerPage + rightRowsPerPage).map((value, index) => (
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
                                style={{ width: "150px", height: "auto" }}
                                src={value.url_image}
                                alt={`Ảnh sản phẩm ${value.maSp}`}
                              />
                            </Col>
                          </TableCell>
                          <TableCell>{value.sanPham.maSp}</TableCell>
                          <TableCell>{value.sanPham.tenSp}</TableCell>
                          <TableCell>{formatCurrency(value.sanPham.giaBan)}</TableCell>
                          <TableCell>{value.sanPham.trangThai === 0 ? <Chip label="Hoạt động" className="bg-success text-light" /> : <Chip label="Ngưng hoạt động" className="bg-danger text-light" />}</TableCell>
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
    </>
  );
};

export default ModelUpdateNewGiamGia;
