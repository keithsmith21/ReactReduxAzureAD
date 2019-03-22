import { createUserManager } from "redux-oidc";

const clientId = ""; //GUID Client Application ID
const tenantId = ""; //GUID Azure Tenant ID
const resourceId = ""; //GUID API Application ID

const userManagerConfig = {
  authority: `https://login.microsoftonline.com/${tenantId}/.well-known/openid-configuration`,
  client_id: clientId,
  redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : "" }/callback`,
  post_logout_redirect_uri: `${window.location.protocol}//${ window.location.hostname }${window.location.port ? `:${window.location.port}` : ""}`,
  automaticSilentRenew: false,
  filterProtocolClaims: true,
  loadUserInfo: false,
  scope: "openid profile ",
  response_type: "token id_token",
  extraQueryParams: {
    resource: resourceId
  },
  signingKeys: [
  ]
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
