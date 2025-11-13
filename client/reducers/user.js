const initialState = {
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER': {
      const {user} = action;

      return {
        ...state,
        ...user,
      };
    }
    case 'SET_USER_FIELD': {
      const {name, value} = action;

      return {
        ...state,
        [name]: value,
      };
    }
    case 'RESET_USER': {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default user;