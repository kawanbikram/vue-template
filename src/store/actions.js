
export default {

  getCount(context, data) {
    // var request_url = "http://google.com"
    // Vue.http.get(request_url)
    // .then((res) => context.commit('setCount', res.body))
    // .catch((error) => console.log("ERROR ", error))

    context.commit('setCount', 1)
  },

}
