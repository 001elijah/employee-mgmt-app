import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SignoutIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 11.333c0 .62 0 .93.068 1.185a2 2 0 0 0 1.414 1.414c.255.068.565.068 1.185.068H11c.932 0 1.398 0 1.765-.152a2 2 0 0 0 1.083-1.083C14 12.398 14 11.932 14 11V5c0-.932 0-1.398-.152-1.765a2 2 0 0 0-1.083-1.083C12.398 2 11.932 2 11 2h-.333c-.62 0-.93 0-1.185.068a2 2 0 0 0-1.414 1.414C8 3.737 8 4.047 8 4.667M5.333 11.333 2 8m0 0 3.333-3.333M2 8h8"
    />
  </Svg>
);
export default SignoutIcon;
