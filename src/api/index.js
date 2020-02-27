import Vue from 'vue'

export async function translate (params) {
  const res = await Vue.axios.get('/api/bot/query', { params })
  return res
}
