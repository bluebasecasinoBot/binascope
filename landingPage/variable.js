import { SYD_VAR, SYD_VAR_constructor } from "./sydneyDom_v3.js";

// Binance Theme
SYD_VAR.mainTheme = new SYD_VAR_constructor({value:"#F3BA2F"}); // Binance Gold
SYD_VAR.mainTheme_op = new SYD_VAR_constructor({value:"rgba(243, 186, 47, 0.12)"}); // Soft gold overlay
SYD_VAR.darkTheme = new SYD_VAR_constructor({value:"#0b0b0b"}); // Binance dark black/gray
SYD_VAR.darkThemeText1 = new SYD_VAR_constructor({value:"#EAECEF"}); // Binance light gray text
SYD_VAR.cardClr = new SYD_VAR_constructor({value:"#181A20"}); // Card dark background
SYD_VAR.cardClr_txt = new SYD_VAR_constructor({value:"#FFFFFF"}); // White text
SYD_VAR.nav_bg = new SYD_VAR_constructor({value:"#121212"}); // Nav background - deep black

// Alerts / Status
SYD_VAR.err = new SYD_VAR_constructor({value:"#F6465D"}); // Binance error red
SYD_VAR.success = new SYD_VAR_constructor({value:"#0ECB81"}); // Binance green
SYD_VAR.pending = new SYD_VAR_constructor({value:"#F3BA2F"}); // Binance gold highlight