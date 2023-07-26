import {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import {taiKhoan, taiKhoan2} from "../services/taiKhoanService";
import ModelAddNewTKNV from "./ModelAddNewTKNV";
import ModelConfirmTKNV from "./ModelConfirmTKNV";
import ModalUpdate from "./ModelUpdateTKNV";
import { Form } from "react-bootstrap";

const TableTaiKhoanKH = (props) => {

    //Set value for table
    const [listTaiKhoanKH, setlistTaiKhoanKH] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    //Set value for Model Add New is defalut
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalDelete(false);
        setIsShowModalUpdate(false);
    };
    // Show Data On Tables
    useEffect(() => {
        getTaiKhoanKH(0);
    }, []);

    const getTaiKhoanKH = async (page) => {
        let res = await taiKhoan(page);
        // console.log("Data", res);
        if (res && res.content) {
            setlistTaiKhoanKH(res.content);
            // console.log("Data", res);
            setTotalPages(res.totalPages);
        }
    };
    //Next Page
    const handlePageClick = (event) => {
        getTaiKhoanKH(+event.selected);
    };
    //Delete
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [isDataTaiKhoanKH, setDataTaiKhoanKH] = useState({});
    const handleDelete = (maTKKH) => {
        // console.log("Check delete: ", maTKKH);
        setIsShowModalDelete(true);
        setDataTaiKhoanKH(maTKKH);
    };

    const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);


    const handleUpdateTable = (taiKhoanKH) => {
        setlistTaiKhoanKH([taiKhoanKH, ...listTaiKhoanKH]);
        getTaiKhoanKH(0);
    };


    const handleUpdate = (taiKhoanKH) => {
        setDataTaiKhoanKH(taiKhoanKH);
        setIsShowModalUpdate(true);
    };

    const [searchKeyword, setSearchKeyword] = useState("");

    const [total, setTrangThai] = useState(0);


  const hi = async (e) => {
    const value = e.target.value;
    setTrangThai(value);
    if (value === "1") {
      let res = await taiKhoan(0);
      setlistTaiKhoanKH(res.content);
      setTotalPages(res.totalPages);
    } else if (value === "2") {
      let res = await taiKhoan2(0, 0);
      setlistTaiKhoanKH(res.content);
      setTotalPages(res.totalPages);
    } else if (value === "3") {
      let res = await taiKhoan2(0, 1);
      setlistTaiKhoanKH(res.content);
      setTotalPages(res.totalPages);
    }
  };
    // console.log(listTaiKhoanKH);
    return (
        <>
            <div className="my-3 add-new">
                <samp>List Tai Khoan NV</samp>
                <button
                    className="btn btn-success"
                    onClick={() => setIsShowModalAddNew(true)}
                >
                    ADD New Tai Khoan
                </button>
            </div>
            
      <div>
        <form className="d-flex" role="search">
          <input onChange={(e) => setSearchKeyword(e.target.value)} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
      <div className="d-flex justify-content-between">

        <div className="d-flex">
          <div className="d-flex align-items-center">
            <label>Trạng thái</label>
            <Form.Select onChange={(e) => hi(e)} aria-label="Default select example"  className="m-3">
              <option value="1">Tất cả</option>
              <option value="2">Hoạt động</option>
              <option value="3">Ngưng hoạt động</option>
            </Form.Select>
          </div>
          
        </div>
        
      </div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Ma Tai Khoan</th>
                    {/* <th>Tên Chức Vụ</th> */}
                    <th>Ho Ten</th>
                    
                    <th>SDT</th>
                    <th>Email</th>
                    {/*<th>Mat Khau</th>*/}
                    <th>Trang Thai</th>
                    <th>Function</th>
                </tr>
                </thead>
                <tbody>
                {listTaiKhoanKH &&
                    listTaiKhoanKH.length > 0 &&
                    listTaiKhoanKH.filter((item) =>
                    Object.values(item).some((value) =>
                      String(value)
                        .toLowerCase()
                        .includes(searchKeyword.toLowerCase())
                    )
                  ).map((item, index) => {
                        return (
                            <tr key={`xuatXu-${index}`}>
                                <td>{item.maTaiKhoan}</td>
                                {/* <td>{item.idChucVu}</td> */}
                                <td>{item.ho} {item.ten}</td>
                                <td>{item.sdt}</td>
                                <td>{item.email}</td>
                                {/*<td>{item.matKhau}</td>*/}
                                <td>{item.trangThai === 1 ? 'Hoat Dong' : 'Ngung Hoat Dong'}</td>
                                <td>
                                    <button onClick={() => handleDelete(item)}
                                            type="button"
                                            className="btn btn-outline-danger">
                                        Delete
                                    </button>
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
            <ModelAddNewTKNV
                show={isShowModalAddNew}
                handleClose={handleClose}/>
            <ModelConfirmTKNV
                show={isShowModalDelete}
                handleClose={handleClose}
                isDataTaiKhoanKH={isDataTaiKhoanKH}
                getTaiKhoanKH={getTaiKhoanKH}
            />
            <ModalUpdate
                show={isShowModalUpdate}
                handleClose={handleClose}
                isDataTaiKhoanKH={isDataTaiKhoanKH}
                handleUpdateTable={handleUpdateTable}
            />

        </>
    );
};
export default TableTaiKhoanKH;
