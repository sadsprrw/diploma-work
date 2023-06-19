export const TypeUtil = {
    dateFormat: 'YYYY/MM/DD h:mm:ss a',
    dateFormatTimezone: 'YYYY/MM/DD h:mm:ss a ZZ',
    dateVerboseFormat: 'MMM DD, YYYY',
    dateJavaFormat: 'ddd MMM DD HH:mm:ss z YYYY',


    genUUID: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = (c === 'x' ? r : r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

};
