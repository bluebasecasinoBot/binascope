import { $, __p, __sC, __SYD, SYD_VAR } from "./sydneyDom_v3.js";

__SYD.footer = function()
{
    return $(
        "footer",
        {style:`display:flex;flex-direction:row;flex-wrap:wrap;gap:20px;align-items:flex-start;justify-content:flex-start;min-height:40vh;width:100%;padding:${__p(['page5','flex'],'row')==="row"?"40px":"10px"};padding-top:90px;font-family:font1;background-color: ${SYD_VAR.nav_bg.get()};`},
        [
            __SYD.footer_1(),
            __SYD.footer_2(),
            __SYD.footer_3(),
            // __SYD.footer_4(),
            // __SYD.footer_5(),
        ]
    )
}

__SYD.footer_1 = function()
{
    return $(
        "div",
        {style:`min-height:250px;height:fit-content;width:100%;max-width:300px;border-radius:10px;padding:20px;`+__sC["col-start"]({method:"add",style:{alignItems:"flex-start",gap:"20px"}})},
        [
            $(
                "span",
                {style:"height:50px;width:50px;min-width:50px;border-radius:50%;background-image:url(./assets/image/logo1.png);"},
                [],
                {genericStyle:["bg_cover"]}
            ),
            $(
                "p",
                { style:`font-size:${__p(["container","fontHeader"],"16px")};font-weight:300;color:${SYD_VAR.darkThemeText1.get()};` },[ "BinaScope — empowering traders with transparency." ]
            ),
            $(
                "div",
                {style:__sC["row-start"]({method:"add",style:{gap:"20px",width:"100%"}})},
                [
                    __SYD.footer_1_i({icon:"x.svg"}),
                    __SYD.footer_1_i({icon:"tg.svg"}),
                    __SYD.footer_1_i({icon:"fb.svg"})
                ]
            )
        ]
    )
}

__SYD.footer_2 = function()
{
    return $(
        "div",
        {style:`min-height:250px;height:fit-content;width:100%;max-width:200px;border-radius:10px;padding:20px;`+__sC["col-start"]({method:"add",style:{alignItems:"flex-start",gap:"20px"}})},
        [
            $(
                "p",
                { style:`text-transform:capitalize;font-size:${__p(["container","fontNormHeader"],"18px")};font-weight:700;color:${SYD_VAR.darkThemeText1.get()};` },[ `Explore` ]
            ),
            $(
                "div",
                {style:__sC["col-start"]({method:"add",style:{gap:"20px",width:"100%"}})},
                [
                    __SYD.navLinks({value:"Home",link:"#p1"}),
                    __SYD.navLinks({value:"Features",link:"#p3"}),
                    __SYD.navLinks({value:"Tokenomics",link:"#p4"}),
                ]
            )
        ]
    )
}

__SYD.footer_3 = function()
{
    return $(
        "div",
        {style:`min-height:250px;height:fit-content;width:100%;max-width:200px;border-radius:10px;padding:20px;`+__sC["col-start"]({method:"add",style:{alignItems:"flex-start",gap:"20px"}})},
        [
            $(
                "p",
                { style:`text-transform:capitalize;font-size:${__p(["container","fontNormHeader"],"18px")};font-weight:700;color:${SYD_VAR.darkThemeText1.get()};` },[ `Dex Utilities` ]
            ),
            $(
                "div",
                {style:__sC["col-start"]({method:"add",style:{gap:"20px",width:"100%"}})},
                [
                    __SYD.navLinks({value:"Live Trends",link:"../"}),
                    __SYD.navLinks({value:"Wallet Dashboard",link:"../"}),
                    __SYD.navLinks({value:"Trending Tokens",link:"../"}),
                    __SYD.navLinks({value:"Token insight",link:"../"}),
                    __SYD.navLinks({value:"Wallet Analytics",link:"../"}),
                    __SYD.navLinks({value:"Contract Scanner",link:"../"}),
                ]
            )
        ]
    )
}

__SYD.footer_4 = function()
{
    return $(
        "div",
        {style:`min-height:250px;height:fit-content;width:100%;max-width:200px;border-radius:10px;padding:20px;`+__sC["col-start"]({method:"add",style:{alignItems:"flex-start",gap:"20px"}})},
        [
            $(
                "p",
                { style:`text-transform:capitalize;font-size:${__p(["container","fontNormHeader"],"18px")};font-weight:700;color:${SYD_VAR.darkThemeText1.get()};` },[ `Resources` ]
            ),
            $(
                "div",
                {style:__sC["col-start"]({method:"add",style:{gap:"20px",width:"100%"}})},
                [
                    __SYD.navLinks({value:"Documentations",link:"#"}),
                    __SYD.navLinks({value:"Blog",link:"#"}),
                    __SYD.navLinks({value:"Faqs",link:"#"}),
                    __SYD.navLinks({value:"Support",link:"#"}),
                    __SYD.navLinks({value:"About Us",link:"#"}),
                ]
            )
        ]
    )
}

__SYD.footer_5 = function()
{
    return $(
        "div",
        {style:`min-height:250px;height:fit-content;width:100%;max-width:200px;border-radius:10px;padding:20px;`+__sC["col-start"]({method:"add",style:{alignItems:"flex-start",gap:"20px"}})},
        [
            $(
                "p",
                { style:`text-transform:capitalize;font-size:${__p(["container","fontNormHeader"],"18px")};font-weight:700;color:${SYD_VAR.darkThemeText1.get()};` },[ `Support` ]
            ),
            $(
                "div",
                {style:__sC["col-start"]({method:"add",style:{gap:"20px",width:"100%"}})},
                [
                    __SYD.navLinks({value:"Get Help",link:"#"}),
                    __SYD.navLinks({value:"Trouble shooting",link:"#"}),
                    __SYD.navLinks({value:"Legacy Products",link:"#"})
                ]
            )
        ]
    )
}

__SYD.footer_1_i = function({icon="logo1.png",link="#"}={})
{
    return $(
        "a",
        {
            style:"height:30px;width:30px;",
            href:link
        },
        [
            $(
                "span",
                {style:`display:block;min-height:30px;width:30px;min-width:30px;border-radius:50%;background-image:url(./assets/image/${icon});`},[],
                {genericStyle:["bg_fit"]}
            )
        ]
    )
}