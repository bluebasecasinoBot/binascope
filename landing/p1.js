import { $, __p, __sC, __SYD, SYD_VAR } from "./sydneyDom_v3.js";

__SYD["page1"] = () => {
  return $(
    "section",
    { style: `display:${"flex"};flex-direction:${__p(['page1','flex'],'row')};gap:20px;align-items:center;justify-content:center;min-height:100vh;width:100%;padding:${__p(['page1','flex'],'row')==="row"?"40px":"10px"};padding-top:90px;font-family:font1;`,class:"opacity-change"},
    [
        $(
            "div",
            {
                class:__p(["page1","active"],true)?"animated enter-bottom":"",
                style:`min-height:fit-content;height:100%;width:${__p(['page1','flex'],'row') === 'row' ? '70%' : '100%'};background:unset;display:flex;justify-content:center;align-items:flex-start;flex-direction:column;row-gap:20px`,//__sC["hero_section"]({method:"add",style:{zIndex:"100"}}) , class:"hero_section" 
                id:"p1"
            },
            [
                // Left column: headline
                $(
                    "div",
                    { style: __sC["hero_left"]() },
                    [
                        $(
                            "h1",
                            { style: __sC["hero_title"]({method:"add",style:{color:SYD_VAR.darkThemeText1.get(),fontFamily:"font1"}}) , class:"hero_title" },
                            [
                                $("p",{style:`color:${SYD_VAR.mainTheme.get()};font-family:header;font-size:${__p(["container","fontTitle"],"40px")};`},["BinaScope"]),
                                $(
                                    "p",
                                    {
                                        style:`font-size:${__p(["container","fontNormHeader"],"18px")};font-weight:300;`
                                    },
                                    [
                                        "BinaScope DEX combines real-time blockchain data, AI-driven insights, and advanced analytics to give traders a smarter edge in the crypto market — all in one sleek, intuitive platform."
                                    ]
                                ),
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
                                            { style:`padding:15px 20px;background:${SYD_VAR.mainTheme.get()};border:2px solid #000000;border-radius:30px;overflow:hidden;display:flex;align-items:center;padding-left:15px;font-weight:900;cursor:pointer;color:${"#000000"};`},
                                            ["Launch Dex"]
                                        ),
                                    ]
                                ),
                            ]
                        ),
                    ]
                ),
            ],
        ),
        $(
            "section",
            {
                style:`height:fit-content;width:100%;display:flex;justify-content:center;align-items:center;`,
                class:__p(["page1","active"],true)?"enter-top animated":"",
            },
            [
                $(
                    "div",
                    {
                        style:"height:fit-content;width:100%;background-image:url();"+__sC["row-center"]()
                    },[
                        // $("p",{style:"font-size:20px;color:#ffffff;font-family:font1;"},["SWAP WIDGET HERE"])
                        __SYD.swapToken_main_swap_el_main()
                    ],
                    {
                        genericStyle:["bg_cover"]
                    }
                )
            ]
        ),
    ],
    {
        createState:{
            stateName:"page1",
            state:{flex:"row",imgHeight:500,active:true}
        },
        mediaQuery:{
            query:[{size:"<900px",prop:{flex:"column"}},{size:"<400px",prop:{imgHeight:400}}],
            defState:{flex:"row",imgHeight:500}
        }
    }
  );
};