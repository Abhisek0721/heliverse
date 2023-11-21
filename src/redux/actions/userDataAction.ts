const userDataAction = (payload:any) => {
    return {
        type: "setUserData",
        payload: payload
    }
}

export default userDataAction;