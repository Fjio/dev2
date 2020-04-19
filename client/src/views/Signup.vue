<template>
  <section>
    <h1>Inscription</h1>
    <div v-if="signingUp">
      <img src="../assets/loading.svg" />
    </div>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <form v-if="!signingUp" @submit.prevent="signup">
      <div class="form-group">
        <label for="username">Nom d'utilisateur</label>
        <input
          id="username"
          v-model="user.username"
          type="text"
          class="form-control"
          aria-describedby="usernameHelp"
          placeholder="Entrez un nom d'utilisateur"
          required
        />
        <small id="usernameHelp" class="form-text text-muted">
          Le nom d'utilisateur doit contenir entre 2 et 30 caractères.
          <br />Le nom d'utilisateur ne peut contenir que des chiffres, lettres et tirets bas.
        </small>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="password">Mot de passe</label>
          <input
            id="password"
            v-model="user.password"
            type="password"
            class="form-control"
            aria-describedby="passwordHelp"
            placeholder="Mot de passe"
            required
          />
          <small id="passwordHelp" class="form-text text-muted">
            Le mot de passe doit contenir plus de 10 caractères.
            <br />
          </small>
        </div>
        <div class="form-group col-md-6">
          <label for="confirmPassword">Confirmation du mot de passe</label>
          <input
            id="confirmPassword"
            v-model="user.confirmPassword"
            type="password"
            class="form-control"
            aria-describedby="confirmPasswordHelp"
            placeholder="Mot de passe"
            required
          />
          <small
            id="ConfirmPasswordHelp"
            class="form-text text-muted"
          >Entrez le mot de passe à nouveau.</small>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">
        S'inscrire !
      </button>
    </form>
  </section>
</template>

<script>
import Joi from 'joi'

const SIGNUP_URL = 'http://localhost:5000/auth/signup'

const schema = Joi.object().keys({
  username: Joi.string()
    .regex(/^[a-zA-Z0-9_]*$/)
    .min(2)
    .max(30)
    .required(),
  password: Joi.string()
    .trim()
    .min(10)
    .required(),
  confirmPassword: Joi.string()
    .trim()
    .min(10)
    .required()
})

export default {
  data: () => ({
    signingUp: false,
    errorMessage: '',
    user: {
      username: '',
      password: '',
      confirmPassword: ''
    }
  }),
  watch: {
    user: {
      handler() {
        this.errorMessage = 'Les mots de passe doivent être identiques !'
        return false
      }
    }
  },
  methods: {
    signup() {
      this.errorMessage = ''
      if (this.validUser()) {
        const body = {
          username: this.user.username,
          password: this.user.password
        }
        this.signingUp = true
        fetch(SIGNUP_URL, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'content-type': 'application/json'
          }
        })
          .then((response) => {
            if (response.ok) {
              return response.json()
            }

            response.json.then(error => {
              throw new Error(error.message)
            })
          })
          .then(() => {
            setTimeout(() => {
              this.signingUp = false
              this.$router.push('/login')
            }, 1000)
          })
          .catch(error => {
            setTimeout(() => {
              this.signingUp = false
              this.errorMessage = error.message
            }, 10000)
          })
      }
    },
    validUser() {
      if (this.user.password !== this.user.confirmPassword) {
        this.errorMessage = 'Les mots de passe entrés ne sont pas identiques ❌'
        return false
      }

      const result = Joi.validate(this.user, schema)
      
      if (result.error === null) return true

      if (result.error.message.includes('username')) {
        this.errorMessage = "Nom d'utilisateur invalide"
      } else {
        this.errorMessage = 'Mot de passe invalide'
      }
      return false
    }
  }
}
</script>

<style></style>
