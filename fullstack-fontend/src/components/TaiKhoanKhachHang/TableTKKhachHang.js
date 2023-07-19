import {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import {fetchAllTKKH} from "../../services/taiKhoanKhachHangSevice";
import ModalsAddNewTKKH from "./ModalsAddNewTKKH";
import ModelConfirmTKKH from "./ModelConfirmTKKH";

const TableTaiKhoanKH = (props) => {

    //Set value for table
    const [listTaiKhoanKH, setlistTaiKhoanKH] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    //Set value for Model Add New is defalut
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalDelete(false);
    };
    // Show Data On Tables
    useEffect(() => {
        getTaiKhoanKH(0);
    }, []);

    const getTaiKhoanKH = async (page) => {
        let res = await fetchAllTKKH(page);
        console.log("Data", res);
        if (res && res.content) {
            setlistTaiKhoanKH(res.content);
            console.log("Data", res);
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
        console.log("Check delete: ", maTKKH);
        setIsShowModalDelete(true);
        setDataTaiKhoanKH(maTKKH);
    };

    console.log(listTaiKhoanKH);
    return (
        <>
            <div className="my-3 add-new">
                <samp>List Tai Khoan KH</samp>
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
                    <th>Ma Tai Khoan</th>
                    <th>Ho</th>
                    <th>Ten</th>
                    <th>SDT</th>
                    <th>Email</th>
                    <th>Mat Khau</th>
                    <th>Trang Thai</th>
                    <th>Function</th>
                </tr>
                </thead>
                <tbody>
                {listTaiKhoanKH &&
                    listTaiKhoanKH.length > 0 &&
                    listTaiKhoanKH.map((item, index) => {
                        return (
                            <tr key={`xuatXu-${index}`}>
                                <td>{item.maTaiKhoan}</td>
                                <td>{item.ho}</td>
                                <td>{item.ten}</td>
                                <td>{item.sdt}</td>
                                <td>{item.email}</td>
                                <td>{item.matKhau}</td>
                                <td>{item.trangThai === 1 ? 'Hoat Dong' : 'Ngung Hoat Dong'}</td>
                                <td>
                                    <button onClick={() => handleDelete(item)}
                                            type="button"
                                            className="btn btn-outline-danger">
                                        Delete
                                    </button>
                                    <button
                                            type="button"
                                            className="btn btn-outline-danger">
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
            <ModalsAddNewTKKH show={isShowModalAddNew} handleClose={handleClose}/>
            <ModelConfirmTKKH show={isShowModalDelete}
                              handleClose={handleClose}
                              isDataTaiKhoanKH={isDataTaiKhoanKH}
                              getTaiKhoanKH={getTaiKhoanKH}
            />

        </>
    );
};
export default TableTaiKhoanKH;
