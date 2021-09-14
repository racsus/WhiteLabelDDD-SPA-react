import APICall from "../../utils/APICalls.js";
import responseModel from "../../models/Generic/responseModel";
import numberHelper from "../../helpers/NumberHelper";

const UserServiceClient = {
    getPaginated: async function(pageModel, auth0Client) {
        // Map filters
        if ((pageModel.filters) && (pageModel.filters.length > 0)) {
            pageModel.filters.forEach(ele => {
                switch(ele.member) {
                    case "userName":
                        ele.member = "People.description";
                        break;                                            
                    default:
                  }            
            });
        }

        // Map sorts
        if ((pageModel.sorts) && (pageModel.sorts.length > 0)) {
            pageModel.sorts.forEach(ele => {
                switch(ele.member) {
                    case "userName":
                        ele.member = "People.description";
                        break;                                                
                    default:
                    }            
            });
        }

        let result = await APICall.post(`User/Paginated`, pageModel, auth0Client);
        if (result !== null) {
            if ((result.succeeded === true) && (result.object)) {
                let newItems = [];
                result.object.result.forEach(ele => {
                    let newElement = {
                        "id": ele.id,
                        "date": (new Date(ele.creationDate)).toDateString(),
                        "userName": ele.People.description,
                        "total": ele.total,
                        "_cellClasses": { total: 'cell-number' }
                    }
                    newItems.push(newElement);
                });
                let paginatedObject = { 
                    "items": newItems,
                    "total": result.object.total,
                    "take": result.object.take
                };
                return responseModel.responseModelOk(paginatedObject);
            } else {
                return new responseModel(false, null, ((result.errors) && (result.errors.length > 0)) ? result.errors[0].description : "There is a problem with the API service.");
            }               
        } else {
            return new responseModel.ResponseModelKo("There is a problem with the API service.");
        }        
    },

    get: async function(id, auth0Client) {
        return await APICall.get(`User/${id}`, auth0Client);
    },

    getAll: async function(auth0Client) {
        return await APICall.get(`User/All`, auth0Client);
    },    

    add: async function(User, auth0Client) {
        return await APICall.post(`User`, User, auth0Client);
    },    

    update: async function(User, auth0Client) {
        return await APICall.put(`User`, User, auth0Client);
    },

    delete: async function(id, auth0Client) {
        return await APICall.delete(`User/${id}`, auth0Client);
    },    

    getAllUserStatus: async function(auth0Client) {
        return await APICall.get(`User/AllStatus`, auth0Client);
    }
};

export default UserServiceClient;