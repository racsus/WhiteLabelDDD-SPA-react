const NumberHelper = {
    formatCurrency: function(number) {
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',    
            // These options are needed to round to whole numbers if that's what you want.
            //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
            //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
        });
        
        var res = formatter.format(number); 

        return res;
    },

    convertCurrencyToNumber: function(number) {
        return Number(number.replace(/[^0-9.-]+/g,""));
    },

    formatPercentage: function(number) {
        var res = number;
        if (number) {
            res = res + '%';
        }

        return res;
    }
};

export default NumberHelper;