import Vue from 'vue'
import App from './pages/app.vue'

new Vue({
    el: "#root",
    render: h => h(App)
})

// async
async function f() {
    return 'hello world';
}

f().then(v => console.log(v))

// Object.assign()
Object.assign({}, {
    "a": 2
})