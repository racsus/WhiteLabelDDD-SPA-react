const StringHelper = {
    isGuid: function(stringToTest) {
        var regexGuid = /^(\{){0,1}[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}(\}){0,1}$/gi;
        return regexGuid.test(stringToTest);
    }
};

export default StringHelper;