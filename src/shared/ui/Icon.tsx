import IcoMoon, { type IconProps } from "react-icomoon";
import json from "@assets/selection.json";


const Icon = (props: IconProps) => (
  <IcoMoon
    iconSet={json}
    {...props}
  />
);

export default Icon;
