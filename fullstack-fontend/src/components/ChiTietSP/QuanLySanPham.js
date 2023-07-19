import { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { fetchAllCTSP } from "../../services/ChiTietSPService";
import ModelAddNew from "./CTSPAddForm";
// import ModelConfirm from "../ModelConfirm";

const ChiTietSP = (props) => {
  //Set value for table
  const [listCTSP, setListCTSP] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  //Set value for Model Add New is defalut
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const handleClose = () => {
    setIsShowModalAddNew(false);
    // setIsShowModalDelete(false);
  };
  // Show Data On Tables
  useEffect(() => {
    getCTSP(0);
  }, []);

  const getCTSP = async (page) => {
    let res = await fetchAllCTSP(page);
    console.log("Data", res);
    if (res && res.content) {
      setListCTSP(res.content);
      console.log("Data", res);
      setTotalPages(res.totalPages);
    }
  };

  //Next Page
  const handlePageClick = (event) => {
    getCTSP(+event.selected);
  };
  //Delete
  // const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  // const [isDataCTSP, setDataCTSP] = useState({});
  // const handleDelete = (maCtsp) => {
  //   console.log("Check delete: ", maCtsp);
  //   setIsShowModalDelete(true);
  //   setDataCTSP(maCtsp);
  // };

  console.log(listCTSP);

  return (
    <>
      <div className="my-3 add-new">
        <samp>List CTSP</samp>
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
            <th>Mã CTSP</th>
            <th>Chất liệu</th>
            <th>Màu sắc</th>
            <th>Size</th>
            <th>Sản phẩm</th>
            <th>Loại sản phẩm</th>
            <th>Xuất xứ</th>
            <th>Cổ áo</th>
            <th>Số lượng tồn</th>
            <th>Giá nhập</th>
            <th>Giá bán</th>
            <th>Ảnh</th>
            <th>Trạng thái</th>
            <th>Mô tả</th>
            <th>Function</th>
          </tr>
        </thead>
        <tbody>
          {listCTSP &&
            listCTSP.length > 0 &&
            listCTSP.map((item, index) => {
              return (
                <tr key={`ChiTietSP-${index}`}>
                  <td>{item.maCtsp}</td>
                  <td>{item.idCl.tenCl}</td>
                  <td>{item.idMs.tenMs}</td>
                  <td>{item.idSize.tenSize}</td>
                  <td>{item.idSp.tenSp}</td>
                  <td>{item.idXx.tenNuoc}</td>
                  <td>{item.idTayAo.loaiTayAo}</td>
                  <td>{item.idLoaiCoAo.loaiCoAo}</td>
                  <td>{item.soLuongTon}</td>
                  <td>{item.giaNhap}</td>
                  <td>{item.giaBan}</td>
                  <td>{item.anh}</td>
                  <td>{item.trangThai === 1 ? "Con" : "Het"}</td>
                  <td>{item.moTa}</td>
                  <td>
                    {/* <button
                      onClick={() => handleDelete(item)}
                      type="button"
                      className="btn btn-outline-danger"
                    >
                      Delete
                    </button>{" "} */}
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
      <ModelAddNew
        show={isShowModalAddNew}
        listCTSP={listCTSP}
        handleClose={handleClose}
      />
      {/* <ModelConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        isDataXuatXu={isDataCTSP}
        getXanXuat={getCTSP}
      /> */}
    </>
  );
};
export default ChiTietSP;
