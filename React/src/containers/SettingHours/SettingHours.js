import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

function SettingHours(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    props.hoursSubmitHandler(data, props.title);
  };
  const errorStyles = {
    color: "red",
    fontSize: 12,
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          mb: 3,
        }}
      >
        <h4>Preferred Working Hours {props.hours || ""}</h4>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              {...register("hours", {
                required: true,
                max: 16,
                min: 4,
              })}
              margin="normal"
              type="number"
              id="hours"
              label="Preferred Hours"
              name="hours"
              autoComplete="hours"
              autoFocus
            />
            {errors?.hours?.type === "required" && (
              <p style={errorStyles}>This field is required!</p>
            )}
            {errors?.hours?.type === "min" && (
              <p style={errorStyles}>Minimum hours must 4!</p>
            )}
          </Grid>

          <Grid item xs={3}>
            <Button
              type="submit"
              variant="outlined"
              color="success"
              sx={{ mt: 3, ml: 6 }}
            >
              {props.title}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default SettingHours;
