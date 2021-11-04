import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
const theme = createTheme();

export default function AddRecordForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: props.editData,
  });
  const onSubmit = async (data) => {
    props.dataSubmitHandler(data, props.title);
  };
  const errorStyles = {
    color: "red",
    fontSize: 12,
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            {props.title}
          </Typography>

          <Box sx={{ mt: 3 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register("date", {
                  required: true,
                })}
                id="date"
                fullWidth
                name="date"
                label="Date"
                type="date"
                autoComplete="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {errors?.date?.type === "required" && (
                <span style={errorStyles}>This field is required!</span>
              )}
              <TextField
                {...register("hours", {
                  required: true,
                  max: 16,
                })}
                margin="normal"
                fullWidth
                type="number"
                id="hours"
                label="Total Hours"
                name="hours"
                autoComplete="hours"
                autoFocus
              />
              {errors?.hours?.type === "required" && (
                <span style={errorStyles}>This field is required!</span>
              )}
              {errors?.hours?.type === "max" && (
                <span style={errorStyles}>Hours must be less than 16!</span>
              )}
              <TextField
                {...register("note", {
                  required: true,
                  minLength: 10,
                  maxLength: 200,
                })}
                margin="normal"
                fullWidth
                name="note"
                label="Notes"
                type="text"
                id="notes"
                autoComplete="notes"
                multiline
                rows={4}
              />
              {errors?.note?.type === "required" && (
                <span style={errorStyles}>This field is required!</span>
              )}
              {errors?.note?.type === "minLength" && (
                <span style={errorStyles}>
                  Notes must contain atleast 10 characters
                </span>
              )}
              {errors?.note?.type === "maxLength" && (
                <span style={errorStyles}>
                  Notes must not exceed 200 characters
                </span>
              )}

              <Grid container justifyContent="flex-end">
                <Grid item sx={{ mr: 3 }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    fullWidth
                    color="error"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={props.handleClose}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
