import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  container: {
    width: 500,
    maxWidth: "100%",
    height: 500,
    padding: "12px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
