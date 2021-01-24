export const state = () => ({
  list: []
})

export const mutations = {
  set(state, survey) {
    state.list = survey;
  },
  get(state, link) {
    console.log(state.list)
    return -1;
  }

}
