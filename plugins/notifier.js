export default ({ store }, inject) => {
  inject('notifier', {
    _color: 'success',
    _timeout: 2000,
    _message: '',
    color (color = '') {
      this._color = color
      return this
    },
    timeout (timeout = 2000) {
      this._timeout = timeout
      return this
    },
    message (message = '') {
      this._message = message
      return this
    },
    show () {
      store.commit('snackbar/showMessage', {
        content: this._message,
        color: this._color,
        timeout: this._timeout
      })
    },
    showMessage ({
      content = '',
      color = this._color,
      timeout = this._timeout
    }) {
      store.commit('snackbar/showMessage', { content, color, timeout })
    },
    notify (message) {
      store.commit('snackbar/showMessage', { content: message, color: this._color, timeout: this._timeout })
    },
    success (message) {
      this.color('success')
        .message(message)
        .show()
    },
    info (message) {
      this.color('info')
        .message(message)
        .show()
    },
    error (message) {
      this.color('error')
        .message(message)
        .show()
    }
  })
}
