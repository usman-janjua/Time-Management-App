import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useForm } from "react-hook-form";

function SearchLogs(props) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    props.searchData(data);
  };
  const errorStyles = {
    color: "red",
    fontSize: 12,
  };
  const start_date = watch("start_date");
  const end_date = watch("end_date");

  return (
    <>
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          mb: 3,
        }}
      >
        <h2>Search the Records</h2>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              {...register("start_date", {
                required: true,
              })}
              name="start_date"
              id="date"
              label="Start Date"
              type="date"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {errors?.start_date?.type === "required" && (
              <p style={errorStyles}>This field is required!</p>
            )}
          </Grid>
          <Grid item xs={3}>
            <TextField
              {...register("end_date", {
                required: true,
              })}
              name="end_date"
              id="date"
              label="End Date"
              type="date"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {errors?.end_date?.type === "required" && (
              <p style={errorStyles}>This field is required!</p>
            )}
            {end_date && start_date > end_date && (
              <p style={errorStyles}>
                End Date must be greater than Start Date
              </p>
            )}
          </Grid>
          <Grid item xs={3}>
            <Button
              type="submit"
              variant="outlined"
              color="success"
              startIcon={<SearchIcon />}
              sx={{ mt: 1, ml: 6 }}
            >
              Filter Data
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              onClick={props.resetData}
              variant="outlined"
              color="error"
              startIcon={<RefreshIcon />}
              sx={{ mt: 1 }}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default SearchLogs;
