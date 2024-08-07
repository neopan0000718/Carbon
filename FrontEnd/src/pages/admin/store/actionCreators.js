import axios from 'axios'
import * as constants from './constants';
import DiffMatchPatch from 'diff-match-patch';

const dmp = new DiffMatchPatch();

export const setadminpage = (page) => ({
  type: constants.SET_ADMIN_PAGE,
  page
});

export const setpage = (page) => ({
  type: constants.SET_EMPLOYEE_PAGE,
  page
});

/////////////////admin///////////////////

export const CUsendinfo = (user_name, accessChecked) => {
  return (dispatch) => {
    axios./*正是對接時用post*/get('/api/CUinfo.json', { user_name, accessChecked }).then((res) => {
      const result = res.data.data;
      result? alert('success'):alert('fail')
    }).catch(() => {
      alert('CUsendinfo fail')
    });
  }
}

export const AAsendinfo = (user_id, accessChecked) => {
  return (dispatch) => {
    axios./*正是對接時用post*/get('/api/AAinfo.json', { user_id, accessChecked }).then((res) => {
      const result = res.data.data;
      result? alert('success'):alert('fail')
    }).catch(() => {
      alert('AAsendinfo fail')
    });
  }
}

export const CPsendinfo = (project_id, pm_id, materialChecked, equipmentChecked) => {
  return (dispatch) => {
    axios./*正是對接時用post*/get('/api/CPinfo.json', { project_id, pm_id, materialChecked, equipmentChecked }).then((res) => {
      const result = res.data.data;
      result? alert('success'):alert('fail')
    }).catch(() => {
      alert('CPsendinfo fail')
    });
  }
}

//type: 1=accept 0=reject
export const Asendinfo = (type, project_id, pm_id, material, equipment) => {
  return (dispatch) => {
    axios./*正是對接時用post*/get('/api/Ainfo.json', { type, project_id, pm_id, material, equipment }).then((res) => {
      const result = res.data.data;
      result? alert('success'):alert('fail')
    }).catch(() => {
      alert('Asendinfo fail')
    });
  }
}

///////////////////////////employee//////////////////////////////////////

export const employeepost = (name, gender, phone, mail, region) => {
  return (dispatch) => {
    axios./*正是對接時用post*/get('/api/Ainfo.json', { name, gender, phone, mail, region }).then((res) => {
      const result = res.data.data;
      result? alert('success'):alert('fail')
    }).catch(() => {
      alert('EPsendinfo fail')
    });
  }
}

export const employeerevise = (eid, name, gender, phone, mail, region) => {
  return (dispatch) => {
    axios./*正是對接時用post*/get('/api/AAinfo.json', { eid, name, gender, phone, mail, region }).then((res) => {
      const result = res.data.data;
      result? alert('success'):alert('fail')
    }).catch(() => {
      alert('ERsendinfo fail')
    });
  }
}

export const employeedelete = (eid, name) => {
  return (dispatch) => {
    axios./*正是對接時用post*/get('/api/AAinfo.json', { eid, name }).then((res) => {
      const result = res.data.data;
      result? alert('success'):alert('fail')
    }).catch(() => {
      alert('EDsendinfo fail')
    });
  }
}

export const employeeretrieve = (eid, name, pid, region) => {
  return (dispatch) => {
    axios./*正是對接時用post*/get('/api/Ainfo.json', { eid, name, pid, region }).then((res) => {
      const result = res.data.data;
      result? alert('success'):alert('fail')
    }).catch(() => {
      alert('ESsendinfo fail')
    });
  }
}

///////////////////////get list/////////////////////

export const getaccess = () => {
  return (dispatch) => {
    axios.get('/api/access.json').then((res) => {
      const result = res.data.data;
      dispatch({
        type: constants.GET_ACCESS,
        accesslist: result
      });
    }).catch((error) => {
      console.error('Error fetching access data:', error);
    });
  }
}

export const getmaterial = () => {
  return (dispatch) => {
    axios.get('/api/material.json').then((res) => {
      const result = res.data.data;
      dispatch({
        type: constants.GET_MATERIAL,
        materiallist: result
      });
    }).catch((error) => {
      console.error('Error fetching material data:', error);
    });
  }
}

export const getequipment = () => {
  return (dispatch) => {
    axios.get('/api/equipment.json').then((res) => {
      const result = res.data.data;
      dispatch({
        type: constants.GET_EQUIPMENT,
        equipmentlist: result
      });
    }).catch((error) => {
      console.error('Error fetching equipment data:', error);
    });
  }
}

export const getoldcontent = () => {
  return (dispatch) => {
    axios.get('/api/oldcontent.json').then((res) => {
      const result = res.data.data;
      dispatch({
        type: constants.GET_OLD_CONTENT,
        oldcontent: result.content,
        pid: result.pid,
        pmid: result.pmid,
        time: result.time
      });
    }).catch((error) => {
      console.error('Error fetching oldcontent data:', error);
    });
  };
};

export const getnewcontent = () => {
  return (dispatch, getState) => {
    axios.get('/api/newcontent.json').then((res) => {
      const result = res.data.data;
      const { oldcontent } = getState().admin;
      const diff = dmp.diff_main(oldcontent, result.content);
      dmp.diff_cleanupSemantic(diff);
      const diffHTML = diff.map(part => {
        const [op, text] = part;
        if (op === DiffMatchPatch.DIFF_INSERT) {
          return `<span style="background-color: #00DB00;">${text}</span>`;
        } else if (op === DiffMatchPatch.DIFF_DELETE) {
          return `<span style="background-color: #FF5151;">${text}</span>`;
        } else {
          return `<span>${text}</span>`;
        }
      }).join('');

      dispatch({
        type: constants.GET_NEW_CONTENT,
        newcontent: diffHTML
      });
    }).catch((error) => {
      console.error('Error fetching newcontent data:', error);
    });
  };
};