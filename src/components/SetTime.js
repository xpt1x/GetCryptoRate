import React, { useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AccessAlarm from "@material-ui/icons/AccessAlarm";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { navigate } from "@reach/router";
import { Typography } from "@material-ui/core";
import { TimeContext } from "./common/TimeContext";
import { LOCAL_FETCH_TIME_KEY } from "../config";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SetTime({ enqueueSnackbar }) {
  const classes = useStyles();
  const {time , setTime} = useContext(TimeContext)

  const handleSubmit = (event) => {
    event.preventDefault();
    const { new_time } = event.target.elements;

    setTime(new_time.value);
    localStorage.setItem(LOCAL_FETCH_TIME_KEY, new_time.value);

    enqueueSnackbar("Fetch time updated!", { variant: "success" });
    navigate("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccessAlarm />
        </Avatar>
        <Typography variant="overline">Current time: {time} sec</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="new_time"
            label="Set Time"
            name="new_time"
            type="number"
            placeholder="Time in secs"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}
