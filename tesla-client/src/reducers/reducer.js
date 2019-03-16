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
        climate_state: {
            is_climate_on: false
        },
        charge_state: {
            usable_battery_level: 0,
            charge_rate: 0
        },
        vehicle_state: {
            locked: true
        }
    }
}
//reducers go through our action type and switch between them
const reducers = (state = defaultState, action) => {
    switch(action.type){
        //the first action "EXAMPLE" simply takes our state and sets examplePropOne to a fixed value
        case 'LOGIN':
        return {
            ...state,
            ...action.payload
        }

        case 'UPDATE_OBJECT':
        return {
            ...state,
            ...action.payload
        }

        case 'UPDATE_LOCK_BUTTON':
        if(action.payload == true){
            var lockedString = 'Unlock';
        }else{
            var lockedString = 'Lock';
        }
        return {
            ...state,
            lockString: lockedString,
            vehicleDataObject: {
                ...state.vehicleDataObject,
                charge_state: {
                    ...state.vehicleDataObject.charge_state,
                },
                vehicle_state: {
                    ...state.vehicleDataObject.vehicle_state,
                    locked: action.payload
                }       
            }
        }
        
        default: return state;
    }
}

export default reducers;