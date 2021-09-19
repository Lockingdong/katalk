import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import VueLocalStorage from 'vue-localstorage'
import uniqid from 'uniqid'
import VModal from 'vue-js-modal'

Vue.use(VueLocalStorage)
Vue.use(VModal)

let userToken = Vue.localStorage.get('ut');

if(userToken === null) {
  userToken = uniqid('ut-') + uniqid()
  Vue.localStorage.set('ut', userToken);
}

let historyMsgs = Vue.localStorage.get('hms');
if(historyMsgs === null) {
  Vue.localStorage.set('hms', JSON.stringify([]));
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
