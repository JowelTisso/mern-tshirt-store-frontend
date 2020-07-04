import React from "react";
import Base from "../core/Base";
import { UserDashBoardLeft } from "./helper/userDashboardHelper";

const Address = () => {
  const UserDashBoardRight = () => {
    return <div className="">Right</div>;
  };

  return (
    <Base
      title="Address"
      classNameForTitle="display-4"
      classNameForTopContainer=" bg-dark text-white text-center pt-4"
    >
      <div className="row">
        <div className="col-2 ">{UserDashBoardLeft()}</div>
        <div className="col-10 bg-secondary rounded text-white">
          {UserDashBoardRight()}
        </div>
      </div>
    </Base>
  );
};

export default Address;
