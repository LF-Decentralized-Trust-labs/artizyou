const initialState = {
  data: {},
  previousState: {},
};

const creations = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CREATION": {
      const { data } = state;
      const { creation } = action;
      const { creationId } = creation;

      return {
        ...state,
        data: {
          ...data,
          [creationId]: creation,
        },
        previousState: state,
      };
    }
    case "SET_CREATION_FIELD": {
      const { data } = state;
      const { name, value, creationId } = action;
      const creation = data[creationId];

      return {
        ...state,
        data: {
          ...data,
          [creationId]: {
            ...creation,
            [name]: value,
          },
        },
      };
    }

    case "REFRESH_CREATION": {
      const { data } = state;
      const { creation } = action;
      const { creationId } = creation;

      return {
        ...state,
        data: {
          ...data,
          [creationId]: creation,
        },
      };
    }
    case "RESET_CREATIONS_TO_PREVIOUS_STATE": {
      const { previousState } = state;

      return previousState;
    }
    case "SNAPSHOT_CREATIONS": {
      return {
        ...state,
        previousState: state,
      };
    }
    default: {
      return state;
    }
  }
};

export default creations;
