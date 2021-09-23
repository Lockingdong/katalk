import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import VueLocalStorage from 'vue-localstorage'
import VModal from 'vue-js-modal'
import { v4 as uuidv4 } from 'uuid';

Vue.use(VueLocalStorage)
Vue.use(VModal)

let userToken = Vue.localStorage.get('ut');

if(userToken === null) {
  userToken = uuidv4();
  Vue.localStorage.set('ut', userToken);
}

let historyMsgs = Vue.localStorage.get('hms');
if(historyMsgs === null) {
  Vue.localStorage.set('hms', JSON.stringify([]));
}

const socketConnection = SocketIO('https://talkbar.com', {
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
