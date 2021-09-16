import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import VueLocalStorage from 'vue-localstorage'
import uniqid from 'uniqid'

Vue.use(VueLocalStorage)


let userToken = Vue.localStorage.get('ut');

if(userToken === null) {
  userToken = uniqid('ut-') + uniqid()
  Vue.localStorage.set('ut', userToken);
}

const socketConnection = SocketIO('http://localhost:3003', {
  query: {
    user_token: userToken 
  }
});

Vue.use(new VueSocketIO({
  debug: true,
  connection: socketConnection,
}))


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
