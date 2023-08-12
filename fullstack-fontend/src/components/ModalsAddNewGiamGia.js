import * as React from 'react';
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { add, addGiamGia, getAllSanPham, getCtspByIdSp } from "../services/giamGiaService";
import "../scss/GiamGiaAdd.scss";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Chip, Grid, Paper, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { Table } from 'react-bootstrap';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

const ModelAddNewGiamGia = (props) => {
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

  const getAllSp = async () => {
    let res = await getAllSanPham();
    setLeft(res);
  }

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

  

  const { maGiamGia, tenChuongTrinh, ngayBatDau, ngayKetThuc, mucGiamPhanTram, mucGiamTienMat } = giamGia;

  const onInputChange = (e) => {
    setGiamGia({ ...giamGia, [e.target.name]: e.target.value });
  };

  const [selected, setSelected] = useState("");
  const changeHandler = e => {
    setSelected(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (
      giamGia.tenChuongTrinh.trim().length < 1 ||
      giamGia.ngayBatDau.trim().length < 1 ||
      giamGia.ngayKetThuc.trim().length < 1 ||
      chiTietList.length === 0 // Kiểm tra danh sách sản phẩm
    ) {
      toast.warning('Data is null!');
    } else {
      try {
        // Gọi hàm thêm giảm giá với danh sách sản phẩm
        const response = await addGiamGia(giamGia);

        // console.log(chiTietList.length);
        for (let index = 0; index < chiTietList.length; index++) {
          const chiTietSanPham = await getCtspByIdSp(chiTietList[index].idSp);
          for (let i = 0; i < chiTietSanPham.length; i++) {
            let soTienConLai = 0;
          
            if (giamGia.mucGiamPhanTram !== null) {
              // Nếu mucGiamPhanTram không null, tính số tiền còn lại dựa trên phần trăm giảm
              const mucGiam = giamGia.mucGiamPhanTram / 100;
              soTienConLai = chiTietList[index].giaBan * (1 - mucGiam);
            } else {
              // Nếu mucGiamPhanTram là null, số tiền còn lại bằng giá tiền mặt giảm
              soTienConLai = chiTietList[index].giaBan - giamGia.mucGiamTienMat;
            }
            const giamGiaChiTietOk = {
              idCtsp: chiTietSanPham[i], 
              idGiamGia: response.data, 
              donGia: chiTietList[index].giaBan, 
              soTienConLai: soTienConLai, 
              trangThai: 0
            }
            await add(giamGiaChiTietOk);
          }
        }

        console.log(response);
        if (response.status === 'Ok!') {
          navigate('/quan-ly-giam-gia');
          toast.success('Thêm thành công!');
        } else {
          toast.error('Thêm không thành công!');
        }
      } catch (error) {
        console.error('Error:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
        }
        toast.error('Đã xảy ra lỗi khi thêm giảm giá.');
      }
    }
  };


  return (
    <>
      <Modal.Header>
        <Modal.Title className='text-center m-25 w-100'>ADD NEW GIAM GIA</Modal.Title>
      </Modal.Header>
      <div className="d-flex justify-content-around">
        <div className="content-left">
          <Modal.Body>
            <div className="body-add-new">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Mã chương trình</label>
                  <input type={'text'} name='maGiamGia' className="form-control" value={maGiamGia} onChange={(e) => onInputChange(e)} id="exampleFormControlInput1" placeholder="Mã chương trình" />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Tên chương trình</label>
                  <input type={'text'} name='tenChuongTrinh' className="form-control" value={tenChuongTrinh} onChange={(e) => onInputChange(e)} id="exampleFormControlInput1" placeholder="Tên chương trình" />
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
                  <label htmlFor="exampleFormControlInput1" className="form-label">Mức giảm %</label>
                  <input type="number" min={0} max={100} name='mucGiamPhanTram' value={mucGiamPhanTram} onChange={(e) => onInputChange(e)} id="exampleFormControlInput1" className="form-control" placeholder="Mức giảm %" />
                </div>

                <div className="mb-3" aria-hidden={selected !== "mucGiam"}>
                  <label htmlFor="exampleFormControlInput1" className="form-label">Mức giảm tiền mặt</label>
                  <input type="number" name='mucGiamTienMat' value={mucGiamTienMat} onChange={(e) => onInputChange(e)} id="exampleFormControlInput1" className="form-control" placeholder="Mức giảm tiền mặt" />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Ngày bắt đầu</label>
                  <input type="date" name='ngayBatDau' value={ngayBatDau} onChange={(e) => onInputChange(e)} id="exampleFormControlInput1" className="form-control" placeholder="Ngày bắt đầu" />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Ngày kết thúc</label>
                  <input type="date" name='ngayKetThuc' value={ngayKetThuc} onChange={(e) => onInputChange(e)} id="exampleFormControlInput1" className="form-control" placeholder="Ngày kết thúc" />
                </div>

                <button onClick={(e) => handleSave(e)} className="btn bg-primary text-light d-flex align-items-end">Thêm</button>
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
                        <TableCell>Mã</TableCell>
                        <TableCell>Tên sản phẩm</TableCell>
                        <TableCell>Trạng thái</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {left.slice(leftPage * leftRowsPerPage, leftPage * leftRowsPerPage + leftRowsPerPage).map((value, index) => (
                        <TableRow key={`left_${value.idSp}`}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              value={value.idSp}
                              checked={checked.indexOf(value) !== -1}
                              onClick={handleToggle(value, true)}
                            />
                          </TableCell>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{value.maSp}</TableCell>
                          <TableCell>{value.tenSp}</TableCell>
                          <TableCell>{value.trangThai === 0 ? <Chip label="Hoạt động" className="bg-success text-light" /> : <Chip label="Ngưng hoạt động" className="bg-danger text-light" />}</TableCell>
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
                          {/* <Checkbox
                                            onClick={handleToggleAll(right)}
                                            checked={numberOfChecked(right) === right.length && right.length !== 0}
                                            indeterminate={numberOfChecked(right) !== right.length && numberOfChecked(right) !== 0}
                                            disabled={right.length === 0}
                                            inputProps={{
                                                'aria-label': 'all items selected',
                                            }}
                                        /> */}
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
                        <TableRow key={`right_${value.idSp}`}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              value={value.idSp}
                              checked={chiTietList.indexOf(value) !== -1} // Sử dụng chiTietList thay vì checked
                              onClick={handleToggle(value, false)} // Đặt isLeft là false để xác định là bảng phải
                            // onChange={handleChange}
                            />
                          </TableCell>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{`Ảnh sản phẩm ${value.maSp}`}</TableCell>
                          <TableCell>{value.maSp}</TableCell>
                          <TableCell>{value.tenSp}</TableCell>
                          <TableCell>{formatCurrency(value.giaBan)}</TableCell>
                          <TableCell>{value.trangThai === 0 ? <Chip label="Hoạt động" className="bg-success text-light" /> : <Chip label="Ngưng hoạt động" className="bg-danger text-light" />}</TableCell>
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

export default ModelAddNewGiamGia;
