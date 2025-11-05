import { __SYD, $, __sC, SYD_VAR, __p } from './sydneyDom_v3.js'

__SYD.sliderMain = () =>{
    const el = () =>{
        const element = [];
        const platforms = SYD_VAR.platforms.get()
        for(let i = 0; i < platforms.length; i++)
        {
            const {platform , icon} = platforms[i]
            element.push(__SYD.addNavElement({platform , icon}))
        }
        return element
    }
    return $(
        'div',
        {
            style:`scroll-behaviour:${__p(["sliderMain","isEnd"],false)?"unset":"smooth"};height:100px;width:100%;transform-origin:center;z-index:500;border-bottom:2px solid #171717;user-select:none;overflow-x:scroll;pointer-events:none;`+__sC["thinBorder"](),
            id:"sliderMain"
        },
        [
            $(
                'div',
                {
                    style:`height:100%;min-width:fit-content;background:${SYD_VAR.nav_bg.get()};display:flex;column-gap:${__p(["sliderMain","mobile"],false)?"70px":"150px"};padding:0 15px;`,
                    class:"slider_anime"
                },
                [
                    ...el()
                ]
            )
        ],
        {
            createState:{
                stateName:"sliderMain",
                state:{isEnd:false,mobile:false}
            },
            mediaQuery:{
                query:[{size:"<500px",prop:{mobile:true}}],
                defState:{mobile:false}
            }
        }
    )
}

__SYD.sliderMain2 = () =>{
    const el = () =>{
        const element = [];
        for(let i = 0; i < 15; i++)
        {
            element.push(__SYD.addNavElement())
        }
        return element
    }
    return $(
        'div',
        {
            style:'height:60px;width:100%;position:absolute;bottom:0px;transform-origin:center;transform:translateY(50%);z-index:500;border-bottom:2px solid #171717;user-select:none;'
        },
        [
            $(
                'div',
                {
                    style:'height:100%;min-width:fit-content;background:#FFD633;display:flex;column-gap:50px;padding:0 15px;',
                    class:"slider_anime"
                },
                [
                    ...el()
                ]
            )
        ]
    )
}

__SYD.addNavElement = ({platform="Flash Dex" , icon="logo1.png"}={}) =>{
    return $(
        'div',
        {
            style:'height:100%;width:fit-content;display:flex;column-gap:15px;align-items:center'
        },
        [
            $('div',{height:'60px',width:'60px',style:`border-radius:50%;min-height:60px;min-width:60px;background-image:url(./assets/image/${icon});`},[],{genericStyle:["bg_cover"]}),
            $('p',{style:`font-size:${__p(["sliderMain","mobile"],false)?"25px":"40px"};text-transform:uppercase;font-weight:900;width:max-content;font-family:font1;color:${SYD_VAR.darkThemeText1.get()};`},[platform])
        ]
    )
}