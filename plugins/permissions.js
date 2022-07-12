export default ({ app }, inject) => {
  inject('abilities', {
    canAny (abilities) {
      if (typeof abilities !== 'object') { return false }
      if (!this.isAuth() || !abilities) {
        return false
      }
      const permissions = app.$auth.user.flat_permissions
      return abilities.some(a => permissions.includes(a))
    },
    can (ability) {
      if (!this.isAuth() || !ability) {
        return false
      }
      const permissions = app.$auth.user.flat_permissions
      return permissions.includes(ability)
    },
    isAuth () {
      return app.$auth.loggedIn && !!app.$auth.user
    }
  })
}
