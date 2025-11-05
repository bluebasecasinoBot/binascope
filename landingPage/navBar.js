import { $, __p, __sC, __SYD, SYD_VAR } from "./sydneyDom_v3.js";
import {updateState} from "./stateAssets.js"
import { m_out, m_over } from "./utils/functions.js";

__SYD["navbar"] = () => {
  return $(
    "nav",
    {
      style:
        `display:flex;justify-content:${__p(["navbar" , "mobile"],false)?"space-between":"center"};align-items:center;padding:${__p(["navbar","padding"],"15px 40px")};background-color: ${__p(["navbar","tog"],false) ? SYD_VAR.nav_bg.get() :__p(["navbar","active"],false)?SYD_VAR.nav_bg.get():"transparent"};color:#ffffff;position:fixed;top:${__p(["navbar" , "float"],false) ? "10px" : "0px"};left:50%;transform:translateX(-50%);width:${__p(["navbar" , "float"],false) ? "calc(100% - 20px)" : "100%"};z-index:9999;gap:30px;border-radius:${__p(["navbar" , "float"],false) ? "20px" : "0px"};border-bottom:${__p(["navbar","active"],false)?`1px solid ${SYD_VAR.mainTheme_op.get()};`:"unset"}`,
    },
    [
      // Left: logo
        $(
            "div",
            { style: "display:flex;align-items:center;gap:10px;width:100%;" },
            [
                $(
                    "div",
                    {style:"height:60px;width:150px;background-image:url(./assets/image/logo1.png);"},[],
                    {genericStyle:["bg_fit"]}
                )
            ]
        ),

        $(
            "div",
            {
                style:`background-color:inherit;height:fit-content;width:100%;max-width:${__p(["navbar" , "mobile"],false) ? "unset" : "800px"};display:${__p(["navbar" , "mobile"],false)?__p(["navbar","tog"],false)?"flex":"none":"flex"};justify-content:space-between;align-items:${__p(["navbar" , "mobile"],false)?"flex-start":"center"};flex-direction:${__p(["navbar" , "mobile"],false)?"column":"row"};position:${__p(["navbar" , "mobile"],false)?"absolute":"static"};top:100%;gap:20px;left:0px;padding:${__p(["navbar" , "mobile"],false)?"20px":"0px"};border-bottom:${__p(["navbar","tog"],false)?`1px solid ${SYD_VAR.mainTheme_op.get()}`:"unset"};`
            },
            [
                // Center: links
                $(
                    "div",
                    { style: __sC["nav_links"]({method:"add",style:{alignItems:`${__p(["navbar" , "mobile"],false)?"flex-start":"center"}`,flexDirection:`${__p(["navbar" , "mobile"],false)?"column":"row"}`,width:"100%",justifyContent:"center"}}) },
                    [
                        __SYD.navLinks({value:"Home",link:"#p1"}),
                        __SYD.navLinks({value:"features",link:"#p3"}),
                        __SYD.navLinks({value:"Tokenomics",link:"#p4"}),
                        // __SYD.navLinks({value:"Documentation",link:"#"}),
                    ]
                ),

                // Right: actions
                $(
                    "div",
                    { style: __sC["nav_actions"]() },
                    [
                        $(
                            "button",
                            { style:`padding:15px 20px;background:${SYD_VAR.mainTheme.get()};border:2px solid ${"#000000"};border-radius:30px;overflow:hidden;display:flex;align-items:center;padding-left:15px;font-weight:900;cursor:pointer;min-width:max-content;color:${"#000000"};box-shadow:0 0 1px #ffffff67;`},
                            ["Launch Dex"]
                        ),
                    ]
                ),
        ]
      ),
      $(
        "div",
        {style:`cursor:pointer;height:35px;width:35px;background-image:url(./assets/image/menu.svg);display:${__p(["navbar" , "mobile"],false) ? "flex" : "none"};`},
        [],{genericStyle:["bg_fit"],events:{onclick:e=>{
            e.target.style.backgroundImage = __p(["navbar","tog"]) ? "url(./assets/image/menu.svg)" : "url(./assets/image/close.svg)"
            updateState({name:"navbar",prop:"tog",value:__p(["navbar","tog"])?false:true})
        }}}
      )
    ],
    {
        createState:{
            stateName:"navbar",
            state:{ mobile:false,float:false,tog:false,padding:"15px 40px",active:false }
        },
        mediaQuery:{
            query:[ {size:"<850px" , prop:{mobile:true,padding:"15px 20px"}} ],
            defState:{mobile:false,padding:"15px 20px",tog:false}
        }
    }
  );
};

__SYD.navLinks = function({value,link})
{
    return $(
        "a",
        {
            style:__sC["a_style"]({method:"add",style:{color:SYD_VAR.mainTheme.get(),padding:"5px;",borderRadius:"10px"}}),
            href:`${link}`
        },
        [
            `${value}`
        ],
        {
            events:{
                onmouseover:m_over,
                onmouseout:m_out
            }
        }
    )
}