export default class ResponseModel {

    succeeded;
    object;
    errorMessage;

    constructor(succeded, element, errorMessage) 
    {
        this.succeeded = succeded;
        this.object = element;
        this.errorMessage = errorMessage;
    }

    static responseModelOk(element){
        return new ResponseModel(true, element, null);
    }

    static responseModelKo(message){
        return new ResponseModel(false, null, message);
    }
}