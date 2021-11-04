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
import CircularProgress from "@mui/material/CircularProgress";

export default function UserTable(props) {
  const { handleDeleteOpen, handleEditOpen } = props;
  return (
    <>
      <TableContainer component={Paper}>
        {!props.isInitiated ? (
          <Table
            style={{ minWidth: 650, minHeight: "150px" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">User Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props?.data.length <= 0 ? (
                <h5>No Data Found</h5>
              ) : (
                props?.data?.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.username}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
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
                ))
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
