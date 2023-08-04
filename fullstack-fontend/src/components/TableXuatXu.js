import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { fetchAllXX } from "../services/XuatXuService";
import ModelAddNew from "./ModalsAddNew";
import ModelConfirm from "./ModelConfirm";

const TableXuatXu = (props) => {
  //Set value for table
  const [listXuatXu, setListXuatXu] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  //Set value for Model Add New is defalut
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalDelete(false);
  };
  // Show Data On Tables
  useEffect(() => {
    getXanXuat(0);
  }, []);

  const getXanXuat = async (page) => {
    let res = await fetchAllXX(page);
    console.log("Data", res);
    if (res && res.content) {
      setListXuatXu(res.content);
      console.log("Data", res);
      setTotalPages(res.totalPages);
    }
  };
  //Next Page
  const handlePageClick = (event) => {
    getXanXuat(+event.selected);
  };
  //Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isDataXuatXu, setDataXuatXu] = useState({});
  const handleDelete = (maXx) => {
    console.log("Check delete: ", maXx);
    setIsShowModalDelete(true);
    setDataXuatXu(maXx);
  };

  console.log(listXuatXu);
  return (
    <>
      <div className="my-3 add-new">
        <samp>List Xuat Xu</samp>
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
            <th>Ma Xuat Xu</th>
            <th>Ten Nuoc</th>
            <th>Tinh Trang</th>
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
                  <td>{item.tinhTrang === 0 ? "Con" : "Het"}</td>
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
      <ModelAddNew show={isShowModalAddNew} handleClose={handleClose} />
      <ModelConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        isDataXuatXu={isDataXuatXu}
        getXanXuat={getXanXuat}
      />
    </>
  );
};
export default TableXuatXu;
