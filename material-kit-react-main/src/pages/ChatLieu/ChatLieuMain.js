import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { fetchAllCL } from "../../services/ChatLieuService";
import ModalAddNew from "./ModalAddNew";
import ModalConfirm from "./ModalConfirm";
import ModalUpdate from "./ModalUpdate";

const TableChatLieu = (props) => {
  //Set value for table
  const [listChatLieu, setListChatLieu] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isDataChatLieu, setDataChatLieu] = useState({});

  //Set value for Model Add New is defalut
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalDelete(false);
    setIsShowModalUpdate(false);
  };
  // Show Data On Tables
  useEffect(() => {
    getChatLieu(0);
  }, []);

  const getChatLieu = async (page) => {
    let res = await fetchAllCL(page);
    console.log("Data", res);
    if (res && res.content) {
      setListChatLieu(res.content);
      setTotalPages(res.totalPages);
    }
  };

  const handleUpdateTable = (chatLieu) => {
    setListChatLieu([chatLieu, ...listChatLieu]);
    getChatLieu(0);
  };

  //Next Page
  const handlePageClick = (event) => {
    getChatLieu(+event.selected);
  };
  //Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const handleDelete = (maCl) => {
    console.log("Check delete: ", maCl);
    setIsShowModalDelete(true);
    setDataChatLieu(maCl);
  };

  //Update
  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
  const handleUpdate = (chatLieu) => {
    setDataChatLieu(chatLieu);
    setIsShowModalUpdate(true);
  };

  console.log(listChatLieu);
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
            <th>Mã chất liệu</th>
            <th>Tên chất liệu</th>
            <th>Trạng thái</th>
            <th>Function</th>
          </tr>
        </thead>
        <tbody>
          {listChatLieu &&
            listChatLieu.length > 0 &&
            listChatLieu.map((item, index) => {
              return (
                <tr key={`chatLieu-${index}`}>
                  <td>{item.maCl}</td>
                  <td>{item.tenCl}</td>
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
        isDataChatLieu={isDataChatLieu}
        getChatLieu={getChatLieu}
      />

      <ModalUpdate
        show={isShowModalUpdate}
        handleClose={handleClose}
        isDataChatLieu={isDataChatLieu}
        handleUpdateTable={handleUpdateTable}
      />
    </>
  );
};
export default TableChatLieu;
