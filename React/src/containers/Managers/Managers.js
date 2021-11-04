import React from "react";
import Table from "../../components/Table/Table";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import FormDialog from "../../components/Dialogs/FormDialog/FormDialog";
import AddUserForm from "../../components/AddUserForm/AddUserForm";
import { connect } from "react-redux";
import ConfirmationDialog from "../../components/Dialogs/ConfirmationDialog/ConfirmationDialog";
import {
  adminManagersData,
  createManagerAdmin,
  updateManagerAdmin,
  deleteManagerAdmin,
} from "../../store/admin/async-actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Manager(props) {
  const [open, setOpen] = React.useState(false);
  const [editShow, setEditShow] = React.useState(false);
  const [deleteData, setDeleteData] = React.useState(null);
  const [deleteShow, setDeleteShow] = React.useState(false);
  const [editData, setEditData] = React.useState(null);
  React.useEffect(() => {
    if (props.buttonTitle === "Add New Manager") {
      if (props.managersData.length <= 0) {
        props.adminManagersData();
      }
    }
  }, []);

  const handleDeleteOpen = (item) => {
    setDeleteShow(true);
    setDeleteData(item);
  };

  const deleteSubmitHandler = () => {
    props.deleteManagerAdmin(deleteData);
    setDeleteShow(false);
    if (props.isSuccess === true) {
      toast.success("Manager Deleted Successfully");
    }
    if (props.isFailed === true) {
      toast.error("Something Went Wrong");
    }
  };
  const dataSubmitHandler = async (formData, title) => {
    if (title === "Add New Manager") {
      let role = "617ad1621d195bd707452d76";
      let data = {
        ...formData,
        role,
      };
      await props.createManagerAdmin(data);
      handleClose();
      if (props.isSuccess === true) {
        toast.success("Manager Created Successfully");
      }
      if (props.isFailed === true) {
        toast.error("Something Went Wrong");
      }
    }
    if (title === "Edit Manager Data") {
      let data = {
        ...formData,
        _id: editData._id,
      };
      props.updateManagerAdmin(data);
      handleEditClose();
      if (props.isSuccess === true) {
        toast.success("Manager Updated Successfully");
      }
      if (props.isFailed === true) {
        toast.error("Something Went Wrong");
      }
    }
  };
  const handleEditClose = () => {
    setEditShow(false);
  };

  const handleDeleteClose = () => {
    setDeleteShow(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleEditOpen = (item) => {
    setEditShow(true);
    setEditData(item);
  };
  const handleClose = async () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          width: 300,
          height: 100,
        }}
      >
        <Button
          onClick={handleClickOpen}
          variant="outlined"
          startIcon={<AddIcon />}
        >
          {" "}
          {props.buttonTitle}
        </Button>
      </Box>
      <Table
        handleDeleteOpen={handleDeleteOpen}
        data={props.managersData}
        handleEditOpen={handleEditOpen}
        isInitiated={props.isInitiated}
      />
      <FormDialog open={open}>
        <AddUserForm
          dataSubmitHandler={dataSubmitHandler}
          heading={props.buttonTitle}
          handleClose={handleClose}
        />
      </FormDialog>

      <FormDialog open={editShow}>
        <AddUserForm
          dataSubmitHandler={dataSubmitHandler}
          editData={editData}
          heading="Edit Manager Data"
          handleClose={handleEditClose}
        />
      </FormDialog>

      <ConfirmationDialog
        open={deleteShow}
        handleClose={handleDeleteClose}
        handleSubmit={deleteSubmitHandler}
        heading="Are you sure you want to Delete?"
      />
      <ToastContainer />
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    managersData: state.admin.managers,
    isSuccess: state.admin.isSuccess,
    isInitiated: state.admin.isInitiated,
    isFailed: state.admin.isFailed,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    adminManagersData: () => dispatch(adminManagersData()),
    createManagerAdmin: (data) => dispatch(createManagerAdmin(data)),
    updateManagerAdmin: (data) => dispatch(updateManagerAdmin(data)),
    deleteManagerAdmin: (data) => dispatch(deleteManagerAdmin(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Manager);
