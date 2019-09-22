import Vue from 'vue'
import Router from 'vue-router'
import MovieRouter from './movie.js';
import MineRouter from './mine.js';
import CinemaRouter from './cinema.js';
import AdminRouter from './admin.js';

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{path: '*', redirect: '/movie/nowplaying'},
		MovieRouter,
		MineRouter,
		CinemaRouter,
		AdminRouter
	]
})
