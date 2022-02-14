
const validateInputs = (name, business_nm, email, password) => {
    if (name !== "" && business_nm !== "" && email !== "" && password !== "") {
        this.isValidated = true;
    } else {
      //Crear helper para hacer la validación, llamar la función para validar los campos
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
    }
    return this.isValidated;
}

module.exports = { validateInputs }

/* if (data.name.trim() !== "" &&data.business_nm.trim() !== "" &&data.email.trim() !== "" &&data.password.trim() !== "") {this.isValidated = true;
    } else {
      
      
      
      toast.warning("Debes llenar todos los campos!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } */