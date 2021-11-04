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
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { loginUser } from "../../store/signin/async-actions";
import { connect } from "react-redux";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { getToken } from "../../helpers/Tokens";

const theme = createTheme();
function SignIn(props) {
  let history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const token = getToken();
  React.useEffect(() => {
    if (token) {
      history.push("/dashboard");
    }
  }, []);
  const onSubmit = async (data) => {
    await props.loginUser(data, history);
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
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register("email", {
                  required: true,
                  pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                })}
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              {errors?.email?.type === "required" && (
                <span style={errorStyles}>This field is required!</span>
              )}
              {errors?.email?.type === "pattern" && (
                <span style={errorStyles}>
                  Please enter a valid email address!
                </span>
              )}
              <TextField
                {...register("password", {
                  required: true,
                  minLength: 5,
                  maxLength: 20,
                })}
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
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
              <Button
                disabled={props.isInitiated}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
                {props.isInitiated && <CircularProgress size={24} />}
              </Button>
            </form>
            {props.isFailed && (
              <Alert
                sx={{ mt: 1, mb: 2 }}
                open={props.isFailed}
                severity="error"
              >
                {props.message}
              </Alert>
            )}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/sign-up"> Dont have an account? Sign Up</Link>
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
    isInitiated: state.signin.isInitiated,
    isFailed: state.signin.isFailed,
    message: state.signin.message,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (values, history) => dispatch(loginUser(values, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
