import { $, __m, __p, __sC, __SYD, __v, manage_mediaQuery, SYD_VAR } from "./sydneyDom_v3.js"

//Variables
import "./variable.js"
//Variables

//styles
import "./styles/styles.js"
import "./styles/main.js"
//styles

//navBar
import "./navBar.js"
//navBar

//Pages
import "./p1.js"
import "./p2.js"
import "./p3.js"
import "./p4.js"
import "./p5.js"
import "./p6.js"
import "./p7.js"

import "./sliderEl.js"
//Pages

//footer
import "./footer.js"
//footer

//swap util
import "./swapUtils/swapToken_main.js"
import "./swapUtils/styleComponents.js"
import "./swapUtils/setting.js"

//token select
import "./selectToken/tokenList.js"
//token select

//import wallet
import "./wallet/connectWallet.js"
//swap util

//app utils
import "./utils/scrollUtil.js"
import { updateState } from "./stateAssets.js"
import { fetchTokens, swapList } from "./utils/api.js"
import "./url_fd/url.js"
//app utils

//raw cache
import "./raw/cached.js"
import "./raw/walletList.js"
import { validateWallet } from "./utils/functions.js"
//raw cache

//validate wallet
validateWallet();
//validate wallet

__SYD.container = function()
{
    return $(
        "container",
        {style:__sC["subContainer"]({method:"add",style:{backgroundColor:SYD_VAR.darkTheme.get()}})},
        [
            __SYD.navbar(),
            __SYD.page1(),
            __SYD.page2(),
            $(
                "div",
                {style:"height:fit-content;width:100%;",id:"slider_parent"},
                [__SYD.sliderMain(),]
            ),
            __SYD.page3(),
            __SYD.page4(),
            __SYD.page5(),
            __SYD.page6(),
            __SYD.page7(),
            __SYD.footer(),
            __SYD.select_cont(),
            __SYD.wallet_connect()
        ],
        {
            createState:{
                stateName:"container",
                state:{
                    fontTitle:"40px",
                    fontHeader:"16px",
                    fontSmall:"13px",
                    fontNormHeader:"18px",
                    fontBigTitle:"30px",
                    tokenList:[]
                }
            },
            mediaQuery:{
                query:[{size:"<500px",prop:{fontTitle:"30px"}}],
                defState:{fontTitle:"40px"}
            }
        }
    )
}

__m(__SYD.container(),async ()=>{
    manage_mediaQuery(window.innerWidth);

    //swappable tokens list
    await swapList();
    //swappable tokens list

    fetchTokens();
    setInterval(() => {
        fetchTokens();
    }, 25000);

    //auto scroll slider
    setInterval(() => {
        const el = __v["sliderMain"];
        const increment = __v["sliderMain"].children[0].children[0].offsetWidth;
        if(el.scrollLeft < (el.scrollWidth - el.offsetWidth))
        {
            if(__p(["sliderMain","isEnd"])) updateState({name:"sliderMain",prop:"isEnd",value:false});
            el.scrollBy({
                left: el.scrollLeft+(el.offsetWidth/2),//add gap
                behavior: "smooth"
            });
        }else
        {
            updateState({name:"sliderMain",prop:"isEnd",value:true});
            el.scrollLeft = 0;
        }
    }, 3000);
})