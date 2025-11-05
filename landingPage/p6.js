import { $, __p, __sC, __SYD, SYD_VAR } from "./sydneyDom_v3.js";

__SYD["page6"] = function()
{
    return $(
        "div",
        {
            class:__p(["page6","active"],false)?"opacity-change":"",
            style: `display:flex;flex-direction:column;gap:20px;align-items:center;justify-content:center;min-height:fit-content;width:100%;padding:${__p(['page6','flex'],'row')==="row"?"60px 40px":"60px 10px"};padding-top:10px;font-family:font1;opacity:${__p(["page6","active"],false)?"1":"0"}`
        },
        [
            $("p", {
            class:__p(["page6","active"],false)?"enter-top animated":"",
            style: `font-family:header;font-size:${__p(["container","fontTitle"],"30px")}; font-weight:900; color:${SYD_VAR.darkThemeText1.get()};`
            }, ["Decentralized by Design"]),
            $("p", {
                style: `font-size:${__p(["container","fontNormHeader"],"18px")}; color:${SYD_VAR.darkThemeText1.get()}; max-width:800px;text-align:center;`},
                ["Built on the principles of transparency and trustlessness, BinaScope ensures users stay in full control of their assets — no intermediaries, no barriers, just pure on-chain freedom."]
            ),
            $(
                "div",
                {style:__sC["row-center"]({method:"add",style:{gap:"20px",flexWrap:"wrap",alignItems:"center",width:"100%"}})},
                [
                    __SYD.p6_card({cname:"True Ownership, True Freedom",des:"Your keys. Your wallet. Your data. BinaScope operates on a decentralized foundation where power stays where it belongs — with you.",icon:"support.svg"}),
                    __SYD.p6_card({cname:"Trustless. Transparent. On-Chain",des:"BinaScope removes central control and replaces it with secure, verifiable blockchain logic, ensuring every action and interaction lives on the chain — visible, immutable, and independent.",icon:"chain.svg",dly:".3s"}),
                    __SYD.p6_card({cname:"Engineered for On-Chain Integrity",des:"No hidden systems, no back doors. BinaScope is architected for secure, decentralized performance, giving users autonomy and confidence in every trade and analytics tool.",icon:"reward.svg",dly:".7s"}),
                    __SYD.p6_card({cname:"Power to the User",des:"We believe in a world where financial tools aren’t controlled by institutions — they're built for individual sovereignty. BinaScope puts decentralized power directly in your hands.",icon:"power.svg",dly:".7s"}),
                ]
            ),
        ],
        {
            createState:{
                stateName:"page6",
                state:{flex:"row",imgHeight:500,active:false}
            },
            mediaQuery:{
                query:[{size:"<900px",prop:{flex:"column-reverse"}},{size:"<400px",prop:{imgHeight:400}}],
                defState:{flex:"row",imgHeight:500}
            }
        }
    )
}

__SYD.p6_card = function({cname="" , des="" , icon="" , dly="0s"}={})
{
    return $(
        "div",
        {
            style:`min-height:210px;background-color:${SYD_VAR.nav_bg.get()};height:fit-content;width:100%;max-width:400px;border-radius:10px;padding:20px;animation-delay:${dly};`+__sC["col-start"]({method:"add",style:{gap:"10px"}})+__sC["thinBorder"](),
            class:__p(["page6","active"],false)?"enter-bottom animated":"",
        },
        [
            $(
                "span",
                {style:`height:40px;width:40px;min-width:40px;background-image:url(./assets/image/${icon});`},
                [],
                {genericStyle:["bg_cover"]}
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
                                { style:`text-transform:capitalize;font-size:${__p(["container","fontNormHeader"],"18px")};font-weight:700;color:${SYD_VAR.darkThemeText1.get()};` },[ `${cname}` ]
                            ),
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