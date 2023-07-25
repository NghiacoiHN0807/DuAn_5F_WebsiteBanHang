import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { fetchAllTayAo } from "../../services/OngTayAoService";
import ModalAddNew from "./ModalAddNew";
import ModalConfirm from "./ModalConfirm";
import ModalUpdate from "./ModalUpdate";

const TableTayAo = (props) => {
  //Set value for table
  const [listTayAo, setListTayAo] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isDataTayAo, setDataTayAo] = useState({});

  //Set value for Model Add New is defalut
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalDelete(false);
    setIsShowModalUpdate(false);
  };
  // Show Data On Tables
  useEffect(() => {
    getTayAo(0);
  }, []);

  const getTayAo = async (page) => {
    let res = await fetchAllTayAo(page);
    console.log("Data", res);
    if (res && res.content) {
      setListTayAo(res.content);
      setTotalPages(res.totalPages);
    }
  };

  const handleUpdateTable = (tayAo) => {
    setListTayAo([tayAo, ...listTayAo]);
    getTayAo(0);
  };

  //Next Page
  const handlePageClick = (event) => {
    getTayAo(+event.selected);
  };
  //Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const handleDelete = (maTayAo) => {
    console.log("Check delete: ", maTayAo);
    setIsShowModalDelete(true);
    setDataTayAo(maTayAo);
  };

  //Update
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
  const handleUpdate = (tayAo) => {
    setDataTayAo(tayAo);
    setIsShowModalUpdate(true);
  };

  console.log(listTayAo);
  return (
    <>
      <div className="my-3 add-new">
        <samp>List Tay Áo</samp>
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
            <th>Loại tay áo</th>
            <th>Trạng thái</th>
            <th>Function</th>
          </tr>
        </thead>
        <tbody>
          {listTayAo &&
            listTayAo.length > 0 &&
            listTayAo.map((item, index) => {
              return (
                <tr key={`tayAo-${index}`}>
                  <td>{item.maTayAo}</td>
                  <td>{item.loaiTayAo}</td>
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
        isDataTayAo={isDataTayAo}
        getTayAo={getTayAo}
      />

      <ModalUpdate
        show={isShowModalUpdate}
        handleClose={handleClose}
        isDataTayAo={isDataTayAo}
        handleUpdateTable={handleUpdateTable}
      />
    </>
  );
};
export default TableTayAo;
