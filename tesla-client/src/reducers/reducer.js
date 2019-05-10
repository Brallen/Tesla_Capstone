//this is our default state
const defaultState = {
    email: '',
    loggedIn: false,
    loginFailed: false,
    showLogin: true,
    showLogoutButton: false,
    mobileAccess: true,
    waitingForWake: false,
    sunroofOpen: false,
    showPasswordPrompt: false,
	showPinPrompt: false,
    showLogoutPrompt: false,
    showControlModal: false,
    showMediaModal: false,
    showClimateModal: false,
    showChargingModal: false,
    showSafetyModal: false,
    showDiagnosticsModal: false,
    showErrorPrompt: false,
    apiMobileCallFailed: 0,
    apiDataCallFailed: 0,
    errorText: '',
    rememberMeChecked: false,
    initialVehicleLoaded: false,
    showConfirmationPrompt: false,
    confirmationPromptFrunk: false,
    confirmationPromptTrunk: false,
    confirmationPromptLock: false,
	pinSpeedLimitActivate: false,
	pinSpeedLimitClear: false,
	pinValetActivate: false,
    toggleVehicleState: false,
    toggleDriveState: false,
    toggleChargeState: false,
    toggleClimateState: false,
    toggleVehicleConfig: false,
    toggleGUISettings: false,
    toggleAppState: false,
    controlIconFontSize: '28px',
    localOptions: {
        authToken: '',
        vehicleID: '',
        vehicle_id: '',
        tokens: []
    },
    accountToken: '',
    initialVehicleLoginObject: {},
    refreshTime: 3,
    refreshInterval: 3,
    vehicleDataObject: {
        id: 0,
        user_id: 0,
        vehicle_id: 0,
        vin: '',
        display_name: 'Loading Vehicle Information',
        option_codes: '',
        color: null,
        tokens: ['', ''],
        state: '',
        in_service: false,
        id_s: '',
        calendar_enabled: false,
        api_version: 0,
        backseat_token: null,
        backseat_token_updated_at: null,
        climate_state: {
            battery_heater: false,
            battery_heater_no_power: null,
            driver_temp_setting: 0,
            fan_status: 0,
            inside_temp: 0,
            is_auto_conditioning_on: false,
            is_climate_on: false,
            is_front_defroster_on: false,
            is_preconditioning: false,
            is_rear_defroster_on: false,
            left_temp_direction: 0,
            max_avail_temp: 0,
            min_avail_temp: 0,
            outside_temp: 0,
            passenger_temp_setting: 0,
            remote_heater_control_enabled: false,
            right_temp_direction: 0,
            seat_heater_left: 0,
            seat_heater_rear_center: 0,
            seat_heater_rear_left: 0,
            seat_heater_rear_right: 0,
            seat_heater_right: 0,
            side_mirror_heaters: false,
            smart_preconditioning: false,
            timestamp: 0,
            wiper_blade_heater: false
        },
        charge_state: {
            battery_heater_on: false,
            battery_level: 0,
            batery_range: 0,
            charge_current_request: 0,
            charge_current_request_max: 0,
            charge_enable_request: false,
            charge_energy_added: 0,
            charge_limit_soc: 0,
            charge_limit_soc_max: 0,
            charge_limit_soc_min: 0,
            charge_limit_soc_std: 0,
            charge_miles_added_ideal: 0,
            charge_miles_added_rated: 0,
            charge_port_cold_weather_mode: false,
            charge_port_door_open: false,
            charge_port_latch: '',
            charge_rate: 0,
            charge_to_max_range: false,
            charger_actual_current: 0,
            charger_phases: null,
            charger_pilot_current: 0,
            charger_power: 0,
            charger_voltage: 0,
            charging_state: '',
            conn_charge_cable: '',
            est_battery_range: 0,
            fast_charger_brand: '',
            fast_charger_present: false,
            fast_charger_type: '',
            ideal_battery_range: 0,
            managed_charging_active: false,
            managed_charging_start_time: null,
            managed_charging_user_canceled: false,
            max_range_charge_counter: 0,
            not_enough_power_to_heat: null,
            scheduled_charging_pending: false,
            scheduled_charging_start_time: null,
            time_to_full_charge: 0,
            timestamp: 0,
            trip_charging: false,
            usable_battery_level: 0,
            user_charge_enable_request: null
        },
        gui_settings: {
            gui_24_hour_time: false,
            gui_charge_rate_units: '',
            gui_distance_units: '',
            gui_range_display: '',
            gui_temperature_units: '',
            timestamp: 0
        },
        vehicle_state: {
            api_version: 0,
            autopark_state_v3: 'r',
            autopark_style: '',
            calendar_supported: false,
            car_version: '',
            center_display_state: 0,
            df: 0,
            dr: 0,
            ft: 0,
            homelink_nearby: false,
            is_user_present: false,
            last_autopark_error: '',
            locked: false,
            media_state: {
                remote_control_enabled: true
            },
            notifications_supported: false,
            odometer: 0,
            parsed_calendar_supported: false,
            pf: 0,
            pr: 0,
            remote_start: false,
            remote_start_supported: false,
            rt: 0,
			sentry_mode: false,
            software_update: {
                expected_duration_sec: 0,
                status: ''
            },
            speed_limit_mode: {
                active: false,
                current_limit_mph: 0,
                max_limit_mph: 90,
                min_limit_mph: 50,
                pin_code_set: false
            },
            sun_roof_percent_open: null,
            sun_roof_state: '',
            timestamp: 0,
            valet_mode: false,
            valet_pin_needed: false,
            vehicle_name: ''
        },
        vehicle_config: {
            can_accept_navigation_requests: false,
            can_actuate_trunks: false,
            car_special_type: '',
            car_type: '',
            charge_port_type: '',
            eu_vehicle: false,
            exterior_color: '',
            has_air_suspension: false,
            has_ludicrous_mode: false,
            motorized_charge_port: false,
            perf_config: '',
            plg: null,
            rear_seat_heaters: 0,
            rear_seat_type: null,
            rhd: false,
            roof_color: '',
            seat_type: null,
            spoiler_type: '',
            sun_roof_installed: null,
            third_row_seats: '',
            timestamp: 0,
            trim_badging: '',
            wheel_type: ''
        },
        drive_state: {
            gps_as_of: 0,
            heading: 0,
            latitude: 0.0,
            longitude: 0.0,
            native_latitude: 0.0,
            native_location_supported: 0,
            native_longitude: 0.0,
            native_type: '',
            power: 0,
            shift_state: null,
            speed: null,
            timestamp: 0
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

        case 'LOGOUT':
        return {
            ...state,
            ...defaultState
        }


        default: return state;
    }
}

export default reducers;
