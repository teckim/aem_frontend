export default function ({ $auth, route, redirect, store }) {
  // if ($auth.user && $auth.user.teams.length) {
  //   const found = $auth.user.teams.find(i => i.id === store.state.team.team.id)
  //   console.log(found)
  //   if (!store.state.team.team.id || !found) {
  //     store.dispatch('team/setUserTeams', $auth.user.teams)
  //   }
  // }
  if (route.path !== $auth.options.redirect.login) {
    if (!$auth.loggedIn) {
      redirect($auth.options.redirect.login, { redirect: route.path })
    }
  }
}
