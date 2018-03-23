import Vue from 'vue'
import Router from 'vue-router'
import Ticker from '@/Ticker'
import Live from '@/components/Live'
import Schedule from '@/components/Schedule'

Vue.use(Router)

export default new Router({
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            name: 'Ticker',
            component: Ticker,
            redirect: '/live'
        },
        {
            path: '/live',
            name: 'Live',
            component: Live
        },
        {
            path: '/schedule',
            name: 'Programm',
            component: Schedule
        },
        {
            path: '*',
            name: 'File not Found',
            component: Schedule
        }
    ]
})
