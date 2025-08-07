"use client";

import React from "react";
import { Provider } from "react-redux";
import { docStore } from "./DocRedux/docStore";

export default function DocReduxWrapper({ children }) {
  return <Provider store={docStore}>{children}</Provider>;
}
