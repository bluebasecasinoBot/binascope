import { __g, __p, __u } from "../sydneyDom_v3.js"

export const login_sigup_display = () =>{
    return `display:${__p(["container" , "renderMain"],0) == 0 ? "flex" : "none"};`
}

//login_signup_tab_container screen state
export const coverScreenState_login_signup_tab_container = () =>{
    return `${__p(["login_signup__tab_container" , "coverScreen"],false) ? "" : "max-height:600px;max-width:600px;"};`
}
//login_signup_tab_container screen state

//login_signup_tab_container screen state
export const paddState_login_signup_tab_container = () =>{
    return `padding:${__p(["login_signup__tab_container" , "coverScreen"],false) ? "30px 10px" : "30px"};`
}
//login_signup_tab_container screen state

//login_signup_tab_container screen state
export const header_login_signup_tab = () =>{
    return `font-size:${__p(["login_signup__tab_container" , "coverScreen"],false) ? "25px" : "35px"};`
}
//login_signup_tab_container screen state

//login_signup_tab_container tab state
export const tabState__login_signup_tab = (index) =>{
    return `display:${__p(["login_signup__tab_container" , "renderTab"],0) == index ? "flex" : "none"};`
}
//login_signup_tab_container tab state

//Update states function
export const updateState = ({name , prop , value}) =>{
    const state = __g(name);
    state[`${prop}`] = value;
    __u(name , {type:"a" , value:state});
}
//Update states function

//Update states function multi-route
export const updateState__ = ({name , prop = [] , value}) =>{
    const state = __g(name);
    let copy = state
    for(let i = 0; i < prop.length; i++)
    {
        if(i === prop.length-1)
        {
            copy[prop[i]] = value;
        }else copy = copy[prop[i]]
    }
    __u(name , {type:"a" , value:state})
}
//Update states function multi-route

//Update states function multi-route
export const updateState__push = ({name , prop = [] , value}) =>{
    const state = __g(name);
    let copy = state
    for(let i = 0; i < prop.length; i++)
    {
        if(i === prop.length-1)
        {
            copy[prop[i]].push(value);
        }else copy = copy[prop[i]]
    }
    __u(name , {type:"a" , value:state})
}
//Update states function multi-route

//bulk state update
export const updateState__bulk = ({name , task = ()=>{}}) =>{
    __u(name , {type:"a" , value:task(__g(name))});
}
//bulk state update


//mainPage
export const mainPage__display = () =>{
    return `display:${__p(["container" , "renderMainPage"],true) ? "flex" : "none"};`
}
//mainPage

//main page header tab check
export const mainPage_topTab_display = () =>{
    return `display:${__p(["container" , "renderTopTab"],true) ? "flex" : "none"};`
}
export const mainPage__topTab_tab = (index) =>{
    return `display:${__p(["mainPage__topTab" , "renderTab"],0) == index ? "flex" : "none"};`
}
//main page header tab check

//topTab wallet_adx_section
export const mainPage__topTab__main_wallet_adx_displayState = () =>{
    return `display:${__p(["mainPage__topTab__main_wallet_adx_section" , "self_display"],false) ? "flex" : "none"};`
}
//topTab wallet_adx_section


//mainPage header
export const mainPage__header = () =>{
    return `font-size:${__p(["mainPage__mainDisplay_1" , "mobileState__font"],false) ? "20px" : "30px"};`
}
//mainPage header

//mainPage mainDisplay_1_logo
export const mainPage__mainDisplay_1_logo__size = () =>{
    return `${__p(["mainPage__mainDisplay_1" , "mobileState__font"],false) ? "height:150px;width:100%;" : "height:250px;width:100%;"}`
}
//mainPage mainDisplay_1_logo

//mainPage mainPage__mainDisplay_1_walletAdx_sec__main_wallet__el__display
export const mainPage__mainDisplay_1_walletAdx_sec__main_wallet__el__display = (ref) =>{
    return `display:${__p(["container" , "user" , "walletsAdxDisplay" , ref],true) ? "flex" : "none"};`
}
//mainPage mainPage__mainDisplay_1_walletAdx_sec__main_wallet__el__display



//manageToken page
export const manageToken__display = () =>{
    return `display:${__p(["container" , "renderManageWalletTab"],false) ? "flex" : "none"};`
}
//manageToken page

// manageToken manageToken__wallet_setting_tabs__el__display
export const manageToken__wallet_setting_tabs__el__display = (tokenName) =>{
    return `display:${__p(["manageToken" , "search_active"],false) ? tokenName.includes(__p(["manageToken" , "search_value"],"")) ? "flex" : "none" : "flex"};`
}
// manageToken manageToken__wallet_setting_tabs__el__display




