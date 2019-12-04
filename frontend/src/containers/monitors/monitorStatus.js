//----------------------------------------------------------------
const GETSTATUS_BEGIN = 'monitorStatus/GETSTATUS_BEGIN';
const GETSTATUS_SUCCESS = 'monitorStatus/GETSTATUS_SUCCESS';
const GETSTATUS_FAILURE = 'monitorStatus/GETSTATUS_FAILURE';

//----------------------------------------------------------------
const initialState = {
  monitorStatus: {},
  isLoading: false,
  error: null
};

//----------------------------------------------------------------
export default (state = initialState, action) => {
  switch (action.type) {
    case GETSTATUS_BEGIN:
      return {
        ...state,
        isLoading: true
      };

    case GETSTATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        monitorStatus: action.payload
      };

    case GETSTATUS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.e,
        monitorStatus: {}
      };

    default:
      return state;
  }
};

//----------------------------------------------------------------
const getData = (endpoint) => {
  return fetch(`${endpoint}/status?modes=monitors&details&ether`);
};

//----------------------------------------------------------------
export const getMonitorStatus = () => {
  return (dispatch, getState) => {
    dispatch({
      type: GETSTATUS_BEGIN
    });

    let state = getState();
    return getData(state.getSettings.apiProvider)
      .then(async (res) => {
        let json = await res.json();
        json = json.data[0].caches[0];
        dispatch({
          type: GETSTATUS_SUCCESS,
          payload: json
        });
        return json;
      })
      .catch((e) => {
        dispatch({
          type: GETSTATUS_FAILURE,
          e
        });
      });
  };
};