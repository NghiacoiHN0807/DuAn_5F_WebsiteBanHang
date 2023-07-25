import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { fetchAllLSP } from "../../services/LoaiSPService";
import ModalAddNew from "./ModalAddNew";
import ModalConfirm from "./ModalConfirm";
import ModalUpdate from "./ModalUpdate";

const TableLoaiSP = (props) => {
  //Set value for table
  const [listLoaiSP, setListLoaiSP] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isDataLoaiSP, setDataLoaiSP] = useState({});

  //Set value for Model Add New is defalut
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalDelete(false);
    setIsShowModalUpdate(false);
  };
  // Show Data On Tables
  useEffect(() => {
    getLoaiSP(0);
  }, []);

  const getLoaiSP = async (page) => {
    let res = await fetchAllLSP(page);
    console.log("Data", res);
    if (res && res.content) {
      setListLoaiSP(res.content);
      setTotalPages(res.totalPages);
    }
  };

  const handleUpdateTable = (loaiSP) => {
    setListLoaiSP([loaiSP, ...listLoaiSP]);
    getLoaiSP(0);
  };

  //Next Page
  const handlePageClick = (event) => {
    getLoaiSP(+event.selected);
  };
  //Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const handleDelete = (maLsp) => {
    console.log("Check delete: ", maLsp);
    setIsShowModalDelete(true);
    setDataLoaiSP(maLsp);
  };

  //Update
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
  const handleUpdate = (loaiSP) => {
    setDataLoaiSP(loaiSP);
    setIsShowModalUpdate(true);
  };

  console.log(listLoaiSP);
  return (
    <>
      <div className="my-3 add-new">
        <samp>List loại sản phẩm</samp>
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
            <th>Mã loại sản phẩm</th>
            <th>Tên loại sản phẩm</th>
            <th>Trạng thái</th>
            <th>Function</th>
          </tr>
        </thead>
        <tbody>
          {listLoaiSP &&
            listLoaiSP.length > 0 &&
            listLoaiSP.map((item, index) => {
              return (
                <tr key={`loaiSP-${index}`}>
                  <td>{item.maLsp}</td>
                  <td>{item.tenLsp}</td>
                  <td>{item.trangThai === 1 ? "Còn" : "Hết"}</td>
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
        isDataLoaiSP={isDataLoaiSP}
        getLoaiSP={getLoaiSP}
      />

      <ModalUpdate
        show={isShowModalUpdate}
        handleClose={handleClose}
        isDataLoaiSP={isDataLoaiSP}
        handleUpdateTable={handleUpdateTable}
      />
    </>
  );
};
export default TableLoaiSP;
