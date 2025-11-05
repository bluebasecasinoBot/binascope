import { $, __p, __sC, __SYD, SYD_VAR } from "./sydneyDom_v3.js";

__SYD["page4"] = function()
{
    return $(
        "div",
        {
            class:__p(["page4","active"],false)?"opacity-change":"",
            style: `display:flex;flex-direction:column;gap:20px;align-items:center;justify-content:center;min-height:fit-content;width:100%;padding:${__p(['page4','flex'],'row')==="row"?"60px 40px":"60px 10px"};padding-top:40px;font-family:font1;opacity:${__p(["page4","active"],false)?"1":"0"}`,
            id:"p4"
        },
        [
            $("p", {
            style: `font-family:header;font-size:${__p(["container","fontTitle"],"30px")}; font-weight:900; color:${SYD_VAR.mainTheme.get()};`,
            class:__p(["page4","active"],false)?"enter-top animated":"",
            }, ["Binascope Tokenomics"]),
            $("p", {
                style: `font-size:${__p(["container","fontNormHeader"],"18px")}; color:${SYD_VAR.darkThemeText1.get()}; max-width:800px;text-align:center;`,
                class:__p(["page4","active"],false)?"enter-top animated":"",
            },
                ["BinaScope tokenomics are designed to support real utility, reward active users, and fuel long-term ecosystem growth across our AI-powered trading platform."]
            ),
            $(
                "div",
                {style:__sC["row-center"]({method:"add",style:{gap:"20px",flexWrap:"wrap",alignItems:"center",width:"100%"}})},
                [
                    __SYD.p4_card({cname:"Deflationary Supply",des:"A capped token supply paired with automatic burn cycles helps maintain scarcity and long-term value. As platform activity increases, a portion of fees is burned, reducing circulating supply and rewarding early adopters with growing token strength.",price:10000,change:10.5}),
                    __SYD.p4_card({cname:"Utility Access",des:"This token is the core fuel of the BinaScope ecosystem. Holders unlock premium AI trading tools, contract scanning features, real-time analytics, and advanced insights — making it essential for users who want full access to high-performance trading intelligence.",price:10000,change:-1.5}),
                    __SYD.p4_card({cname:"Staking Rewards",des:"Token holders can stake to earn ongoing rewards sourced from platform usage and fee distribution. The more value generated in the ecosystem, the more passive income stakers receive, encouraging long-term participation and community growth.",price:10000,change:-4.5}),
                    __SYD.p4_card({cname:"Governance Power",des:"BinaScope token holders play an active role in key platform decisions. From feature updates to AI development priorities and treasury allocation, holders influence the evolution of the ecosystem and guide its direction through decentralized voting.",price:10000,change:-4.5}),
                    __SYD.p4_card({cname:"Liquidity Support",des:"Strong liquidity pools help maintain price stability and smooth trading experiences. Automated liquidity mechanisms ensure deep markets and reduce volatility, enabling new users to enter the ecosystem confidently while supporting sustainable token growth.",price:10000,change:-4.5}),
                ]
            ),
        ],
        {
            createState:{
                stateName:"page4",
                state:{flex:"row",imgHeight:500,active:false}
            },
            mediaQuery:{
                query:[{size:"<900px",prop:{flex:"column-reverse"}},{size:"<400px",prop:{imgHeight:400}}],
                defState:{flex:"row",imgHeight:500}
            }
        }
    )
}

__SYD.p4_card = function({cname="" , des=""}={})
{
    return $(
        "div",
        {
            style:`height:fit-content;width:100%;max-width:400px;background-color:${SYD_VAR.nav_bg.get()};padding:20px;border-radius:20px;`+__sC["row-start"]({method:"add",style:{gap:"10px",flexDirection:"column"}})+__sC["thinBorder"](),
            class:__p(["page4","active"],false)?"animated scale-up":"",
        },
        [
            $(
                "div",
                {style:__sC["row-start"]({method:"add",style:{width:"100%",gap:"20px",justifyContent:"flex-start"}})},
                [
                    $(
                        "span",
                        {style:"height:40px;width:40px;min-width:40px;border-radius:50%;background-image:url(./assets/image/logo_favicon.png);"},
                        [],
                        {genericStyle:["bg_cover"]}
                    ),
                    $(
                        "p",
                        { style:`font-family:header;font-size:${__p(["container","fontNormHeader"],"18px")};font-weight:700;color:${SYD_VAR.darkThemeText1.get()};` },[ `${cname}` ]
                    ),
                ]
            ),
            $(
                "div",
                {style:__sC["col-start"]({method:"add",style:{gap:"15px",height:"100%",width:"100%",justifyContent:"space-between"}})},
                [
                    $(
                        "div",
                        {style:__sC["col-start"]({method:"add",style:{gap:"15px",width:"100%"}})},
                        [
                            $(
                                "p",
                                { style:`font-size:${__p(["container","fontHeader"],"16px")};font-weight:300;color:${SYD_VAR.darkThemeText1.get()};` },[ `${des}` ]
                            )
                        ]
                    )
                ]
            )
        ]
    )
}