import SideMenu from "./common/SideMenu";
import SetTime from "./SetTime";
import ShowRate from "./ShowRate";
import ShowRate2 from "./ShowRate2";
import { Router } from "@reach/router";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { TimeContext } from "./common/TimeContext";
import { TimeProvider } from "./common/TimeContext2";
import { DEFAULT_TIME_SECONDS, LOCAL_FETCH_TIME_KEY } from "../config";

export default function Dash() {

  const getFetchTime = () => {
    const localValue = localStorage.getItem(LOCAL_FETCH_TIME_KEY)
    if(localValue === null || isNaN(localValue))
      return DEFAULT_TIME_SECONDS
    return parseInt(localValue)
  }

  const [time, setTime] = useState(getFetchTime);
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <SideMenu />
      {/* Wrapping components 2 times in order to show both functional + class based implementation of context */}
      <TimeContext.Provider value={{ time, setTime }}>
        <TimeProvider value={time}>
          <Router>
            <ShowRate default path="show" enqueueSnackbar={enqueueSnackbar} />
            <ShowRate2 path="show2" enqueueSnackbar={enqueueSnackbar} />
            <SetTime path="set" enqueueSnackbar={enqueueSnackbar} />
          </Router>
        </TimeProvider>
      </TimeContext.Provider>
    </>
  );
}
