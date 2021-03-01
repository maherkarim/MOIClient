import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

const SearchSkeleton = (props) => {
  return (
    <div style={{ margin: "5px", padding: "5px" }}>
      <Skeleton variant="rect" height="70px" width="100%" animation="wave" />
    </div>
  );
};

export default SearchSkeleton;
