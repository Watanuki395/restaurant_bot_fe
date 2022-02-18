
const validateInputs = (name, business_nm, email, password, password2) => {
    if (name !== "" && business_nm !== "" && email !== "" && password !== "") {
        this.isValidated = true;
    } else {
      if (name === "") {
        document.getElementById("name").classList.add("is-invalid");
        this.isValidated = false;
      }
      document.getElementById("name").addEventListener("click", function focus() {
          document.getElementById("name").classList.remove("is-invalid");
      });

      if (business_nm === "") {
        document.getElementById("business_nm").classList.add("is-invalid");
        this.isValidated = false;
      }
      document
        .getElementById("business_nm")
        .addEventListener("click", function focus() {
          document.getElementById("business_nm").classList.remove("is-invalid");
        });

      if (email === "") {
        document.getElementById("email").classList.add("is-invalid");
        this.isValidated = false;
      }
      document
        .getElementById("email")
        .addEventListener("click", function focus() {
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
      if (password2 === "") {
        document.getElementById("password2").classList.add("is-invalid");
        this.isValidated = false;
      }
      document
        .getElementById("password2")
        .addEventListener("click", function focus() {
          document.getElementById("password2").classList.remove("is-invalid");
        });
    }
    return this.isValidated;
}

const validatePasswords = (password, password2) => {
  if (password !== password2) {
    document.getElementById("password2").classList.add("is-invalid");
    return false;
  } else {

    document.getElementById("password2").addEventListener("click", function focus() {
      document.getElementById("password2").classList.remove("is-invalid");
    });

    return true;
  }
}

module.exports = { validateInputs, validatePasswords }
