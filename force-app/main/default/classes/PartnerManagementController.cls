public with sharing class PartnerManagementController {
    public PartnerManagementController() {

    }

    // Annotate an apex method with @aurenabled so that it can be accesses from LWC 
    @AuraEnabled(cacheable=true)
    public static List<Partner_Type__c> getPartnerType(){
        try {
            return [SELECT Id, Name FROM Partner_Type__c];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
