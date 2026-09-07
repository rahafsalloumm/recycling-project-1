import api from './api'

const contactService = {
  getContactInfo: () => api.get('/api/contact/info'),
  sendMessage: (data) => api.post('/api/message/send', data),
}

export default contactService
