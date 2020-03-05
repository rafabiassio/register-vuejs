<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Users</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div
              v-for="(item, att) in formData"
              class="md-layout-item md-small-size-100"
              :key="att"
            >
              <md-field :class="getValidationClass(att)">
                <label for="att">{{ item.label }}</label>
                <md-input
                  name="att"
                  id="att"
                  autocomplete="given-name"
                  v-model="item.value"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form[att].required">Error</span>
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Create user</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="dataSaved">Saved with success!</md-snackbar>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  name: "FormValidation",
  mixins: [validationMixin],
  props: {
    formData: Object
  },
  data: () => ({
    // formData: {
    //   firstName: {
    //     label: "First Name",
    //     value: null
    //   }
    // },
    dataSaved: false,
    sending: false
  }),
  validations: {
    form: {
      firstName: {
        required
      }
    }
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName].value;

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      //   this.form.firstName = null;
    },
    saveUser() {
      this.sending = true;
      // call api
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>
