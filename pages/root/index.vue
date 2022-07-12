<template>
  <v-layout row>
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="headline mb-4">
            Permisseions
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="role.name"
            solo
            dense
            name="name"
            label="name"
          />
        </v-col>
        <v-col cols="12" sm="8">
          <v-btn color="success" @click="savePermission(item)">
            save
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-chip v-for="item in permissions" :key="item.id" class="mr-2 my-1">
        {{ item.name }}
      </v-chip>
    </v-container>

    <!-- Roles -->
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="headline mb-4">
            Roles
          </div>
        </v-col>
      </v-row>
      <v-row v-for="item in roles" :key="item.id">
        <v-col cols="12" sm="4">
          <v-text-field v-model="item.name" solo name="name" label="name" />
        </v-col>
        <v-col cols="12" sm="8">
          <v-btn fab small color="success" class="mt-1" @click="saveRole(item)">
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col cols="12">
              <span>{{ item.name }}'s permissions</span>
            </v-col>
            <v-col cols="12">
              <v-chip
                v-for="subItem in item.permissions"
                :key="subItem.id"
                class="mr-2 my-1"
                close
                @click:close="handlePermissionRemove(item, subItem)"
              >
                {{ subItem.name }}
              </v-chip>
            </v-col>
            <v-col cols="12">
              <v-autocomplete
                label="add permission"
                item-text="name"
                item-value="id"
                :items="permissions"
                :value="item.permissions"
                return-object
                multiple
                hide-selected
                solo
                chips
                @change="i => handlePermissionChange(item, i)"
              >
                <template #selection>
                  <!-- <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click:close="handlePermissionRemove(data)"
                  >
                    {{ data.item.name }}
                  </v-chip> -->
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="12">
              <v-divider />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <!-- <v-container>
      <v-row>
        <v-col cols="12">
          <div class="headline mb-4">
            Roles
          </div>
        </v-col>
      </v-row>
      <v-row v-for="item in roles" :key="item.id">
        <v-col cols="12" sm="4">
          <v-text-field v-model="item.name" solo name="name" label="name" />
        </v-col>
        <v-col cols="12" sm="8">
          <v-combobox
            v-model="item.permissions"
            :items="permissions"
            label="permissions"
            item-text="name"
            item-value="id"
            small-chips
            solo
            multiple
            chips
          />
        </v-col>
        <v-col cols="12">
          <v-btn color="success" @click="saveRole(item)">
            save
          </v-btn>
        </v-col>
      </v-row>
    </v-container> -->
  </v-layout>
</template>

<script>
export default {
  layout: 'blank',
  // middleware: 'auth-guard',
  data () {
    return {
      role: {},
      permission: {},
      roles: [],
      permissions: []
    }
  },
  created () {
    if (!this.$auth.user || !this.$auth.user.flat_roles.includes('Root')) {
      this.$router.push('/')
    }
  },
  mounted () {
    this.fetchPermissions()
  },
  methods: {
    fetchPermissions () {
      this.$axios.$get('/permissions').then((data) => {
        this.permissions = data
        this.fetchRoles()
      })
    },
    fetchRoles () {
      this.$axios.$get('/roles').then((data) => {
        this.roles = data
      })
    },
    savePermission (permission) {
      const data = JSON.parse(JSON.stringify(permission))
      this.$axios.$put(`/permissions/${permission.id}`, data).then((data) => {
        console.log(data)
      })
    },
    saveRole (role) {
      const data = JSON.parse(JSON.stringify(role))
      this.$axios
        .$put(`/roles/${role.id}`, data)
        .then((data) => {
          console.log(data)
        })
    },
    saveRolePermission (roleId, permissionName) {
      this.$axios
        .$post(`/roles/${roleId}/permissions`, { name: permissionName })
        .then((data) => {
          this.fetchRoles()
        })
    },
    removeRolePemission (roleId, permissionId) {
      this.$axios
        .$delete(`/roles/${roleId}/permissions/${permissionId}`)
        .then((data) => {
          this.fetchRoles()
        })
    },
    handlePermissionRemove (role, permission) {
      this.removeRolePemission(role.id, permission.id)
    },
    handlePermissionChange (role, permission) {
      this.saveRolePermission(role.id, permission.lastItem.name)
    }
  }
}
</script>

<style></style>
