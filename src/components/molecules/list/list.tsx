import React from "react";
import { Divider } from "@webshop/atoms";

export const List: React.FunctionComponent = ({ children }) => (
  <ul>
    {React.Children.map(children, (element, index) => (
      <>
        {element}
        {index < React.Children.count(children) - 1 && <Divider />}
      </>
    ))}
  </ul>
);
