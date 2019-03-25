# React Redux - Azure Active Directory

Sample ASP.NET Core application with React/Redux with Azure AD Authentication and Authorization.

This sample project extends the basic Visual Studio template for an ASP.NET Core Web Application with React and Redux. The out of the box behavior for this project type does not include support for Azure Active Directory. This project adds redux-oidc and oidc-client packages to add OpenID Connect and OAuth 2.0 support to the project which will integrates with the Azure AD v1.0 endpoint. It also adds Authorization to an API included in the project template to verify your access token.

## Prerequisites

1. Visual Studio 2015/2017 or Visual Studio Code
2. .Net Core 2.1 SDK
3. Npm (v 6.4.1)
4. Node (v 10.15.3)

## Azure AD Setup

In order to configure this application properly, you must have a few resources in place on Azure. You will need an Azure Active Directory Tenant and 2 Azure App Registrations: A Client App Registration and an API App registrations. As you complete the instructions, gather the italicized values which are used in the Application Configuration step below. The instructions are listed below:

1. Azure Active Directory Tenant - See the following if you do not have an Azure tenant setup: https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-create-new-tenant

   - After you have created your tenant, do the following in the Azure portal to get your _{Tenant ID}_:
     - Select Azure Active Directory > Properties > Directory ID in the Azure portal
   - Get the Azure AD _{Domain}_ - In the Azure Portal:
     - Select Azure Active Directory > Overview > Domain is at the top of the page.

2. Azure AD - Register the API Application - See the directions here if you do not have one: https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-v1-add-azure-ad-app

   - Application Type: Web app/API
   - Sign-on URL: {Url of the the runing application} i.e. https://localhost:5001/
   - After you have created the application get the _{Resource ID}_ to configure your application in the Azure Portal:
     - Select Azure Active Directory > App Registrations > View All Applications > Copy the Application ID of your newly created api app registration.

3. Azure AD - Register the Client Application - See the directions here if you do not have one: https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-v1-add-azure-ad-app

   - Application Type: Web app/API
   - Sign-on URL: {Url of the the runing application} i.e. https://localhost:5001/
   - Once created, you will need to do 3 additional steps:
     - Set the callback Reply URL's
       - Settings > Reply URL's > Add https://localhost:5001/callback
     - Set Permissions
       - Settings > Required Permissions > Add
       - Select an API > Search for the API name and select it.
       - Enable Access > Deletegated Permissions > Access { Your API Name} > Select and Done.
       - On Required permissions screen > Hit Grant permissions and click yes.
     - Enable Implicit Flow
       - Locate your Azure App Registration for the Client.
       - Select Manifest > Update the "oauth2AllowImplicitFlow" property to true.
       - Save your changes.
   - After you have created the application get the _{Application ID}_ to configure your application in the Azure Portal:
     - Select Azure Active Directory > App Registrations > View All Applications > Copy the Application ID of your newly created application.

## Application Configuration

Now that you have your Azure AD application setup, you can use the values listed above to configure your application.

Please note you will need the following values for this to work:

- Tenant ID - Azure Active Directory Tenant GUID
- Domain - Azure Active Directory Domain
- Application ID - Application ID of your registered client application
- Resource ID - Application ID of your registered API application
- Signing Keys - This will be described in more detail below

### appsettings.json

Using the variables above, replace the values in the appsettings.json file as shown below:

```
{
  "AzureAd": {
    "Instance": "https://login.microsoftonline.com/",
    "Domain": "{Domain}",
    "TenantId": "{Tenant ID}",
    "ClientId": "{Resource ID}"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Warning"
    }
  },
  "AllowedHosts": "*"
}

```

### userManager.js

Using the variables above, replace the values in the appsettings.json file as shown below:

```
const clientId = "{Application ID}";
const tenantId = "{Tenant ID}";
const resourceId = "{Resource ID}"; //Typically this would be hosted in a separate endpoint, but for simplicity and to match the Visual Studio template, it's embedded in the same app for demonstration purposes.

```

_Signing Keys_

In order to verify tokens received Azure AD you will need to add signing keys to your user manager. When you try to access them from the oidc-redux client, the Microsoft endpoint will throw a CORS exception. There are a number of work arounds, but the simplest for this demonstration will be to add the keys from the point below to your user manager:

https://login.microsoftonline.com/common/discovery/keys

```
  },
  signingKeys: [
  ]
};
```

The value you need to include is inside the keys array. For example, if the keys look like this:

```
{"keys":[{"kty":"RSA",...}]}
```

You will need to copy the value within the brackets into the signingKeys array:

```
signingKeys: [
    {"kty":"RSA",...}
]
```
