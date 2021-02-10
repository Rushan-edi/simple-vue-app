import Api from '@/services/ExternalApi'

export default {
  getAll() {
    return Api().get(`covid-news.json`)
  }
}
