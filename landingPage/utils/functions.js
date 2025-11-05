import { SYD_VAR } from "../sydneyDom_v3.js";

const valueMap = {"1":"K","2":"M","3":"B","4":"T"}

export const numberToken_minify = (price) =>{
    let stringVal = `${price}`.split(".")[0].split("").reverse().join("");
    const fixedInterval = 3;
    let count = 0;
    let valueCheck = 0;
    const token = new Array();
    for(let i = 0; i < stringVal.length; i++)
    {
        count ++;
        token.push(stringVal[i])
        if(count === fixedInterval)
        {
            count = 0;
            if(i !== stringVal.length-1)
            {
                token.push(",");
                valueCheck++;
            }
        }
    }
    const lastValue = token.reverse().join("").split(",")[0];

    return `${lastValue}${valueMap[`${valueCheck}`]}`
}

export const m_over = e =>{
    e.target.style.backgroundColor = SYD_VAR.mainTheme.get()
    e.target.style.color = "#000000";
}

export const m_out = e =>{
    e.target.style.backgroundColor = "transparent"
    e.target.style.color = SYD_VAR.mainTheme.get();
}

export const validateWallet = ()=>{
    const availableWallets = SYD_VAR.platforms.get();
    try
    {
        let providers = window.ethereum.providers || [window.ethereum];

        availableWallets.forEach((wallet,i) => {
            if(wallet.type === "phantom")
            {
                availableWallets[i].available = window.phantom?.ethereum?.isPhantom ? true : false
            }else
            {
                providers.forEach(p => {
                    availableWallets[i].available = p[availableWallets[i].flag];
                });
            }
        });

        SYD_VAR.platforms.change(availableWallets);
    }catch(err)
    {
        console.log(err)
    }
}
