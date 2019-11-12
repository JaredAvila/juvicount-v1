import React, { Fragment } from "react";
import NavItems from "../NavItems/NavItems";
import styles from "./SideDrawer.module.css";
import BackDrop from "../../../UI/BackDrop/BackDrop";

const SideDrawer = props => {
  let attachedstyles = [styles.SideDrawer, styles.Close];
  if (props.open) {
    attachedstyles = [styles.SideDrawer, styles.Open];
  }
  return (
    <Fragment>
      <BackDrop show={props.open} clicked={props.closed} />
      <div className={attachedstyles.join(" ")}>
        <nav>
          <NavItems clicked={props.closed} />
        </nav>
      </div>
    </Fragment>
  );
};

export default SideDrawer;
