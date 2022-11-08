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

    // APEX method to get all partner accounts to show on the screen
    // By passing a partner type Id, it will filter the results

    @AuraEnabled(cacheable=true)
    public static List<Account> getPartnerAccounts(string strPartnerTypeId){
    try {   

        if(String.isEmpty(strPartnerTypeId))
        {
            // get all partner accounts
            return [SELECT Id, Name,  Partner_Type_Lookup__c, Partner_Type_Lookup__r.Name, Partner_Primary_POC__c,Partner_Primary_POC__r.Name, Partner_Primary_POC__r.Salutation,
                    Partner_Active_Pipeline_Value__c, Partner_Budget__c, Partner_Contract_End_Date__c,
                    Partner_Contract_Start_Date__c, Partner_Geo_Location__Latitude__s, Partner_Geo_Location__Longitude__s, Partner_Geo_Location__c,  Partner_Status__c, 
                    Partner_Total_Sales_Revenue__c, Partner_Training_Completed__c,Partner_WebSite__c, Number_of_trained_Partner_contacts__c 
                    FROM Account WHERE Partner_Status__c IN ('Active', 'Inactive','Pending')];
        }
        else {
            // filter partner accounts by PArtnerType
            return [SELECT Id, Name,  Partner_Type_Lookup__c, Partner_Type_Lookup__r.Name, Partner_Primary_POC__c,Partner_Primary_POC__r.Name, Partner_Primary_POC__r.Salutation,
                    Partner_Active_Pipeline_Value__c, Partner_Budget__c, Partner_Contract_End_Date__c,
                    Partner_Contract_Start_Date__c, Partner_Geo_Location__Latitude__s, Partner_Geo_Location__Longitude__s, Partner_Geo_Location__c,  Partner_Status__c, 
                    Partner_Total_Sales_Revenue__c, Partner_Training_Completed__c,Partner_WebSite__c, Number_of_trained_Partner_contacts__c 
                    FROM Account WHERE Partner_Status__c IN ('Active', 'Inactive','Pending') AND Partner_Type_Lookup__c =: strPartnerTypeId];

        }           
        

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
