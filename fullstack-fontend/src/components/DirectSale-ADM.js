import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { postAddBill, selectAllBill } from "../services/BillSevice";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { postAddDirect } from "../services/DirectSaleSevice";
import ReactPaginate from "react-paginate";

const DireactSale = (props) => {
  const [listBill, setListBill] = useState([]);
  // Show Data On Tables
  const [numberPages, setNumberPages] = useState([]);
  const getListData = async (page) => {
    let res = await selectAllBill(page);
    console.log("Check res: ", res.content);
    setListBill(res.content);
    setNumberPages(res.totalPages);
  };
  useEffect(() => {
    getListData(0);
  }, []);
  //Next Page
  const handlePageClick = (event) => {
    getListData(+event.selected);
  };

  //Create a new Detail Direct
  const [code, setCode] = useState(() => {
    const savedValue = localStorage.getItem("autoValue");
    return savedValue ? parseInt(savedValue) : 0;
  });

  useEffect(() => {
    localStorage.setItem("autoValue", code.toString());
  }, [code]);

  const navigate = useNavigate();
  let getIdHttp;
  // const [position, setPosition] = useState(1);
  const currentDate = new Date();
  const formattedDate = format(currentDate, "yyyy-MM-dd");
  const handleAdd = async () => {
    const newValue = code + 1;
    setCode(newValue);
    let res = await postAddBill(code, formattedDate, 0);
    toast.success("A shopping cart is created successfully");
    getIdHttp = res.idHd;
    await postAddDirect(parseInt(getIdHttp));
    console.log("Check setId : ", getIdHttp);
    navigate(`/create-bill/${getIdHttp}`);
  };

  //Delete
  const handleDelete = (maXx) => {};

  return (
    <>
      <div className="my-3 add-new">
        <samp>List Bill</samp>
        <button onClick={() => handleAdd()} className="btn btn-success">
          + Create a new invoice
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Direct ID</th>
            <th>Total Amount</th>
            <th>Date Created</th>
            <th>Status</th>
            <th>Function</th>
          </tr>
        </thead>
        <tbody>
          {listBill &&
            listBill.length > 0 &&
            listBill.map((item, index) => {
              return (
                <tr key={`hoanDon-${index}`}>
                  <td>{item.maHd}</td>
                  <td>{item.tongTien}</td>
                  <td>{item.ngayTao}</td>
                  <td>{item.tinhTrang === 0 ? "Paind" : "Unpaid"}</td>
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
        pageCount={numberPages}
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
    </>
  );
};
export default DireactSale;
