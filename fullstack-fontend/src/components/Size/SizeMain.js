import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { fetchAllSize } from "../../services/SizeService";
import ModalAddNew from "./ModalAddNew";
import ModalConfirm from "./ModalConfirm";
import ModalUpdate from "./ModalUpdate";

const TableSize = (props) => {
  //Set value for table
  const [listSize, setListSize] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isDataSize, setDataSize] = useState({});

  //Set value for Model Add New is defalut
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalDelete(false);
    setIsShowModalUpdate(false);
  };
  // Show Data On Tables
  useEffect(() => {
    getSize(0);
  }, []);

  const getSize = async (page) => {
    let res = await fetchAllSize(page);
    console.log("Data", res);
    if (res && res.content) {
      setListSize(res.content);
      setTotalPages(res.totalPages);
    }
  };

  const handleUpdateTable = (size) => {
    setListSize([size, ...listSize]);
    getSize(0);
  };

  //Next Page
  const handlePageClick = (event) => {
    getSize(+event.selected);
  };
  //Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const handleDelete = (maSize) => {
    console.log("Check delete: ", maSize);
    setIsShowModalDelete(true);
    setDataSize(maSize);
  };

  //Update
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
  const handleUpdate = (size) => {
    setDataSize(size);
    setIsShowModalUpdate(true);
  };

  console.log(listSize);
  return (
    <>
      <div className="my-3 add-new">
        <samp>List Size</samp>
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
            <th>Mã</th>
            <th>Size</th>
            <th>Trạng thái</th>
            <th>Function</th>
          </tr>
        </thead>
        <tbody>
          {listSize &&
            listSize.length > 0 &&
            listSize.map((item, index) => {
              return (
                <tr key={`size-${index}`}>
                  <td>{item.maSize}</td>
                  <td>{item.tenSize}</td>
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
        isDataSize={isDataSize}
        getSize={getSize}
      />

      <ModalUpdate
        show={isShowModalUpdate}
        handleClose={handleClose}
        isDataSize={isDataSize}
        handleUpdateTable={handleUpdateTable}
      />
    </>
  );
};
export default TableSize;
