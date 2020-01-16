import * as ot from './actions';
const Utils = require('../../utils');

//----------------------------------------------------------------------
export const dispatcher_Other = (route, query) => {
  return (dispatch, getState) => {
    dispatch({
      type: ot.BEGIN
    });

    return Utils.queryAPI_get(route, query)
      .then(async (result) => {
        let json = await result.json();
        if (json.errors) {
          throw json.errors[0];
        } else {
          dispatch({
            type: query,
            payload: json
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: ot.FAILURE,
          err
        });
      });
  };
};

//----------------------------------------------------------------------
export const other_menu = {
  page: 'other',
  items: [
    { subpage: 'custom', route: 'when', query: ot.CUSTOM },
    { subpage: 'known', route: 'when', query: ot.KNOWN },
    { subpage: 'generated', route: 'other', query: ot.GENERATED },
    { subpage: 'prices', route: 'quotes', query: ot.PRICES },
    { subpage: 'groups', route: 'names', query: ot.GROUPS },
    { subpage: 'ot-0005' },
    { subpage: 'ot-0006' }
  ],
  color: 'orange'
};

// EXISTING_CODE
// EXISTING_CODE