import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080/",
  realm: "E-commerce",
  clientId: "frontend_client",
});

export default keycloak;
