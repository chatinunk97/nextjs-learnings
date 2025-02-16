import React from "react";
import Ping from "./Ping";
import { client } from "../sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "../sanity/lib/query";

const View = async ({ id }: { id: string }) => {
  //Fetching the view
  const { views: totalView } = await client.fetch(STARTUP_VIEWS_QUERY, { id });
  console.log(totalView);
  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">Views : {totalView}</span>
      </p>
    </div>
  );
};

export default View;
