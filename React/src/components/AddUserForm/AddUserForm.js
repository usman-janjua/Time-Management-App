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

export default function AddUserForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: props.editData,
  });

  const onSubmit = async (formData) => {
    props.dataSubmitHandler(formData, props.heading);
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
            {props.heading}
          </Typography>
          <Box sx={{ mt: 3 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    {...register("name", {
                      required: true,
                      minLength: 5,
                      maxLength: 20,
                    })}
                    autoComplete="given-name"
                    name="name"
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                  />
                  {errors?.name?.type === "required" && (
                    <span style={errorStyles}>This field is required!</span>
                  )}
                  {errors?.name?.type === "minLength" && (
                    <span style={errorStyles}>
                      Name must contain atleast 6 characters
                    </span>
                  )}
                  {errors?.name?.type === "maxLength" && (
                    <span style={errorStyles}>
                      Name must not exceed 20 characters
                    </span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register("username", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                    })}
                    autoComplete="given-name"
                    name="username"
                    fullWidth
                    id="username"
                    label="User Name"
                    autoFocus
                  />
                  {errors?.username?.type === "required" && (
                    <span style={errorStyles}>This field is required</span>
                  )}
                  {errors?.username?.type === "minLength" && (
                    <span style={errorStyles}>
                      User Name must contain atleast 6 characters
                    </span>
                  )}
                  {errors?.username?.type === "maxLength" && (
                    <span style={errorStyles}>
                      User Name must not exceed 20 characters
                    </span>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register("email", {
                      required: true,
                      pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    })}
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                  {errors?.email?.type === "required" && (
                    <span style={errorStyles}>This field is required!</span>
                  )}
                  {errors?.email?.type === "pattern" && (
                    <span style={errorStyles}>
                      Please enter a valid email address!
                    </span>
                  )}
                </Grid>
                {props.heading !== "Edit User Data" &&
                  props.heading !== "Edit Manager Data" && (
                    <Grid item xs={12}>
                      <TextField
                        {...register("password", {
                          required: true,
                          minLength: 5,
                          maxLength: 20,
                        })}
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                      />
                      {errors?.password?.type === "required" && (
                        <span style={errorStyles}>This field is required!</span>
                      )}
                      {errors?.password?.type === "minLength" && (
                        <span style={errorStyles}>
                          Password must contain atleast 6 characters
                        </span>
                      )}
                      {errors?.password?.type === "maxLength" && (
                        <span style={errorStyles}>
                          Password must not exceed 20 characters
                        </span>
                      )}
                    </Grid>
                  )}
              </Grid>
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
