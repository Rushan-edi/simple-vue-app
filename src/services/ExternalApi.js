import axios from 'axios'

export default () => {
  const axiosInstance = axios.create({
    baseURL: `https://raw.githubusercontent.com/shandhiviyarajan/covid-19-sl-data/master`
  })

  const token = localStorage.getItem('token')
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        location.reload()
      }
      return Promise.reject(error)
    }
  )

  return axiosInstance
}
