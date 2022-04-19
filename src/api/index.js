export async function loginUser(credentials) {
  return fetch(`http://${process.env.REACT_APP_API_SERVER}:${process.env.REACT_APP_API_SERVER_PORT}/v1/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then(data => data.json());
}

export async function getMyInfo(token) {
  let url = `http://${process.env.REACT_APP_API_SERVER}:${process.env.REACT_APP_API_SERVER_PORT}/v1/users/me`;
  return fetch(url, {
    method: 'GET',
    headers: {
      'X-User-Auth-Token': token,
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if(response.status !== 200) {
      throw new Error(response.status)
    } else {
      return response.json()
    }
  })
  .catch(err => {
    console.log(err);
    if(err.message === '401') {
      localStorage.removeItem('token');
      window.location.reload();
    }
  });
}

export async function upsertLedger(token, ledger) {
  return fetch(`http://${process.env.REACT_APP_API_SERVER}:${process.env.REACT_APP_API_SERVER_PORT}/v1/ledgers`, {
    method: 'POST',
    headers: {
      'X-User-Auth-Token': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ledger),
  })
  .then(response => {
    if(response.status !== 200) {
      throw new Error(response.status)
    } else {
      return response.json()
    }
  })
  .catch(err => {
    if(err.message === '401') {
      localStorage.removeItem('token');
      window.location.reload();
    }
  });
}

export async function getSumLedgers(token, year, week) {
  let url = `http://${process.env.REACT_APP_API_SERVER}:${process.env.REACT_APP_API_SERVER_PORT}/v1/ledgers`;
  if (year) {
    url = url + '?year=' + year;
    if (week) {
      url = url + '&week=' + week;
    }
  }
  return fetch(url, {
    method: 'GET',
    headers: {
      'X-User-Auth-Token': token,
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if(response.status !== 200) {
      throw new Error(response.status)
    } else {
      return response.json()
    }
  })
  .catch(err => {
    if(err.message === '401') {
      localStorage.removeItem('token');
      window.location.reload();
    }
  });
}

export async function getLedgersSummary(token, year) {
  let url = `http://${process.env.REACT_APP_API_SERVER}:${process.env.REACT_APP_API_SERVER_PORT}/v1/ledgers/summary`;
  if (year) {
    url = url + '?year=' + year;
  }
  return fetch(url, {
    method: 'GET',
    headers: {
      'X-User-Auth-Token': token,
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if(response.status !== 200) {
      throw new Error(response.status)
    } else {
      return response.json()
    }
  })
  .catch(err => {
    if(err.message === '401') {
      localStorage.removeItem('token');
      window.location.reload();
    }
  });
}


export async function getLedger(token, date) {
  const url = `http://${process.env.REACT_APP_API_SERVER}:${process.env.REACT_APP_API_SERVER_PORT}/v1/ledgers/` + date;
  return fetch(url, {
    method: 'GET',
    headers: {
      'X-User-Auth-Token': token,
      'Content-Type': 'application/json'
    },
  })
  .then(response => {
    if(response.status !== 200) {
      throw new Error(response.status)
    } else {
      return response.json()
    }
  })
  .catch(err => {
    if(err.message === '401') {
      localStorage.removeItem('token');
      window.location.reload();
    } else {
      return {
        sales: null, 
        newSales: null, 
        visitors: null, 
        newVisitors: null, 
        nonBenefit: null
      };
    }
  });
}