export default ({ store }, inject) => {
  inject('helpers', {
    percentage (a, b) {
      if (!b) { return 0 }
      return Math.floor((a * 100) / b)
    }
  })
}
