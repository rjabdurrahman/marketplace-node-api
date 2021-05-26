const reducer = function (state = {}, { type, payload }) {
    if (type === 'CLICK_ON_REGISTER') {
        return {
            ...state,
            showRegister: payload
        }
    }
    return state;
}

export default reducer;