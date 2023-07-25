import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { fetchAllCoAo } from "../../services/LoaiCoAoService";
import ModalAddNew from "./ModalAddNew";
import ModalConfirm from "./ModalConfirm";
import ModalUpdate from "./ModalUpdate";

const TableCoAo = (props) => {
  //Set value for table
  const [listCoAo, setListCoAo] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isDataCoAo, setDataCoAo] = useState({});

  //Set value for Model Add New is defalut
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalDelete(false);
    setIsShowModalUpdate(false);
  };
  // Show Data On Tables
  useEffect(() => {
    getCoAo(0);
  }, []);

  const getCoAo = async (page) => {
    let res = await fetchAllCoAo(page);
    console.log("Data", res);
    if (res && res.content) {
      setListCoAo(res.content);
      setTotalPages(res.totalPages);
    }
  };

  const handleUpdateTable = (coAo) => {
    setListCoAo([coAo, ...listCoAo]);
    getCoAo(0);
  };

  //Next Page
  const handlePageClick = (event) => {
    getCoAo(+event.selected);
  };
  //Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const handleDelete = (maCoAo) => {
    console.log("Check delete: ", maCoAo);
    setIsShowModalDelete(true);
    setDataCoAo(maCoAo);
  };

  //Update
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
  const handleUpdate = (coAo) => {
    setDataCoAo(coAo);
    setIsShowModalUpdate(true);
  };

  console.log(listCoAo);
  return (
    <>
      <div className="my-3 add-new">
        <samp>Chất liệu</samp>
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
            <th>Mã cổ áo</th>
            <th>Loại cổ áo</th>
            <th>Trạng thái</th>
            <th>Function</th>
          </tr>
        </thead>
        <tbody>
          {listCoAo &&
            listCoAo.length > 0 &&
            listCoAo.map((item, index) => {
              return (
                <tr key={`coAo-${index}`}>
                  <td>{item.maCoAo}</td>
                  <td>{item.loaiCoAo}</td>
                  <td>{item.trangThai === 1 ? "Còn" : "Hết"}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-warning"
                      onClick={() => handleUpdate(item)}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      type="button"
                      className="btn btn-outline-danger mx-3"
                    >
                      Delete
                    </button>{" "}
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
        isDataCoAo={isDataCoAo}
        getCoAo={getCoAo}
      />

      <ModalUpdate
        show={isShowModalUpdate}
        handleClose={handleClose}
        isDataCoAo={isDataCoAo}
        handleUpdateTable={handleUpdateTable}
      />
    </>
  );
};
export default TableCoAo;
