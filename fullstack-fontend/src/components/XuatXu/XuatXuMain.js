import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { fetchAllXX } from "../../services/XuatXuService";
import ModalAddNew from "../ModalsAddNew";
import ModalConfirm from "./ModalConfirm";
import ModalUpdate from "./ModalUpdate";

const TableXuatXu = (props) => {
  //Set value for table
  const [listXuatXu, setListXuatXu] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isDataXuatXu, setDataXuatXu] = useState({});

  //Set value for Model Add New is defalut
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalDelete(false);
    setIsShowModalUpdate(false);
  };
  // Show Data On Tables
  useEffect(() => {
    getXuatXu(0);
  }, []);

  const getXuatXu = async (page) => {
    let res = await fetchAllXX(page);
    console.log("Data", res);
    if (res && res.content) {
      setListXuatXu(res.content);
      setTotalPages(res.totalPages);
    }
  };

  const handleUpdateTable = (xuatXu) => {
    setListXuatXu([xuatXu, ...listXuatXu]);
    getXuatXu(0);
  };

  //Next Page
  const handlePageClick = (event) => {
    getXuatXu(+event.selected);
  };
  //Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const handleDelete = (maXx) => {
    console.log("Check delete: ", maXx);
    setIsShowModalDelete(true);
    setDataXuatXu(maXx);
  };

  //Update
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
  const handleUpdate = (xuatXu) => {
    setDataXuatXu(xuatXu);
    setIsShowModalUpdate(true);
  };

  console.log(listXuatXu);
  return (
    <>
      <div className="my-3 add-new">
        <samp>List Xuất xứ</samp>
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
            <th>Mã xuất xứ</th>
            <th>Tên nước</th>
            <th>Trạng thái</th>
            <th>Function</th>
          </tr>
        </thead>
        <tbody>
          {listXuatXu &&
            listXuatXu.length > 0 &&
            listXuatXu.map((item, index) => {
              return (
                <tr key={`xuatXu-${index}`}>
                  <td>{item.maXx}</td>
                  <td>{item.tenNuoc}</td>
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
        isDataXuatXu={isDataXuatXu}
        getXuatXu={getXuatXu}
      />

      <ModalUpdate
        show={isShowModalUpdate}
        handleClose={handleClose}
        isDataXuatXu={isDataXuatXu}
        handleUpdateTable={handleUpdateTable}
      />
    </>
  );
};
export default TableXuatXu;
