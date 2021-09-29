import API from "./API.js";
import responseModel from "../models/Generic/responseModel";
import config from "../auth_config.json";

const APICall = {
    post: async function(url, model, auth0Client) {
        // Get token
        const accessToken = await auth0Client.getTokenSilently({
            audience: config.audience,
            scope: 'openid',
        });

        API.defaults.headers.common = {'Authorization': `Bearer ${accessToken}`};
        let response = await API.post(url, model).catch(function (errorMessage) {
            return { 
                "data":  {
                    "object": null, 
                    "errors": [`${errorMessage }`]
                }
            };
        });
        if (response !== null) {
            let result = response.data;
            if (result.succeeded === true) {
                return new responseModel(true, result.object,  null);
            } else {
                return new responseModel(false, null, result.Errors.length > 0 ? result.Errors[0].Description : "There is a problem with the API service.");
            }               
        } else {
            return new responseModel(false, null, "There is a problem with the API service.");
        } 
    },

    get: async function(url, auth0Client) {
        // Get token
        const accessToken = await auth0Client.getTokenSilently({
            audience: config.audience,
            scope: 'openid',
        });

        API.defaults.headers.common = {'Authorization': `Bearer ${accessToken}`};
        let response = await API.get(url).catch(function (errorMessage) {
            return { 
                "data":  {
                    "object": null, 
                    "errors": [`${errorMessage }`]
                }
            };
        });
        if (response !== null) {
            let result = response.data;
            if (result.succeeded === true) {
                return new responseModel(true, result.object,  null);
            } else {
                return new responseModel(false, null, result.Errors.length > 0 ? result.Errors[0].Description : "There is a problem with the API service.");
            }               
        } else {
            return new responseModel(false, null, "There is a problem with the API service.");
        } 
    },

    put: async function(url, model, auth0Client) {
        // Get token
        const accessToken = await auth0Client.getTokenSilently({
            audience: config.audience,
            scope: 'openid',
        });

        API.defaults.headers.common = {'Authorization': `Bearer ${accessToken}`};
        let response = await API.put(url, model).catch(function (errorMessage) {
            return { 
                "data":  {
                    "object": null, 
                    "Errors": [ { "Description" : `${errorMessage }` }],
                    "succeeded": false
                }
            };
        });
        if (response !== null) {
            let result = response.data;
            if (result.succeeded === true) {
                return new responseModel(true, result.object,  null);
            } else {
                return new responseModel(false, null, result.Errors.length > 0 ? result.Errors[0].Description : "There is a problem with the API service.");
            }               
        } else {
            return new responseModel(false, null, "There is a problem with the API service.");
        } 
    },

    delete: async function(url, auth0Client) {
        // Get token
        const accessToken = await auth0Client.getTokenSilently({
            audience: config.audience,
            scope: 'openid',
        });

        API.defaults.headers.common = {'Authorization': `Bearer ${accessToken}`};
        let response = await API.delete(url).catch(function (errorMessage) {
            return { 
                "data":  {
                    "object": null, 
                    "errors": [`${errorMessage }`]
                }
            };
        });
        if (response !== null) {
            let result = response.data;
            if (result.succeeded === true) {
                return new responseModel(true, result.object,  null);
            } else {
                return new responseModel(false, null, result.Errors.length > 0 ? result.Errors[0].Description : "There is a problem with the API service.");
            }               
        } else {
            return new responseModel(false, null, "There is a problem with the API service.");
        } 
    }
};

export default APICall;