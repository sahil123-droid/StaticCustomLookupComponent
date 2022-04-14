public with sharing class MyCustomLookupController {
    @AuraEnabled
    public static List<sObject> fetchData(String objectName , String field , String searchTerm){
        try{
            String query = 'Select Id,Name from '+objectName;
            if(searchTerm != ''){
               	query += ' Where '+ field + ' LIKE ';
                query += '\'%' + searchTerm + '%\'';
            }
            System.debug('query => '+query);
            List<sObject> records = Database.query(query);
            System.debug(records);
            return records;
        }
        catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
}