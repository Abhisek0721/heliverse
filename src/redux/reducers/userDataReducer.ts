let defaultUserData:any = []

const userDataReducer = (state = defaultUserData, action:{
    type: string;
    payload: any
}) => {
    switch (action.type) {
        case "setUserData":
            state = action.payload;
            return state;
        default:
            return state;
    }
}

export default userDataReducer;