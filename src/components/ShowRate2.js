import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { FetchRate } from "../helper";
import CircularProgress from "@material-ui/core/CircularProgress";
import TimeContext2 from "./common/TimeContext2";
import { Chip } from "@material-ui/core";
import { LOCAL_COIN_RATE, LOCAL_FETCH_TIME_KEY } from "../config";

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

class ShowRate2 extends React.Component {
  static contextType = TimeContext2;
  constructor(props) {
    super(props);
    this.state = {
      rate: localStorage.getItem(LOCAL_COIN_RATE) || null,
      loading: true,
      errorMsg: null,
    };
  }

  getRate() {
    FetchRate()
      .then(() => console.log("Rates saved locally!"))
      .catch(() => {
        this.setState({ errorMsg: "Error" });
        this.props.enqueueSnackbar("Failed request", { variant: "error" });
      })
      .finally(() => {
        this.setState({
          rate: localStorage.getItem(LOCAL_COIN_RATE),
          loading: false,
        });
      });
  }

  componentDidMount() {
    // getting time (just for display purpose) from context
    this.time = this.context;

    this.getRate();
    if (this.state.errorMsg !== null) return;

    //schedule for future
    this.interval = setInterval(() => {
      this.getRate();
      if (this.state.errorMsg !== null) clearInterval(this.interval);
    }, localStorage.getItem(LOCAL_FETCH_TIME_KEY) * 1000 || this.time * 1000);
  }

  componentWillUnmount() {
    console.log("Cleaning up (Show2)..");
    clearInterval(this.interval);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.paper}>
        <Typography variant="h1" component="h2">
          {/* conditional rendering */}
          {this.state.loading ? (
            <CircularProgress />
          ) : this.state.errorMsg ? (
            this.state.errorMsg
          ) : (
            this.state.rate
          )}
          {this.state.loading || this.state.errorMsg ? null : (
            <Typography variant="caption">(USD)</Typography>
          )}
        </Typography>

        <Typography variant="overline" gutterBottom>
          Updating in every {this.time} secs
        </Typography>
        <Chip label="Viewing ShowRate - Class based" />
      </div>
    );
  }
}

ShowRate2.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ShowRate2);