//selectToken page
export const selectToken__display = () =>{
    return `display:${__p(["container" , "renderSelectWalletTab"],false) ? "flex" : "none"};`
}
//selectToken page

// selectToken selectToken__wallet_setting_tabs__el__display
export const selectToken__wallet_setting_tabs__el__display = (tokenName) =>{
    return `display:${__p(["selectToken" , "search_active"],false) ? tokenName.includes(__p(["selectToken" , "search_value"],"")) ? "flex" : "none" : "flex"};`
}
// selectToken selectToken__wallet_setting_tabs__el__display



//swapToken page
export const swapToken_main__display = () =>{
    return `display:${__p(["container" , "renderSwapToken_main"],false) ? "flex" : "none"};` //temporal state
}

export const swapToken_main__token_display_panel_section_mode_popup_displayState = () =>{
    return `display:${__p(["swapToken_main__token_display_panel_section_mode_popup" , "self_display"],false) ? "flex" : "none"};`
}

export const selectToken_swap_display_panel_section_mode_popup__searchType_displayState = () =>{
    return `display:${__p(["selectToken_swap_display_panel_section_mode_popup__searchType" , "self_display"],false) ? "flex" : "none"};`
}

export const selectToken_swap_display_panel_section_mode_popup_displayState = () =>{
    return `display:${__p(["selectToken_swap_display_panel_section_mode_popup" , "self_display"],false) ? "flex" : "none"};`
}

//swap select token tab
export const selectToken_swap__display = () =>{
    return `display:${__p(["container" , "renderDynamicSelectToken"],false) ? "flex" : "none"};`
}
//swap select token tab
//swapToken page

// swapToken selectToken__wallet_setting_tabs__el__display
export const swapToken_main__wallet_setting_tabs__el__display = (tokenName) =>{
    return `display:${__p(["swapToken_main" , "search_active"],false) ? tokenName.includes(__p(["swapToken_main" , "search_value"],"")) ? "flex" : "none" : "flex"};`
}

export const updateScrollEl = (el) =>{
    const clientWidth = Math.floor(el.clientWidth);
    const scrollLeft = Math.floor(el.scrollLeft);
    const scrollWidth = Math.floor(el.scrollWidth);
    const startBool = __p(["selectToken_swap_display_panel_section_mode" , "scrollStart"]);
    const endBool = __p(["selectToken_swap_display_panel_section_mode" , "scrollEnd"]);

    //start scroller
    if(scrollLeft === 0)
    {
        if(startBool) updateState({name:"selectToken_swap_display_panel_section_mode",prop:"scrollStart" , value:false})
    }
    else{
        if(!startBool) updateState({name:"selectToken_swap_display_panel_section_mode",prop:"scrollStart" , value:true})
    }
    //start scroller

    //End scroller
    if((scrollLeft + clientWidth) >= scrollWidth)
    {
        if(endBool) updateState({name:"selectToken_swap_display_panel_section_mode",prop:"scrollEnd" , value:false})
    }
    else{
        if(!endBool) updateState({name:"selectToken_swap_display_panel_section_mode",prop:"scrollEnd" , value:true})
    }
    //End scroller
}
// swapToken selectToken__wallet_setting_tabs__el__display

export const updateScrollPage = (type , prevTab) =>{

}



//sendToken page
export const sendTokenPage__display = () =>{
    return `display:${__p(["container" , "renderSendTokenTab"],false) ? "flex" : "none"};`
}


export const sendTokenPage__header_font = () =>{
    return `font-size:${__p(["sendTokenPage" , "coverScreen"],false) ? "22px" : "30px"};`
}
//sendToken page


//recieveToken page
export const recieveToken__display = () =>{
    return `display:${__p(["container" , "renderRecieveTokenTab"],false) ? "flex" : "none"};`
}
//recieveToken page


//loader tab
export const privAi__loader__main__display = () =>{
    return `display:${__p(["container" , "renderLoaderScreen"],false) ? "flex" : "none"};`
}
//loader tab


//bottomNav
export const bottomNav__display = () =>{
    return `display:${__p(["container" , "renderBottomTab"],true) ? "flex" : "none"};`
}
//bottomNav


//message popup tab
export const messagePopUp__main__display = () =>{
    return `display:${__p(["container" , "renderpopUpPage"],false) ? "flex" : "none"};` //temporal state
}
//message popup tab