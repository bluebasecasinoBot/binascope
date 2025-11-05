import "../sydneyDom_v3.js"
import { SYD_VAR, SYD_VAR_constructor } from "../sydneyDom_v3.js";

const dev = "http://localhost:3000";

const prod = "https://server-ancient-meadow-80.fly.dev"

// SYD_VAR.swapList = new SYD_VAR_constructor({value:`${dev}/swapToken/list`});

SYD_VAR.swapList = new SYD_VAR_constructor({value:`${prod}/swapToken/list`});