public with sharing class partnerSearchController {
   
   
    @AuraEnabled(cacheable=true)
    public static List<Partner_Type__c> getAllPartnerTypes(){
     try {
        
        return [SELECT Id, Name FROM Partner_Type__c];
     } catch (Exception e) {
         throw new AuraHandledException(e.getMessage());
     }
    }
}
