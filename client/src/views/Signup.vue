<template>
  <section>
    <h1>Inscription</h1>
    <form @submi.prevent="signup">
      <div class="form-group">
        <label for="username">Nom d'utilisateur</label>
        <input
          v-model="user.username"
          type="text"
          class="form-control"
          id="username"
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
            v-model="user.password"
            type="password"
            class="form-control"
            id="password"
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
            v-model = "user.confirmPassword"
            type="password"
            class="form-control"
            id="confirmPassword"
            aria-describedby="confirmPasswordHelp"
            placeholder="Mot de passe"
            required
          />
          <small id="ConfirmPasswordHelp" class="form-text text-muted"
            >Entrez le mot de passe à nouveau.</small
          >
        </div>
      </div>
      <button type="submit" class="btn btn-primary">S'inscrire !</button>
    </form>
  </section>
</template>

<script>
export default {
  data: () => ({
    user: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  }),
  methods: {
    signup() {
      if (this.validUser()){
        
      }
    },
    validUser() {

    },
  },
};
</script>

<style></style>
