import React from 'react';
import BlockUi from 'react-block-ui/redux';
import { css } from "@emotion/core";
import ClockLoader from "react-spinners/ClockLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;

const BlockUILoader = props => {
    const { blockui } = props;
    return (
        <BlockUi blocking={blockui}
            loader={<ClockLoader
                css={override}
                size={100}
                color={"#000066"}
                loading={true}
            />} >
            {props.children}
        </BlockUi>
    );
}

export default BlockUILoader;