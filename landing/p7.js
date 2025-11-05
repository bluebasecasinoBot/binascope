import { $, __p, __sC, __SYD, SYD_VAR } from "./sydneyDom_v3.js";

__SYD["page7"] = () => {
  return $(
    "section",
    { class:__p(["page7","active"],false)?"opacity-change":"",style: `display:flex;flex-direction:${__p(['page7','flex'],'row')};gap:20px;align-items:center;justify-content:center;min-height:100vh;width:100%;padding:${__p(['page7','flex'],'row')==="row"?"40px":"10px"};padding-top:90px;opacity:${__p(["page7","active"],false)?"1":"0"}`},
    [
        $(
            "div",
            {
                style:`min-height:fit-content;height:100%;width:${__p(['page7','flex'],'row') === 'row' ? '70%' : '100%'};background:unset;display:flex;justify-content:center;align-items:flex-start;flex-direction:column;row-gap:20px`//__sC["hero_section"]({method:"add",style:{zIndex:"100"}}) , class:"hero_section" 
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
                                $("p",{class:__p(["page7","active"],false)?"enter-left animated":"",style:`font-family:header;font-weight:900;width:100%;text-align:${__p(['page7','flex'],'row')==="row"?"flex-start":"center"};font-size:${__p(["container","fontTitle"],"30px")};`},["Stay Ahead of the Market"]),
                                $(
                                    "p",
                                    {
                                        class:__p(["page7","active"],false)?"enter-left animated":"",
                                        style:`width:100%;text-align:${__p(['page7','flex'],'row')==="row"?"flex-start":"center"};font-size:${__p(["container","fontNormHeader"],"18px")};font-weight:300;animation-delay:.2s;`
                                    },
                                    [
                                        "Be part of the journey. Stay informed, stay ahead."
                                    ]
                                ),
                                // $("p",{},["$xingsworld"])
                            ]
                        ),
                        $(
                            "div",
                            { class:__p(["page7","active"],false)?"enter-left animated":"",style: __sC["nav_actions"]({method:"add",style:{width:"100%",maxWidth:"800px",animationDelay:".4s"}}) },
                            [
                                $(
                                    "div",
                                    { style: __sC["nav_actions"]({method:"add",style:{width:"100%"}})},
                                    [
                                        // $(
                                        //     "button",
                                        //     { style:`padding:15px 20px;background:${SYD_VAR.mainTheme.get()};border:2px solid #ffffff;border-radius:30px;overflow:hidden;display:flex;align-items:center;padding-left:15px;font-weight:900;cursor:pointer;color:${SYD_VAR.darkThemeText1.get()};`},
                                        //     ["Connect wallet"]
                                        // ),
                                        __SYD.p7_input()
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
                style:`height:${__p(["page7","imgHeight"],500)}px;width:100%;display:flex;justify-content:center;align-items:center;`,
                class:__p(["page7","active"],false)?"scale-up animated":"",
            },
            [
                $(
                    "div",
                    {
                        style:"height:100%;height:100%;width:100%;background-image:url(./assets/image/p7.png);"+__sC["row-center"]()
                    },[
                        $("p",{style:"font-size:20px;color:#ffffff;font-family:font1;"},[])
                    ],
                    {
                        genericStyle:["bg_fit"]
                    }
                )
            ]
        ),
    ],
    {
        createState:{
            stateName:"page7",
            state:{flex:"row",imgHeight:500,active:false}
        },
        mediaQuery:{
            query:[{size:"<900px",prop:{flex:"column-reverse"}},{size:"<400px",prop:{imgHeight:400}}],
            defState:{flex:"row",imgHeight:500}
        }
    }
  );
};

__SYD.p7_input = function()
{
    return $(
        "div",
        {style:`height:fit-content;width:100%;position:relative;overflow:hidden;border-radius:20px;border-top-right-radius:unset;border-bottom-right-radius:unset;border:2px solid ${SYD_VAR.darkThemeText1.get()};padding:5px`},
        [
            $(
                "input",
                {style:`border:unset;outline:unset;height:40px;width:100%;background-color:transparent;padding:0 10px;font-weight:700;font-family:font1;color:${SYD_VAR.darkThemeText1.get()};`,placeholder:"Enter Your Email"}
            ),
            $(
                "button",
                {style:__sC["row-center"]()+`height:100%;width:fit-content;padding:10px;border:unset;font-weight:700;font-size:${__p(["container","fontSmall"],"13px")};position:absolute;top:0px;right:0px;background:${SYD_VAR.mainTheme.get()};color:#ffffff;cursor:pointer;`},
                [
                    "subscribe"
                ]
            )
        ]
    )
}