export default function reducer(state, { type, payload }) {
  switch (type) {
    case "LOGIN_USER":
      return {
        ...state,
        currentUser: payload
      };
    case "IS_LOGGED_IN":
      return {
        ...state,
        isAuth: payload
      };
    case "SIGNOUT_USER":
      return {
        ...state,
        currentUser: null,
        isAuth: false
      };
    case "CREATE_DRAFT":
      return {
        ...state,
        draft: {
          latitude: 0,
          longitude: 0
        },
        currentPin: null
      };
    case "UPDATE_DRAFT_LOCATION":
      return {
        ...state,
        draft: payload
      };
    case "DELETE_DRAFT":
      return {
        ...state,
        draft: null
      };
    case "GET_PINS":
      return {
        ...state,
        pins: payload
      };
    case "CREATE_PIN":
      const newPin = payload;
      const prevPins = state.pins.filter(pin => pin._id !== newPin._id);
      return {
        ...state,
        pins: [...prevPins, newPin]
      };
    case "SET_PIN":
      return {
        ...state,
        currentPin: payload,
        draft: null
      };
    case "DELETE_PIN":
      const deleted = payload;
      const filtered = state.pins.filter(pin => pin._id !== deleted._id);
      return {
        ...state,
        currentPin: null,
        pins: filtered
      };
    case "CREATE_COMMENT":
      const current = payload;
      const updatedPins = state.pins.map(pin =>
        pin._id === current._id ? current : pin
      );
      return {
        ...state,
        pins: updatedPins,
        currentPin: current
      };
    default:
      return state;
  }
}
