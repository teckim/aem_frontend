<template>
  <div>
    <v-list dense flat>
      <v-list-item
        v-if="$auth.user"
        two-line
        class="px-2"
        to="/user/profile/edit"
      >
        <v-list-item-avatar size="40" class="text-uppercase white--text">
          <user-avatar />
        </v-list-item-avatar>
        <v-list-item-content class="pl-2 text-capitalize">
          <v-list-item-title v-if="$auth.user" class="subtitle-1">
            {{ $auth.user.firstname + ' ' + $auth.user.lastname.toUpperCase() }}
          </v-list-item-title>
          <v-list-item-subtitle v-if="$auth.user.flat_roles.length">
            {{ $auth.user.flat_roles.join(', ') }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list dense nav rounded>
      <template v-for="(route, i) in routes">
        <v-list-group
          v-if="route.child"
          v-show="$abilities.canAny(route.permissions)"
          :key="i"
          :group="route.group"
        >
          <template #activator>
            <v-list-item-icon>
              <v-icon size="20">
                {{ route.icon }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="route.title" />
          </template>
          <v-list-item
            v-for="(child, n) in route.child"
            v-show="$abilities.can(child.permission)"
            :key="n"
            :to="child.to"
            router
            exact
          >
            <v-list-item-icon>
              <v-icon size="16">
                {{ child.icon }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="child.title" />
            </v-list-item-content>
          </v-list-item>
          <div class="pa-2">
            <v-divider />
          </div>
        </v-list-group>
        <v-list-item
          v-else
          :key="i"
          :to="route.to"
          color="primary"
          exact
          router
        >
          <v-list-item-icon>
            <v-icon size="20">
              {{ route.icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="route.title" />
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script>
export default {
  data: () => ({
    routes: [
      {
        icon: 'mdi-calendar-month-outline',
        title: 'Events',
        group: '/dashboard/events',
        permissions: ['view_any_event', 'create_event'],
        child: [
          {
            icon: 'mdi-calendar-plus',
            title: 'Create',
            to: '/dashboard/events/new',
            permission: 'create_event'
          },
          {
            icon: 'mdi-calendar-edit',
            title: 'Manage',
            to: '/dashboard/events',
            permission: 'view_any_event'
          }
        ]
      },
      {
        icon: 'mdi-account-multiple-outline',
        title: 'Members',
        group: 'dashboard/members/*',
        child: [
          {
            icon: 'mdi-account-multiple-outline',
            title: 'Manage',
            to: '/dashboard/members/manage'
          },
          {
            icon: 'mdi-account-multiple-plus-outline',
            title: 'Join requests',
            to: '/dashboard/members/joins'
          },
          {
            icon: 'mdi-account-multiple-check-outline',
            title: 'Add',
            to: '/dashboard/members/add'
          }
        ]
      },
      {
        icon: 'mdi-account-circle',
        title: 'Profile',
        group: '/user/profile/*',
        child: [
          {
            icon: 'mdi-account-edit',
            title: 'Edit',
            to: '/user/profile/edit'
          },
          {
            icon: 'mdi-shield-account',
            title: 'Security',
            to: '/user/profile/security'
          }
        ]
      },
      {
        icon: 'mdi-map-marker',
        title: 'Locations',
        to: '/dashboard/locations'
      },
      {
        icon: 'mdi-cogs',
        title: 'Settings',
        to: '/dashboard/settings'
      }
    ]
  })
}
</script>

<style scoped>
/* .v-list-group {
  transition: 0.5s padding ease;
} */
.v-list-item .v-icon {
  margin: auto;
}
</style>
