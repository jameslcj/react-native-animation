


//这个函数是Action Creator
export const plus=(number)=>({
    type:'PLUS',
    number:number
})

export const deduct = (number) => {
    return {
        type: 'DEDUCT',
        number: number,
    }
}

export const add = (num) => {
    return {
        type: 'ADD_ACTION',
        num: num,
    }
}

export const dec = (num) => {
    return {
        type: 'DEC_ACTION',
        num: num,
    }
}
//plus(1)
//{type:'PLUS',number:1}  action
//并没有格式的推荐 type method 自定义 

