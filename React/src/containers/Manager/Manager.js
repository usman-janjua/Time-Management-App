import React from "react";
import Table from "../../components/Table/Table";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import FormDialog from "../../components/Dialogs/FormDialog/FormDialog";
import ConfirmationDialog from "../../components/Dialogs/ConfirmationDialog/ConfirmationDialog";
import AddUserForm from "../../components/AddUserForm/AddUserForm";
import {
  managerUsersData,
  createUserManager,
  updateUserManager,
  deleteUserManager,
} from "../../store/manager/async-actions";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Manager(props) {
  const [open, setOpen] = React.useState(false);
  const [editShow, setEditShow] = React.useState(false);
  const [deleteData, setDeleteData] = React.useState(null);
  const [deleteShow, setDeleteShow] = React.useState(false);
  const [editData, setEditData] = React.useState(null);

  React.useEffect(() => {
    if (props.usersData.length <= 0) {
      props.managerUsersData();
    }
  }, []);

  const handleDeleteOpen = (item) => {
    setDeleteShow(true);
    setDeleteData(item);
  };

  const deleteSubmitHandler = () => {
    props.deleteUserManager(deleteData);
    setDeleteShow(false);
    if (props.isSuccess === true) {
      toast.success("User Deleted Successfully");
    }
    if (props.isFailed === true) {
      toast.error("Something Went Wrong");
    }
  };
  const dataSubmitHandler = async (formData, title) => {
    console.log(formData);
    if (title === "Add New User") {
      let role = "617ad16b1d195bd707452d79";
      let data = {
        ...formData,
        role,
      };
      await props.createUserManager(data);
      handleClose();
      if (props.isSuccess === true) {
        toast.success("User Added Successfully");
      }
      if (props.isFailed === true) {
        toast.error("Something Went Wrong");
      }
    }
    if (title === "Edit User Data") {
      let data = {
        ...formData,
        _id: editData._id,
      };
      props.updateUserManager(data);
      handleEditClose();
      if (props.isSuccess === true) {
        toast.success("User Updated Successfully");
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
  const handleClose = () => {
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
        data={props.usersData}
        handleEditOpen={handleEditOpen}
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
          heading="Edit User Data"
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
    usersData: state.manager.users,
    isSuccess: state.manager.isSuccess,
    isInitiated: state.manager.isInitiated,
    isFailed: state.manager.isFailed,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    managerUsersData: () => dispatch(managerUsersData()),
    createUserManager: (data) => dispatch(createUserManager(data)),
    updateUserManager: (data) => dispatch(updateUserManager(data)),
    deleteUserManager: (data) => dispatch(deleteUserManager(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Manager);
