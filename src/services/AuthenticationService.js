import Api from '@/services/Api'

export default {
  signIn(credentials) {
    return Api().post('portal/auth/login', credentials)
  }
}
