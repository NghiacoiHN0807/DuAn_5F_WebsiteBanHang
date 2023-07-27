import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteHD, postAddBill, selectAllBill } from "../services/BillSevice";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const DireactSale = (props) => {
  const [listBill, setListBill] = useState([]);
  // Show Data On Tables
  const [numberPages, setNumberPages] = useState(0);
  const getListData = async (page) => {
    try {
      let res = await selectAllBill(page);
      console.log("Check res: ", res.content);
      setListBill(res.content);

      setNumberPages(Math.ceil(res.totalPages));
    } catch (error) {
      console.error("Error in list bill: ", error);
    }
  };
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    getListData(currentPage);
  }, [currentPage]);
  //Next Page
  const handlePageClick = (event) => {
    getListData(+event.selected);
    setCurrentPage(+event.selected);
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
    let res = await postAddBill(code, formattedDate, 8);
    toast.success("A shopping cart is created successfully");
    getIdHttp = res.idHd;
    // await getDataCart(getIdHttp);
    navigate(`/create-bill/${getIdHttp}`);
  };

  //Delete
  const handleDelete = async (item) => {
    console.log(item);
    if (item.trangThai === 8) {
      await deleteHD(item.idHd);
      toast.success("Successfully deleted this bill ");
      getListData(currentPage);
    } else if (item.trangThai === 9) {
      toast.warn("This bill has been pain ");
    } else {
      toast.error("This bill was not deleted successfully ");
    }
  };

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
                  <td>{item.trangThai === 9 ? "Paid" : "Unpaid"}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(item)}
                      type="button"
                      className="btn btn-outline-danger"
                    >
                      <FontAwesomeIcon icon={faDeleteLeft} size="lg" />
                    </button>{" "}
                    <button type="button" className="btn btn-outline-warning">
                      <FontAwesomeIcon icon={faPenToSquare} size="lg" />
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
