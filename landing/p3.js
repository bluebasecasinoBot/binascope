import { $, __p, __sC, __SYD, SYD_VAR } from "./sydneyDom_v3.js";

__SYD["page3"] = function()
{
    return $(
        "div",
        {
            class:__p(["page3","active"],false)?"opacity-change":"",
            style: `display:flex;flex-direction:row;gap:20px;align-items:center;justify-content:center;flex-wrap:wrap;min-height:100vh;width:100%;padding:${__p(['page3','flex'],'row')==="row"?"40px":"10px"};padding-top:120px;font-family:font1;opacity:${__p(["page2","active"],false)?"1":"0"}`,
            id:"p3"
        },
        [
            $("div", {
                style: "display:flex; flex-direction:column; gap:20px;width:100%;align-items:center;",
                class:__p(["page3","active"],false)?"enter-top animated":"",
            },
            [
                $("p", {
                style: `width:fit-content;font-size:${__p(["container","fontTitle"],"30px")}; font-weight:300; color:${SYD_VAR.darkThemeText1.get()}; margin-bottom:20px;padding:15px 30px;border-radius:40px;background-color:${SYD_VAR.nav_bg.get()};`+__sC["thinBorder"]()
                }, ["Our Features"]),
                
                $("p", {
                style: `font-size:${__p(["container","fontNormHeader"],"18px")}; color:${SYD_VAR.darkThemeText1.get()}; max-width:unset;text-align:center`
                }, ["Unlock powerful real-time intelligence built for modern crypto traders. From live market trends to smart-money analytics and instant contract security checks, Binascope equips you with every tool you need to trade confidently and stay ahead of the market."])
            ]),

            $("div", {
                style: "display:flex; flex-wrap:wrap; gap:30px;width:100%;"
            },[
                $("div", 
                {style: "flex:1; min-width:300px;"},
                [
                    $("ul", {style: "list-style:none; padding:0; display:flex; flex-direction:column; gap:20px;color:#fff;"},
                    [
                        __SYD.p3_list({lTitle:"BinaScope AI",lDes:"A dynamic AI engine that scans market movements, sentiment flows, whale behavior, and chart structures in real-time to give actionable insights, early alerts, and adaptive trading suggestions based on live market conditions.",icon:"ai.svg",dly:".1s"}),
                        __SYD.p3_list({lTitle:"Live Trends",lDes:"Monitor the crypto market as it evolves. Live charts, price shifts, volume surges, liquidity changes, and sentiment signals — all streaming in real-time. Binascope helps you react instantly to market momentum and never miss a breakout opportunity.",icon:"live.svg"}),
                        __SYD.p3_list({lTitle:"Wallet Dashboard",lDes:"View and manage your wallet performance in one seamless dashboard. Track token balances, real-time PnL, realized gains, asset allocations, and historical performance. Whether you're managing one wallet or a multi-wallet ecosystem, Binascope delivers clarity and control in seconds.",icon:"wallet.svg",dly:".2s"}),
                    ])
                ]),
                
                // Image container (purple highlighted section)
                $("div", {
                style: "flex:1; min-width:300px; background-color:transparent; display:flex; flex-direction:column;align-items:center; justify-content:center; border-radius:8px; padding:unset; height:100%; box-sizing:border-box;",
                class:__p(["page3","active"],false)?"enter-right animated":""
                }, [
                $("div", {
                    style: "width:100%; height:400px; object-fit:contain;background-image:url(./assets/image/bnb_feature.png);border-radius:20px;"
                },[],{genericStyle:["bg_fit"]}),
                ]),
                __SYD.p3_list({lTitle:"Trending Tokens",lDes:"Discover projects gaining acceleration across on-chain activity, volume, liquidity shifts, and social hype. Our algorithm surfaces early price action & emerging narratives so you can position smartly — before the mainstream catches up.",icon:"trend.svg",dly:".4s"}),
                __SYD.p3_list({lTitle:"Token Insight",lDes:"Analyze any token like a pro — from contract details to liquidity locks, holder distribution, whale actions, security flags, and trust signals. Binascope simplifies complex blockchain data into actionable insights so you can trade with confidence and avoid threats.",icon:"token.svg",dly:".6s"}),
                __SYD.p3_list({lTitle:"Wallet Analytics",lDes:"Follow the wallets that move markets. Identify whale activity, view profit/loss behavior, token entry points, and long-term patterns. Binascope helps you understand how successful traders operate — and replicate winning strategies in real time.",icon:"analytic.svg",dly:".8s"}),
                __SYD.p3_list({lTitle:"Contract Scanner",lDes:"Quickly audit any contract to identify honeypot risks, suspicious functions, liquidity vulnerabilities, admin controls, and hidden mechanisms. Our scanner flags threats instantly so you don't fall victim to exploits, rugs, or manipulator-friendly code.",icon:"scan.svg",dly:"1s"}),
                $("div", {
                style: "flex:1; min-width:300px; background-color:transparent; display:flex; flex-direction:column;align-items:center; justify-content:center; border-radius:8px; padding:unset; height:100%; box-sizing:border-box;",
                class:__p(["page3","active"],false)?"enter-right animated":""
                }, [
                $("div", {
                    style: "width:100%; height:400px; object-fit:contain;background-image:url(./assets/image/p3.png);border-radius:20px;"
                },[],{genericStyle:["bg_fit"]}),
                ]),
            ])
        ],
        {
            createState:{
                stateName:"page3",
                state:{flex:"row",imgHeight:500,active:false}
            },
            mediaQuery:{
                query:[{size:"<900px",prop:{flex:"column-reverse"}},{size:"<400px",prop:{imgHeight:400}}],
                defState:{flex:"row",imgHeight:500}
            }
        }
    )
}

__SYD.p3_list = function({lTitle="" , lDes="" , icon="" , dly="0s"}={})
{
    return $("li",
            {style: `display:flex;flex-direction:column; align-items:flex-start; gap:20px; font-size:1.1rem;animation-delay:${dly};background-color:${SYD_VAR.nav_bg.get()};padding:20px;border-radius:20px;`+__sC["thinBorder"](),class:__p(["page3","active"],false)?"enter-left animated":"",},
            [
                $(
                    "div",
                    {style:__sC["row-start"]({method:"add",style:{gap:"20px"}})},
                    [
                        $("span",
                        {
                            style: `min-width:40px;width:40px; height:40px; font-size:20px;background-image:url(./assets/image/${icon});`
                        },[],{genericStyle:["bg_cover"]}),
                        $(
                            "p",
                            { style:`font-family:header;font-size:${__p(["container","fontNormHeader"],"18px")};font-weight:700;color:${SYD_VAR.mainTheme.get()};` },[ `${lTitle}` ]
                        ),
                    ]
                ),
                $("span", {
                    style: "font-weight:600;"+__sC["col-start"]({method:"add",style:{gap:"10px"}})
                },[
                    $(
                        "p",
                        { style:`font-size:${__p(["container","fontHeader"],"16px")};font-weight:300;color:${SYD_VAR.darkThemeText1.get()};` },[ `${lDes}` ]
                    ),
                ])
        ]
    )
}