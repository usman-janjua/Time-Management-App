import React from "react";
import WorkLogTable from "../../components/WorkLogTable/WorkLogTable";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import FormDialog from "../../components/Dialogs/FormDialog/FormDialog";
import ConfirmationDialog from "../../components/Dialogs/ConfirmationDialog/ConfirmationDialog";
import AddRecordForm from "../../components/AddRecordForm/AddRecordForm";
import SearchLogs from "../SearchLogs/SearchLogs";
import SettingHours from "../SettingHours/SettingHours";
import moment from "moment";
import "./UserLogs.css";
import {
  workLogData,
  createWorkLog,
  updateWorkLog,
  deleteWorkLog,
  searchWorkLog,
  getHours,
  addHours,
  changeHours,
} from "../../store/user/async-actions";
import { connect } from "react-redux";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function UserLogs(props) {
  const [open, setOpen] = React.useState(false);
  const [editShow, setEditShow] = React.useState(false);
  const [deleteShow, setDeleteShow] = React.useState(false);
  const [editData, setEditData] = React.useState(null);
  const [deleteData, setDeleteData] = React.useState(null);

  React.useEffect(async () => {
    await props.getHours();
    if (props.workLogs.length <= 0) {
      await props.workLogData();
    }
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDeleteOpen = (item) => {
    setDeleteShow(true);
    setDeleteData(item);
  };

  const deleteSubmitHandler = () => {
    props.deleteWorkLog(deleteData);
    setDeleteShow(false);
    if (props.isSuccess === true) {
      toast.success("WorkLog Deleted Successfully");
    }
    if (props.isFailed === true) {
      toast.error("Something Went Wrong");
    }
  };

  const handleDeleteClose = () => {
    setDeleteShow(false);
  };

  const handleEditOpen = (item) => {
    setEditShow(true);
    const updatedItem = {
      date: moment(item.date).format("YYYY-MM-DD"),
      _id: item._id,
      hours: item.hours,
      note: item.note,
    };
    setEditData(updatedItem);
  };
  const handleClose = () => {
    setEditShow(false);
    setOpen(false);
  };

  const worklogSubmitHandler = async (data, title) => {
    if (title === "Add New Record") {
      await props.createWorkLog(data);
      await props.workLogData();
      handleClose();
      if (props.isSuccess === true) {
        toast.success("Record Added successfully");
      }
      if (props.isFailed === true) {
        toast.error("Something Went Wrong");
      }
    } else {
      props.updateWorkLog(data);
      handleClose();
      if (props.isSuccess === true) {
        toast.success("Record updated successfully");
      }
      if (props.isFailed === true) {
        toast.error("Something Went Wrong");
      }
    }
  };

  const hoursSubmitHandler = (formData, title) => {
    if (title === "Add Hours") {
      props.addHours(formData);
      if (props.isSuccess === true) {
        toast.success("Hours Added successfully");
      }
      if (props.isFailed === true) {
        toast.error("Something Went Wrong");
      }
    }
    if (title === "Change Hours") {
      const data = {
        ...formData,
        id: props.settings._id,
      };
      props.changeHours(data);
      if (props.isSuccess === true) {
        toast.success("Hours changed Successfully");
      }
      if (props.isFailed === true) {
        toast.error("Something Went Wrong");
      }
    }
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          mb: 5,
        }}
      >
        <SearchLogs
          searchData={props.searchWorkLog}
          resetData={props.workLogData}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          mb: 3,
        }}
      >
        <SettingHours
          title={
            props.isSuccess && !props?.settings?.hours
              ? "Add Hours"
              : "Change Hours"
          }
          hours={props?.settings?.hours}
          hoursSubmitHandler={hoursSubmitHandler}
        />
      </Box>
      <Box
        sx={{
          width: 300,
          height: 80,
        }}
      >
        <Button
          onClick={handleClickOpen}
          variant="outlined"
          startIcon={<AddIcon />}
        >
          {" "}
          Add New Record
        </Button>
      </Box>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button"
        table="table-to-xls"
        filename="data"
        sheet="worklogs"
        buttonText="Export Data"
      />
      <WorkLogTable
        hours={props.isSuccess && props?.settings?.hours}
        success={props.isSuccess}
        id="table-to-xls"
        handleDeleteOpen={handleDeleteOpen}
        handleEditOpen={handleEditOpen}
        data={props.workLogs}
        isInitiated={props.isInitiated}
      />
      <FormDialog
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      >
        <AddRecordForm
          title="Add New Record"
          dataSubmitHandler={worklogSubmitHandler}
          handleClose={handleClose}
        />
      </FormDialog>
      <FormDialog
        open={editShow}
        handleClickOpen={handleEditOpen}
        handleClose={handleClose}
      >
        <AddRecordForm
          editData={editData}
          title="Edit Record"
          dataSubmitHandler={worklogSubmitHandler}
          handleClose={handleClose}
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
    workLogs: state.user.workLogs,
    settings: state.user.settings,
    isSuccess: state.user.isSuccess,
    isInitiated: state.user.isInitiated,
    isFailed: state.user.isFailed,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    workLogData: () => dispatch(workLogData()),
    getHours: () => dispatch(getHours()),
    createWorkLog: (values) => dispatch(createWorkLog(values)),
    updateWorkLog: (values) => dispatch(updateWorkLog(values)),
    deleteWorkLog: (values) => dispatch(deleteWorkLog(values)),
    searchWorkLog: (values) => dispatch(searchWorkLog(values)),
    addHours: (values) => dispatch(addHours(values)),
    changeHours: (values) => dispatch(changeHours(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLogs);
