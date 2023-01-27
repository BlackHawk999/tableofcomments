import {createRouter, createWebHistory } from 'vue-router'

import singleComment from './views/comment/singleComment.vue'
import indexVue from './views/index.vue'


export const router = createRouter({
    history: createWebHistory(),
    routes: [

        {
            path: '/',
            name: 'indexVue',
            component: indexVue,
        },
        {
            path: '/comment/:id',
            name: 'singleComment',
            component: singleComment,
        },
    ]
})