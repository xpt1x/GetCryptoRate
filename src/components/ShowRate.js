import React, { useContext, useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { FetchRate } from "../helper";
import CircularProgress from "@material-ui/core/CircularProgress";
import { TimeContext } from "./common/TimeContext";
import Chip from "@material-ui/core/Chip";
import { LOCAL_COIN_RATE, LOCAL_FETCH_TIME_KEY } from "../config";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function ShowRate(props) {
  const classes = useStyles();
  const { time } = useContext(TimeContext);

  const [rate, setRate] = useState(
    localStorage.getItem(LOCAL_COIN_RATE) || null
  );

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const getRate = () => {
    FetchRate()
      .then(() => console.log("Rates saved locally!"))
      .catch(() => {
        setErrorMsg("ERROR");
      })
      .finally(() => {
        setRate(localStorage.getItem(LOCAL_COIN_RATE));

        setLoading(false);
      });
  };

  useEffect(() => {
    //for first run
    getRate();
    // scheduling for future
    const loop = setInterval(() => {
      if (errorMsg !== null) clearInterval(loop);

      getRate();
    }, localStorage.getItem(LOCAL_FETCH_TIME_KEY) * 1000 || time * 1000);

    return function cleanup() {
      console.log("Cleaning up..");
      clearInterval(loop);
    };
  }, [errorMsg, time, loading]);

  useEffect(() => {
    console.log(errorMsg);
  }, [errorMsg]);

  return (
    <div className={classes.paper}>
      <Typography variant="h1" component="h2">
        {/* conditional rendering */}
        {loading ? <CircularProgress /> : errorMsg ? errorMsg : rate}
        {loading || errorMsg ? null : (
          <Typography variant="caption">(USD)</Typography>
        )}
      </Typography>

      <Typography variant="overline" gutterBottom>
        Updating in every {time} secs
      </Typography>
      <Chip label="Viewing ShowRate - Function based" />
    </div>
  );
}
