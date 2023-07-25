import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import ModelAddNewGiamGia from "./ModalsAddNewGiamGia";
import ModelConfirmGiamGia from "./ModelConfirmGiamGia";
import { getAll } from '../services/giamGiaService'

const TableGiamGia = (props) => {
  //Set value for table
  const [listGiamGia, setListGiamGia] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  //Set value for Model Add New is defalut
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalDelete(false);
  };
  // Show Data On Tables
  useEffect(() => {
    getGiamGia(0, 5, 0);
  }, []);

  const getGiamGia = async (page, size, trangThai) => {
    let res = await getAll(page, size, trangThai);
    console.log(res.content)
    if (res && res.content) {
      setListGiamGia(res.content);
      setTotalPages(res.totalPages);
    }
  };
  //Next Page
  const handlePageClick = (event) => {
    getGiamGia(+event.selected, 5, 0);
  };
  //Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isDataGiamGia, setDataGiamGia] = useState({});
  const handleDelete = (id) => {
    setIsShowModalDelete(true);
    setDataGiamGia(id);
  };

  return (
    <>
      <div className="my-3 add-new">
        <samp>List Giam Gia</samp>
        <button
          className="btn btn-success"
          onClick={() => setIsShowModalAddNew(true)}
        >
          Them
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">#</th>
            {/* <th scope="col">Mã chương trình</th> */}
            <th scope="col">Tên chương trình</th>
            <th scope="col">Loại sản phẩm áp dụng</th>
            <th scope="col">Kiểu giảm giá</th>
            <th scope="col">Mức giảm giá</th>
            <th scope="col">Thời gian</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listGiamGia &&
            listGiamGia.length > 0 &&
            listGiamGia.map((item, index) => {
              return (
                <tr key={item.idGiamGia}>
                  <th scope="row">{index + 1}</th>
                  {/* <td>{item.maGiamGia}</td> */}
                  <td>{item.idGiamGia.tenChuongTrinh}</td>
                  <td>{item.idCtsp.isLsp.tenLsp}</td>
                  <td>{item.idGiamGia.mucGiamPhanTram === null ? "Tiền mặt" : "Phần trăm"}</td>
                  <td>{item.idGiamGia.mucGiamTienMat === null ? item.idGiamGia.mucGiamPhanTram : item.idGiamGia.mucGiamTienMat}</td>
                  <td>{item.idGiamGia.ngayBatDau + " - " + item.idGiamGia.ngayKetThuc}</td>
                  <td>{item.trangThai === 0 ? 'Hoạt động' : 'Ngưng hoạt động'}</td>
                  <td>
                    <button  className='btn btn-outline-primary mx-2'>Update</button>
                    <button onClick={() => handleDelete(item)} className='btn btn-danger mx-2'>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        //Class form
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      {/* Add Model */}
      <ModelAddNewGiamGia show={isShowModalAddNew} handleClose={handleClose} />
      <ModelConfirmGiamGia
        show={isShowModalDelete}
        handleClose={handleClose}
        isDataGiamGia={isDataGiamGia}
        getGiamGia={getGiamGia}
      />
    </>
  );
};
export default TableGiamGia;
