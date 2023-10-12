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
import { deleteProductOnCart } from "../services/DirectSaleSevice";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalDeleteProductOnCart(props) {
  // Get Props
  const { open, handleClose, itemDelete, selectDataCart, currentPage } = props;

  // Set maHd using useState
  const [maSp, setMaSp] = useState("");

  // Update maHd when information changes
  useEffect(() => {
    if (itemDelete != null) {
      setMaSp(itemDelete[4]);
    } else {
      setMaSp("");
    }
  }, [itemDelete]);
  // Handle Delete
  const handleDelete = async () => {
    await deleteProductOnCart(itemDelete[1]);
    selectDataCart(currentPage);
    toast.success("Xóa Sản Phẩm Thành Công");
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
        <DialogTitle>{"Xóa Sản Phẩm"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Xóa Sản Phẩm Có Mã Là: {maSp}
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
