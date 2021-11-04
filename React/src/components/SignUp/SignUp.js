import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
// import { apiPostRequest } from "../../helpers/Requests";
import { signupUser } from "../../store/signup/async-actions";
import { connect } from "react-redux";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory } from "react-router";
import { getToken } from "../../helpers/Tokens";

const theme = createTheme();
function SignUp(props) {
  let history = useHistory();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const token = getToken();
  React.useEffect(() => {
    if (token) {
      history.push("/dashboard");
    }
  }, []);
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const onSubmit = (formData) => {
    const data = {
      ...formData,
      role: "617ad1621d195bd707452d76",
    };
    props.signupUser(data);
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
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ mt: 1 }}>
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
                  {errors?.userName?.type === "required" && (
                    <span style={errorStyles}>This field is required!</span>
                  )}
                  {errors?.userName?.type === "minLength" && (
                    <span style={errorStyles}>
                      User Name must contain atleast 6 characters
                    </span>
                  )}
                  {errors?.userName?.type === "maxLength" && (
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
                <Grid item xs={12}>
                  <TextField
                    {...register("password", {
                      required: true,
                      minLength: 6,
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
                <Grid item xs={12}>
                  <TextField
                    {...register("confirmPassword", {
                      required: true,
                    })}
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                  />
                  {errors?.confirmPassword?.type === "required" && (
                    <span style={errorStyles}>This field is required!</span>
                  )}
                  {confirmPassword && password !== confirmPassword && (
                    <span style={errorStyles}>
                      Your password does not match!
                    </span>
                  )}
                </Grid>
              </Grid>
              <Button
                disabled={props.isInitiated}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
                {props.isInitiated && <CircularProgress size={24} />}
              </Button>
            </form>
            {(props.isFailed || props.isSuccess) && (
              <Alert
                sx={{ mt: 1, mb: 2 }}
                open={props.isFailed || props.isSuccess}
                severity={props.isFailed ? "error" : "success"}
              >
                {props.message}
              </Alert>
            )}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    isInitiated: state.signup.isInitiated,
    isSuccess: state.signup.isSuccess,
    isFailed: state.signup.isFailed,
    message: state.signup.message,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signupUser: (values) => dispatch(signupUser(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
