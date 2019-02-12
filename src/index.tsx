import * as React from "react";
import * as ReactDom from "react-dom";

import Search from "./components/Search/Search";

ReactDom.render(<Search suggestionLimit={35}/>, document.getElementById("main"));
