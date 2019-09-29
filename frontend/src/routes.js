import VueRouter from 'vue-router'
import Admin from "./components/Admin"
import User from "./components/User"
import Something from "./components/Something"
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
            path:'/something',
            component: Something 
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