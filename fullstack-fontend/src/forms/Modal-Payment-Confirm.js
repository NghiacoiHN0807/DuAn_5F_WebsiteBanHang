import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../scss/Car-Bill-ADM.scss";
import { TextField } from "@mui/material";
import { useState } from "react";
import { addPayment, updatePayment } from "../services/OrderManagementTimeLine";
import { toast } from "react-toastify";
import { format } from "date-fns";

const ModalPaymentComfirm = (props) => {
  const { show, handleClose, listData } = props;

  //Insert product
  const param = useParams();
  const idHdParam = param.id;
  const [moTa, setMoTa] = useState("");
  const currentDate = new Date();
  const formattedDate = format(currentDate, "yyyy-MM-dd");

  const handlePaymentOnCash = async () => {
    try {
      let hinhThuc = "Payment by cash";
      let tienDua = listData.tongTien;
      await addPayment(idHdParam, hinhThuc, moTa, 0);
      await updatePayment(idHdParam, formattedDate, tienDua, 4);
      toast.success("Payment successfully");
    } catch (e) {
      console.error("Error updating", e);
    }
  };

  return (
    <>
      <Modal
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
      </Modal>
    </>
  );
};
export default ModalPaymentComfirm;
