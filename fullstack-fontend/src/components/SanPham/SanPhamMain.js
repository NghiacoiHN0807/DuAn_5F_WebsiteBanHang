import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { fetchAllSP } from "../../services/SanPhamService";
import ModalAddNew from "./ModalAddNew";
import ModalConfirm from "./ModalConfirm";
import ModalUpdate from "./ModalUpdate";

const TableSanPham = (props) => {
  //Set value for table
  const [listSanPham, setListSanPham] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isDataSanPham, setDataSanPham] = useState({});

  //Set value for Model Add New is defalut
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalDelete(false);
    setIsShowModalUpdate(false);
  };
  // Show Data On Tables
  useEffect(() => {
    getSanPham(0);
  }, []);

  const getSanPham = async (page) => {
    let res = await fetchAllSP(page);
    console.log("Data", res);
    if (res && res.content) {
      setListSanPham(res.content);
      setTotalPages(res.totalPages);
    }
  };

  const handleUpdateTable = (sanPham) => {
    setListSanPham([sanPham, ...listSanPham]);
    getSanPham(0);
  };

  //Next Page
  const handlePageClick = (event) => {
    getSanPham(+event.selected);
  };
  //Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const handleDelete = (maSp) => {
    console.log("Check delete: ", maSp);
    setIsShowModalDelete(true);
    setDataSanPham(maSp);
  };

  //Update
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
  const handleUpdate = (sanPham) => {
    setDataSanPham(sanPham);
    setIsShowModalUpdate(true);
  };

  console.log(listSanPham);
  return (
    <>
      <div className="my-3 add-new">
        <samp>List sản phẩm</samp>
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
            <th>Mã sản phẩm</th>
            <th>Tên sản phẩm</th>
            <th>Trạng thái</th>
            <th>Function</th>
          </tr>
        </thead>
        <tbody>
          {listSanPham &&
            listSanPham.length > 0 &&
            listSanPham.map((item, index) => {
              return (
                <tr key={`sanPham-${index}`}>
                  <td>{item.maSp}</td>
                  <td>{item.tenSp}</td>
                  <td>{item.trangThai === 1 ? "Con" : "Het"}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(item)}
                      type="button"
                      className="btn btn-outline-danger mx-3"
                    >
                      Delete
                    </button>{" "}
                    <button
                      type="button"
                      className="btn btn-outline-warning"
                      onClick={() => handleUpdate(item)}
                    >
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
      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        isDataSanPham={isDataSanPham}
        getSanPham={getSanPham}
      />

      <ModalUpdate
        show={isShowModalUpdate}
        handleClose={handleClose}
        isDataSanPham={isDataSanPham}
        handleUpdateTable={handleUpdateTable}
      />
    </>
  );
};
export default TableSanPham;
