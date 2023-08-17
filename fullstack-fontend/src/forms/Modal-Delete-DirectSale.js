import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useState, useEffect } from "react";
import { forwardRef } from "react";
import { toast } from "react-toastify";
import { deleteHD } from "../services/BillSevice";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalDeleteDirectSale(props) {
  // Get Props
  const { open, handleClose, information } = props;

  // Set maHd using useState
  const [maHd, setMaHd] = useState("");

  // Update maHd when information changes
  useEffect(() => {
    if (information != null) {
      setMaHd(information.maHd);
    } else {
      setMaHd("");
    }
  }, [information]);

  // Handle Delete
  const handleDelete = async () => {
    if (information.trangThai === 8) {
      await deleteHD(information.idHd);
      toast.success("Đã xóa hóa đơn chờ thành công ");
    } else if (information.trangThai === 9) {
      toast.warn("Hóa đơn đã được thanh toán. Không thể xóa!!!");
    } else {
      toast.error("Xóa không thành công ");
    }
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Xóa Hóa Đơn"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Xóa Hóa Đơn Có Mã Là: {maHd}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleDelete}>Đồng Ý</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
