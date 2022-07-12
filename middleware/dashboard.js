export default function ({ $auth, app, redirect }) {
  if (!$auth.user || !app.$abilities.can('view_dashboard')) {
    redirect('/')
  }
}
