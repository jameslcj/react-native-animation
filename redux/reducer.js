

const initialState = { c: 0 };
//state store model 
export const calculate = (state = initialState, action) => {

    switch (action.type) {
        case 'PLUS':
            return { c: state.c + action.number };

        case 'DEDUCT':
            return { c: state.c - action.number };

        default:

            return state;
    }

}

export const myReducer = (state = {num: 0}, action) => {

    switch (action.type) {
        case 'ADD_ACTION':
            return {num: state.num + action.num};
        case 'DEC_ACTION':
            return {num: state.num - action.num};
        default:
            return state;
    }
}

export  const myReducer2 = (state = {num: 5}, action) => {
    switch (action.type) {
        case 'ADD_ACTION':
            return {num: state.num + action.num *2}
        case 'DEC_ACTION':
            return {num: state.num - action.num *2}
        default:
            return state;
    }
}