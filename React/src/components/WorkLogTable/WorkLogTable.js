import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";

export default function WorkLogTable(props) {
  const { handleDeleteOpen, handleEditOpen } = props;

  return (
    <>
      <TableContainer
        style={{ minWidth: 650, minHeight: "100px" }}
        component={Paper}
      >
        {!props.isInitiated ? (
          <Table
            id={props.id}
            style={{ minWidth: 650, minHeight: "150px" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="left">Hours</TableCell>
                <TableCell align="left">Notes</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {props?.data.length <= 0 ? (
                <h5>No Record Found</h5>
              ) : (
                props?.data?.map((row) => {
                  const date = moment(row.date).format("L");
                  return (
                    <TableRow
                      key={row._id}
                      sx={
                        parseInt(props.hours) > parseInt(row.hours)
                          ? { backgroundColor: "#e8562a" }
                          : { backgroundColor: "#ceedbe" }
                      }
                    >
                      <TableCell component="th" scope="row">
                        {date}
                      </TableCell>
                      <TableCell align="left">{row.hours}</TableCell>
                      <TableCell align="left">{row.note}</TableCell>
                      <TableCell align="left">
                        <ModeEditOutlinedIcon
                          onClick={() => handleEditOpen(row)}
                          style={{ cursor: "pointer" }}
                          color="primary"
                        />
                        <DeleteOutlineOutlinedIcon
                          onClick={() => handleDeleteOpen(row)}
                          style={{ cursor: "pointer" }}
                          color="error"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100px",
            }}
          >
            <CircularProgress />
          </div>
        )}
      </TableContainer>
    </>
  );
}
