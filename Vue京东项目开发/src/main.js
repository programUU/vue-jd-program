import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// /* 引入基础样式 */
// import './style/base.scss'
// /* 引入图标字体 */
// import './style/iconfont.css'

// /* 导入一个 scss 就行 */
import './style/index.scss'

createApp(App).use(store).use(router).mount('#app')
