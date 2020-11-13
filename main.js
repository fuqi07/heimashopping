import Vue from 'vue'
import App from './App'
import  request  from "./utils/request";
import  { getSetting,chooseAddress,openSetting,showModal,showToast,login }  from "./utils/asyncWx.js";
Vue.config.productionTip = false
Vue.prototype.request=request;
Vue.prototype.getSetting=getSetting;
Vue.prototype.chooseAddress=chooseAddress;
Vue.prototype.openSetting=openSetting;
Vue.prototype.showModal=showModal;
Vue.prototype.showToast=showToast;
Vue.prototype.login=login;
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
