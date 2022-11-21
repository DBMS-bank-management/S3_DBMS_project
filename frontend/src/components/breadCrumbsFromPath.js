import { Breadcrumb } from "antd";
import React from "react";
import { dashSeperatedToHumanReadble } from "../utils/string";

export const BreadcrumbsFromPath = () => {
  const path = window.location.pathname;
  const splitPath = path.split("/").filter((p) => p);
  const paths = [];
  splitPath.map((path) => {
    var pString = "";
    const p = paths.map((p) => {
      pString = pString + p[1] + "/";
    });
    pString += path;
    paths.push([path, pString]);
  });

  return (
    <Breadcrumb
      style={{
        margin: "16px 0",
      }}
    >
      {paths.map((path) => (
        <Breadcrumb.Item key={path[1]} href={"/" + path[1]}>
          {dashSeperatedToHumanReadble(path[0])}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};
