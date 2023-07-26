import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { fetchAllMS } from "../../services/MauSacService";
import ModalAddNew from "./ModalAddNew";
import ModalConfirm from "./ModalConfirm";
import ModalUpdate from "./ModalUpdate";

const TableMauSac = (props) => {
  //Set value for table
  const [listMauSac, setListMauSac] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isDataMauSac, setDataMauSac] = useState({});

  //Set value for Model Add New is defalut
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalDelete(false);
    setIsShowModalUpdate(false);
  };
  // Show Data On Tables
  useEffect(() => {
    getMauSac(0);
  }, []);

  const getMauSac = async (page) => {
    let res = await fetchAllMS(page);
    console.log("Data", res);
    if (res && res.content) {
      setListMauSac(res.content);
      setTotalPages(res.totalPages);
    }
  };

  const handleUpdateTable = (mauSac) => {
    setListMauSac([mauSac, ...listMauSac]);
    getMauSac(0);
  };

  //Next Page
  const handlePageClick = (event) => {
    getMauSac(+event.selected);
  };
  //Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const handleDelete = (maMs) => {
    console.log("Check delete: ", maMs);
    setIsShowModalDelete(true);
    setDataMauSac(maMs);
  };

  //Update
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
  const handleUpdate = (mauSac) => {
    setDataMauSac(mauSac);
    setIsShowModalUpdate(true);
  };

  console.log(listMauSac);
  return (
    <>
      <div className="my-3 add-new">
        <samp>List Màu sắc</samp>
        <button
          className="btn btn-success"
          onClick={() => setIsShowModalAddNew(true)}
        >
          Add
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mã màu sắc</th>
            <th>Tên màu</th>
            <th>Trạng thái</th>
            <th>Function</th>
          </tr>
        </thead>
        <tbody>
          {listMauSac &&
            listMauSac.length > 0 &&
            listMauSac.map((item, index) => {
              return (
                <tr key={`mauSac-${index}`}>
                  <td>{item.maMs}</td>
                  <td>{item.tenMs}</td>
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
        isDataMauSac={isDataMauSac}
        getMauSac={getMauSac}
      />

      <ModalUpdate
        show={isShowModalUpdate}
        handleClose={handleClose}
        isDataMauSac={isDataMauSac}
        handleUpdateTable={handleUpdateTable}
      />
    </>
  );
};
export default TableMauSac;
