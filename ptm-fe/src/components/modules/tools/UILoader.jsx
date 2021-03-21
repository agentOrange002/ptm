import React from 'react';
import ReduxBlockUi from 'react-block-ui/redux';
import { css } from "@emotion/core";
import ClockLoader from "react-spinners/ClockLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;

const UILoader = props => {
    const { blockui, unblockui } = props;
    return (
        <ReduxBlockUi block={blockui} unblock={unblockui}
            loader={<ClockLoader
                css={override}
                size={100}
                color={"#000066"}
                loading={true}
            />} >
            {props.children}
        </ReduxBlockUi>
    );
}

export default UILoader;