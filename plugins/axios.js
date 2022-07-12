export default function ({ app, $axios, route, redirect, from }) {
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    switch (code) {
      case 401:
        if (process.client) {
          redirect(`/login?redirect=${route.fullPath}`)
        }
        break
      case 403:
        app.$notifier.error(
          error.response.data.message || 'Action not authorized.'
        )
        break
      default:
        app.$notifier.error(
          error.response.data.message || 'An error occured.'
        )
        break
    }
  })
}
