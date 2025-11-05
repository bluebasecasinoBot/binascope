import { $, __p, __sC, __SYD, SYD_VAR } from "./sydneyDom_v3.js";

__SYD["page5"] = () => {
  return $(
    "section",
    { class:__p(["page5","active"],false)?"opacity-change":"", style: `display:flex;flex-direction:${__p(['page5','flex'],'row')};gap:20px;align-items:center;justify-content:center;min-height:100vh;width:100%;padding:${__p(['page5','flex'],'row')==="row"?"40px":"10px"};padding-top:40px;opacity:${__p(["page5","active"],false)?"1":"0"}`},
    [
        $(
            "section",
            {
                style:`height:${__p(["page5","imgHeight"],500)}px;width:100%;display:flex;justify-content:center;align-items:center;`,
                class:__p(["page5","active"],false)?"scale-up animated":"",
            },
            [
                $(
                    "div",
                    {
                        style:"border-radius:30px;height:100%;height:100%;width:100%;background-image:url(./assets/image/dex.png);background-position:0%;"+__sC["row-center"]()+__sC["thinBorder"]({method:"add",style:{border:`1px solid ${SYD_VAR.mainTheme.get()}`}})+__sC["bx-shadow"]()
                    },[
                        $("p",{style:"font-size:20px;color:#ffffff;font-family:font1;"},[])
                    ],
                    {
                        genericStyle:["bg_cover"]
                    }
                )
            ]
        ),
        $(
            "div",
            {
                style:`min-height:fit-content;height:100%;width:${__p(['page5','flex'],'row') === 'row' ? '70%' : '100%'};background:unset;display:flex;justify-content:center;align-items:flex-start;flex-direction:column;row-gap:20px`//__sC["hero_section"]({method:"add",style:{zIndex:"100"}}) , class:"hero_section" 
            },
            [
                // Left column: headline
                $(
                    "div",
                    { style: __sC["hero_left"]({method:"add",style:{alignItems:"center"}}) },
                    [
                        $(
                            "h1",
                            { style: __sC["hero_title"]({method:"add",style:{color:SYD_VAR.darkThemeText1.get(),fontFamily:"font1"}}) , class:"hero_title" },
                            [
                                $("p",{class:__p(["page5","active"],false)?"enter-right animated":"",style:`font-family:header;font-weight:900;width:100%;text-align:center;font-size:${__p(["container","fontTitle"],"30px")};color:${SYD_VAR.mainTheme.get()};`},["The Binascope DEX"]),
                                $(
                                    "p",
                                    {
                                        class:__p(["page5","active"],false)?"enter-right animated":"",
                                        style:`width:100%;text-align:center;font-size:${__p(["container","fontNormHeader"],"18px")};font-weight:300;animation-delay:.4s;`
                                    },
                                    [
                                        "Built for speed, precision, and transparency, BinaScope DEX empowers traders with live market intelligence, wallet analytics, and smart contract safety tools to make better, faster decisions."
                                    ]
                                ),
                                // $("p",{},["$xingsworld"])
                            ]
                        ),
                        $(
                            "div",
                            { style: __sC["nav_actions"]() },
                            [
                                $(
                                    "div",
                                    { style: __sC["nav_actions"]() },
                                    [
                                        $(
                                            "button",
                                            { class:__p(["page5","active"],false)?"enter-right animated":"",style:`padding:15px 20px;background:${SYD_VAR.mainTheme.get()};border:2px solid #000000;border-radius:30px;overflow:hidden;display:flex;align-items:center;padding-left:15px;font-weight:900;cursor:pointer;color:${"#000000"};animation-delay:.7s;`},
                                            ["Get started"]
                                        ),
                                    ]
                                ),
                            ]
                        ),
                    ]
                ),
            ],
        )
    ],
    {
        createState:{
            stateName:"page5",
            state:{flex:"row",imgHeight:500,active:false}
        },
        mediaQuery:{
            query:[{size:"<900px",prop:{flex:"column-reverse"}},{size:"<400px",prop:{imgHeight:400}}],
            defState:{flex:"row",imgHeight:500}
        }
    }
  );
};