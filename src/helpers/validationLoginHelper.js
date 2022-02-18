
const validateLogin = (email, password) => {
    if (email !== "" && password !== "") {
        this.isValidated = true;
    } else {
      if (email === "") {
        document.getElementById("email").classList.add("is-invalid");
        this.isValidated = false;
      }
      document.getElementById("email").addEventListener("click", function focus() {
          document.getElementById("email").classList.remove("is-invalid");
      });

      if (password === "") {
        document.getElementById("password").classList.add("is-invalid");
        this.isValidated = false;
      }
      document
        .getElementById("password")
        .addEventListener("click", function focus() {
          document.getElementById("password").classList.remove("is-invalid");
        });
    }
    return this.isValidated;
}

module.exports = { validateLogin }