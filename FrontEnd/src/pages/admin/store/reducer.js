import * as constants from './constants';

const defaultState = {
  adminpage: 1,
  employeepage: 1,
  accesslist: [],
  materiallist: [],
  equipmentlist: [],
  approvelist: [],
  approve_pid: "pid",
  approve_pmid: "pmid",
  approve_time: "time",
  oldcontent: "",
  newcontent: ""
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case constants.SET_ADMIN_PAGE:
      return {
        ...state,
        adminpage: action.page
      };
    case constants.SET_EMPLOYEE_PAGE:
      return {
        ...state,
        employeepage: action.page
      }
    case constants.GET_ACCESS:
      return { ...state, accesslist: action.accesslist }
    case constants.GET_MATERIAL:
      return { ...state, materiallist: action.materiallist }
    case constants.GET_EQUIPMENT:
      return { ...state, equipmentlist: action.equipmentlist }
    case constants.GET_APPROVE:
      return { ...state, approvelist: action.approvelist }
    case constants.GET_OLD_CONTENT:
      return {
        ...state,
        approve_pid: action.pid,
        approve_pmid: action.pmid,
        approve_time: action.time,
        oldcontent: action.oldcontent,
      }
    case constants.GET_NEW_CONTENT:
      return {
        ...state,
        newcontent: action.newcontent,
      }
    default:
      return state;
  }
};

export default reducer;
