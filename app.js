const $forms = document.querySelectorAll(".signup-form");  // Consume la info que hay en nuestro Formulario
const getTemplate = () => {
  return fetch("./template.html").then((response) => response.text()); // Funcion envia nuestra info de nuestro html o contenido 
};
// declarar el correo electronico  que vive dentro de mi pagina en internet del cual yo enviare el correo a mi usuario
const sendEmailToApi = (address, template) => {      
  fetch(`https://bedu-email-sender-api.herokuapp.com/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: address,
      template: template,
    }),
  })
    .then((results) => {
      console.log(results);
    })
    .catch((error) => {
      console.error(error);
    });
};
const sendEmail = (event) => {     // el correo que yo ponga envialo a ese correo 
  event.preventDefault();
  const email = event.target.querySelector("input").value;
  getTemplate()
    .then((template) => {
      sendEmailToApi(email, template);
    })
    .catch((error) => {
      console.log(error, "error al convertir el template.");
    });
};
for (let i = 0; i < $forms.length; i++) {     // un bucle que me permite enviar de nuevo otro correo 
  $forms[i].addEventListener("submit", sendEmail);
}
//Se borraron espacios para eviar errores