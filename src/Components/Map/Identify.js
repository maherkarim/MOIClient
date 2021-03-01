import React from "react";
import { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useModal } from "../Context/modal-context";
import strings from "../Localizations/Localizations";
import IdentifyView from "../UI/IdentifyView";

function Identify({ view }) {
  const { setModal } = useModal();
  const isMobile = useStoreState((state) => state.mainStore.isMobile);
  const fetchIdentify = useStoreActions(
    (actions) => actions.mainStore.fetchIdentify
  );
  useEffect(() => {
    view.on("hold", async (event) => {
      console.log(event);
      const data = await fetchIdentify({
        x: event.mapPoint.longitude,
        y: event.mapPoint.latitude,
      });
      if (data && data.Result[0])
        setModal({
          title: strings.theaddress,
          content: <IdentifyView address={data.Result[0]} />,
          maxWidth: "sm",
          fullScreen: isMobile,
        });
    });
    //eslint-disable-next-line
  }, []);

  return null;
}

export default Identify;
