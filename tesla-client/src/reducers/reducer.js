//this is our default state
let defaultState = {
    accountName: '',
    accountPass: '',
    accountToken: '',
    vehicleDataObject: { 
        id: 0,
        user_id: 0,
        vehicle_id: 0,
        vin: "111111111111111",
        display_name: "Test Vehicle",
        tokens: ["0", "0"],
        state: "offline",
        id_s: "0",
        charge_state: {
            usable_battery_level: 0,
            charge_rate: 0
        }
    }
}
//reducers go through our action type and switch between them
const reducers = (state = defaultState, action) => {
    switch(action.type){
        //the first action "EXAMPLE" simply takes our state and sets examplePropOne to a fixed value
        case 'ENTER_ACCOUNT_INFO':
        return {
            ...state, 
            ...action.payload
        }
        
        default: return state;
    }
}

export default reducers;