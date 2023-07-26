import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { chucVu } from "../services/chucVuService";
import ModalsAddChucVu from "./ModalsAddChucVu";
// import ModelConfirm from "./ModelConfirm";

const TableChucVu = (props) => {
  //Set value for table
  const [listChucVu, setListChucVu] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  //Set value for Model Add New is defalut
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalDelete(false);
  };
  // Show Data On Tables
  useEffect(() => {
    getChucVu(0);
  }, []);

  const getChucVu = async (page) => {
    let res = await chucVu(page);
    console.log("Data", res);
    if (res && res.content) {
      setListChucVu(res.content);
      console.log("Data", res);
      setTotalPages(res.totalPages);
    }
  };
  //Next Page
  const handlePageClick = (event) => {
    getChucVu(+event.selected);
  };
  //Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isDataChucVu, setDataChucVu] = useState({});
  const handleDelete = (maCv) => {
    console.log("Check delete: ", maCv);
    setIsShowModalDelete(true);
    setDataChucVu(maCv);
  };

  console.log(listChucVu);
  return (
    <>
      <div className="my-3 add-new">
        <samp>List Chuc Vu</samp>
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
            <th>Ma Chuc Vu</th>
            <th>Tên Chức Vụ</th>
            <th>Ngày Tạo</th>
            <th>Trạng Thái</th>
            <th>Function</th>
          </tr>
        </thead>
        <tbody>
          {listChucVu &&
            listChucVu.length > 0 &&
            listChucVu.map((item, index) => {
              return (
                <tr key={`ChucVu-${index}`}>
                  <td>{item.maCv}</td>
                  <td>{item.tenCv}</td>
                  <td>{item.ngayTao}</td>
                  <td>{item.trangThai === 0 ? "Con" : "Het"}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(item)}
                      type="button"
                      className="btn btn-outline-danger"
                    >
                      Delete
                    </button>{" "}
                    <button type="button" className="btn btn-outline-warning">
                      Update
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
      <ModalsAddChucVu show={isShowModalAddNew} handleClose={handleClose} />
      {/* <ModelConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        isDataChucVu={isDataChucVu}
        getXanXuat={getChucVu}
      /> */}
    </>
  );
};
export default TableChucVu;
