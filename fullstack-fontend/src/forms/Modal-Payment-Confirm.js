import { useNavigate, useParams } from "react-router-dom";
import "../scss/Car-Bill-ADM.scss";
import { Dialog, TextField } from "@mui/material";
import { useState } from "react";
import { addPayment, updatePayment } from "../services/OrderManagementTimeLine";
import { toast } from "react-toastify";
import { format } from "date-fns";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { forwardRef } from "react";
import { paymentOnline } from "../services/BillSevice";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalPaymentComfirm = (props) => {
  const { show, handleClose, listHD, thanhTien } = props;

  //Insert product
  const param = useParams();
  const idHdParam = param.id;
  const [moTa, setMoTa] = useState("");
  const currentDate = new Date();
  const formattedDate = format(currentDate, "yyyy-MM-dd");

  const navigate = useNavigate();

  const handlePaymentOnCash = async () => {
    try {
      console.log("Check listHD: ", listHD);
      let paymentOn = await paymentOnline(900000, listHD.idHd);
      console.log("Check paymentOn: ", paymentOn);

      // const paymentUrl = paymentOn[Symbol.for("[[PromiseResult]]")];
      // console.log("Extracted URL: ", paymentUrl);

      // Mở tab mới với đường dẫn URL
      window.location.href = paymentOn;

      // console.log("Check paymentOn: ", paymentOn);
      // let hinhThuc = "Payment by cash";
      // let tienDua = listData.tongTien;
      // await addPayment(idHdParam, hinhThuc, moTa, 0);
      // await updatePayment(idHdParam, formattedDate, tienDua, 4);
      // toast.success("Payment successfully");
    } catch (e) {
      console.error("Error updating", e);
    }
  };

  return (
    <>
      <div>
        <Dialog
          open={show}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          maxWidth="xl"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"THANH TOÁN HÓA ĐƠN"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {/* <input defaultValue={listHD.maHd} /> */}
              {/* <TextField
                fullWidth
                sx={{ m: 1 }}
                required
                id="outlined-required"
                label="Mã Hóa Đơn"
                value={listHD.maHd}
                // disabled={true}
                size="small"
              /> */}
              <div>
                <TextField
                  id="standard-multiline-flexible"
                  label="Mã Hóa Đơn"
                  multiline
                  maxRows={4}
                  variant="outlined"
                  size="small"
                  defaultValue={listHD.maHd}
                  fullWidth
                  sx={{ marginTop: 2 }}
                />
                <TextField
                  id="standard-multiline-flexible"
                  label="Thành Tiền"
                  multiline
                  maxRows={4}
                  variant="outlined"
                  size="small"
                  defaultValue={thanhTien}
                  fullWidth
                  sx={{ marginTop: 2 }}
                />
                <TextField
                  onChange={(e) => setMoTa(e.target.value)}
                  id="outlined-multiline-static"
                  label="Mô Tả"
                  sx={{ m: 1, marginTop: 2, marginLeft: 0 }}
                  fullWidth
                  maxRows={4}
                  variant="outlined"
                  size="small"
                  multiline
                  rows={4}
                />
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={handlePaymentOnCash}>Đồng Ý</Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>PAYMENT CONFIRMATION</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextField
            fullWidth
            sx={{ m: 1 }}
            required
            id="outlined-required"
            label="Subtotal"
            defaultValue={listData.tongTien}
            disabled={true}
            size="small"
          />
          <TextField
            onChange={(e) => setMoTa(e.target.value)}
            id="outlined-multiline-static"
            label="Description"
            sx={{ m: 1 }}
            fullWidth
            multiline
            rows={4}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-primary"
            onClick={() => handlePaymentOnCash()}
          >
            Payment by cash
          </Button>{" "}
          <Button variant="outline-secondary">Payment by card</Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};
export default ModalPaymentComfirm;
