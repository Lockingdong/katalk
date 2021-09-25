import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import VueLocalStorage from 'vue-localstorage'
import VModal from 'vue-js-modal'
import { v4 as uuidv4 } from 'uuid';
import Ads from 'vue-google-adsense'

Vue.use(require('vue-script2'))

Vue.use(Ads.Adsense)
Vue.use(Ads.InArticleAdsense)
Vue.use(Ads.InFeedAdsense)

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

const socketConnection = SocketIO(process.env.VUE_APP_SOCKET_URL, {
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
