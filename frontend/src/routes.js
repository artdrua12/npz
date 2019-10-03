import VueRouter from 'vue-router'
import Admin from "./components/Admin"
import User from "./components/User"
import Logs from "./components/Logs"
import ErrorComp from "./components/Error"

import CheckForm from "./components/CheckForm"

export default new VueRouter({
    routes: [
        {
            path:'',
            component: User
        },
        {
            path:'/admin',
            component: Admin
        },
        {
            path:'/logs',
            component: Logs 
        },
        {
            path:'/checkForm',
            component: CheckForm
        },
        {
            path:'*',
            component: ErrorComp
        }
    ],
    mode:"history"
})