import { LocalScheme } from '~auth/runtime'
import axios from "axios";
export default class JwtSchema extends LocalScheme {
  // Override `fetchUser` method of `local` scheme
  async fetchUser (endpoint) {
    // Token is required but not available
    if (!this.check().valid) {
      return
    }

    // User endpoint is disabled.
    if (!this.options.endpoints.user) {
      this.$auth.setUser({})
      return
    }

    // Try to fetch user and then set
    return this.$auth.requestWith(
      this.name,
      endpoint,
      this.options.endpoints.user
    ).then((response) => {
      const user = getResponseProp(response, this.options.user.property)

      // Transform the user object
      const customUser = {
        ...user,
        fullName: user.firstName + ' ' + user.lastName,
        roles: ['user']
      }

      // Set the custom user
      // The `customUser` object will be accessible through `this.$auth.user`
      // Like `this.$auth.user.fullName` or `this.$auth.user.roles`
      this.$auth.setUser(customUser)

      return response
    }).catch((error) => {
      this.$auth.callOnError(error, { method: 'fetchUser' })
    })
  }

  async login (endpoint) {
    axios.post("http://localhost:8080" + this.options.endpoints.login.url, endpoint.data).then(d => {
      let data = d.data;
      if (data.status === 'DOWN') {
        this.$toasted.error("Sunucu hatası!", {
          theme: "toasted-primary",
          position: "top-center",
          icon: 'warning',
          iconPack: "material",
          duration: 5000
        });
      }
    }).catch(e => {
      console.log(e.response);
      this.$auth.callOnError(e.apierror.message, { method: 'login' })
    })
  }
}
