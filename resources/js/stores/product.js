import $axios from '../api.js';

const state = () => ({
	products: [],
	page: 1,
	laundry_types: []
})

const mutations = {
	ASSIGN_DATA(state, payload) {
		state.products = payload
	},

	SET_PAGE(state, payload){
		state.page = payload
	},
	ASSIGN_LAUNDRY_TYPE(state, payload){
		state.laundry_types = payload
	}
}

const actions = {
	getProducts({ commit, state }, payload){
		let search = typeof payload != 'undefined' ? payload: ''
		return new Promise((resolve, reject) => {
			$axios.get(`/product?page=${state.page}&q=${search}`)
			.then((response) => {
				commit("ASSIGN_DATA", response.data)
				resolve(response.data)
			})
		})
	},
	getLaundryType({ commit }){
		return new Promise((resolve, reject) => {
			$axios.get(`/product/laundry-type`)
			.then((res) => {
				commit("ASSIGN_LAUNDRY_TYPE", res.data)
				resolve(res.data)
			})
		})
	},
	addLaundryType({ commit }, payload){
		return new Promise((resolve, reject) => {
			$axios.post(`/product/laundry-type`, payload)
			.then((response) => {
				resolve(response.data)
			})
			.catch((error) => {
				if(error.response.data == 422){
					commit('SET_ERRORS', error.response.data.error, { root: true })
				}
			})
		})
	},
	addProductLaundry({ commit }, payload){
		return new Promise((resolve, reject) => {
			$axios.post(`/product`, payload)
			.then((response) => {
				resolve(response.data)
			})
			.catch((error) => {
				if(error.response.data == 422){
					commit('SET_ERRORS', error.response.data.error, { root: true })
				}
			})
		})
	},
	editProduct({ commit }, payload){
		return new Promise((resolve, reject) => {
			$axios.put(`/product/${payload.id}`, payload)
			.then((response) => {
				resolve(response.data)
			})
			.catch((error) => {
				if(error.response.data == 422){
					commit('SET_ERRORS', error.response.data.error, { root: true })
				}
			})
		})
	},
	removeProducts({ dispatch }, payload){
		return new Promise((resolve, reject) => {
			$axios.delete(`/products/${payload}`)
			.then((response) => {
				dispatch('getProducts').then(() => resolve(response.data))
			})
		})
	}
}

export default {
	namespaced: true,
	state, actions, mutations
}