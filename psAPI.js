import axios from 'axios'

const validateMapData = data => {
  if (!Array.isArray(data) || data.lenght === 0) {
    return
  }
  return data
}

export const getMapData = () =>
  axios
    .get('https://d3w0k61hzb.execute-api.eu-west-2.amazonaws.com/beta/snapshots/8', {
      headers: {
        'X-Api-Key': 'LmkYLrsulm6gUPaeZnITp3FeASEhXLzQ9zmdYtLt',
      },
    })
    .then(response => validateMapData(response.data))
    .catch(() => [{ '': '' }])
