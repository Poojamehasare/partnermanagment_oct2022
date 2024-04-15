public with sharing class PaymentsController {
    
    @AuraEnabled(cacheable=false)
    public static StatementDetailsWrapper getStatementDetails(String statementId) {
        Statement__c statement = [SELECT Id, Statement_Date__c, Balance__c FROM Statement__c WHERE Id = :statementId];
        
        // Create a wrapper class to hold statement details
        StatementDetailsWrapper wrapper = new StatementDetailsWrapper();
        wrapper.statementDate = statement.Statement_Date__c;
        wrapper.balance = statement.Balance__c;
        
        return wrapper;
    }

    // Wrapper class to hold statement details
    public class StatementDetailsWrapper {
        @AuraEnabled public Date statementDate { get; set; }
        @AuraEnabled public Decimal balance { get; set; }
    }
}
