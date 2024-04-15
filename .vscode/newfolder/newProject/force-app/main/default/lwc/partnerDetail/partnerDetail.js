import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { subscribe, unsubscribe, MessageContext} from 'lightning/messageService';
import PARTNER_CHANNEL from '@salesforce/messageChannel/PartnerAccountDataMessageChannel__c';
import FIELD_PARTNER_PIPELINE from '@salesforce/schema/Account.Partner_Active_Pipeline_Value__c';
import FIELD_PARTNER_BUDGET from '@salesforce/schema/Account.Partner_Budget__c';
import FIELD_PARTNER_CONTRACTENDDATE from '@salesforce/schema/Account.Partner_Contract_End_Date__c';
import FIELD_PARTNER_CONTRACTSTARTDATE from '@salesforce/schema/Account.Partner_Contract_Start_Date__c';

import FIELD_PARTNER_ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import FIELD_PARTNER_PRIMARY_POC from '@salesforce/schema/Account.Partner_Primary_POC__c';
import FIELD_PARTNER_TRAINNED_PARTNERS from '@salesforce/schema/Account.Number_of_trained_Partner_contacts__c';
import FIELD_PARTNER_GEO_LONG from '@salesforce/schema/Account.Partner_Geo_Location__Longitude__s';
import FIELD_PARTNER_GEO_LAT from '@salesforce/schema/Account.Partner_Geo_Location__Latitude__s';


export default class PartnerDetail extends NavigationMixin(LightningElement) {

      subscribeToChannel; // property to hold whether subscription is done or not

      // properties to hold information from MC
      channelName;
      partnerAccountName;
      partnerAccountId;

      
      objectApiName = 'Account';
      //recordId = '0015h00000zyM5vAAE';

      cardTitle; 


      // Expose properties to use them in template - Data binding 
      partnerPipeline =  FIELD_PARTNER_PIPELINE;
      partnerBudget = FIELD_PARTNER_BUDGET;
      partnerContractStartDate  = FIELD_PARTNER_CONTRACTENDDATE;
      partnerContractEndDate  = FIELD_PARTNER_CONTRACTSTARTDATE;

      partner_account = FIELD_PARTNER_ACCOUNT_NAME;
      partner_primaryPOC = FIELD_PARTNER_PRIMARY_POC;
      partner_TrainnedParticipants = FIELD_PARTNER_TRAINNED_PARTNERS;
      partner_lat = FIELD_PARTNER_GEO_LONG;
      partner_long = FIELD_PARTNER_GEO_LAT;
      



     //This will hold information about the component, page from which data is being published
       @wire(MessageContext)
       messageContext;
       
       connectedCallback()
       {
            //  LMS : Step 4  - subscribe to the channel

            if(this.subscribeToChannel)
                return;

                this.subscribeToChannel = subscribe(this.messageContext, PARTNER_CHANNEL,
                    (message) => {
                        this.unpackMessage(message);
                    }/* ,{ scope: APPLICATION_SCOPE }*/
                );
            //this.subscribeToChannel = subscribe(this.MessageContext, PARTNER_CHANNEL, (message) => {this.unpackMessage(message);});
       }

       // //  LMS : Step 4.1 - read data published in the channel
       unpackMessage(message)
       {
                this.channelName = message.name;
                this.partnerAccountName = message.selectedpartneraccountName;
                this.partnerAccountId = message.selectedpartneraccountId;

                this.cardTitle = 'Partner Detail - ' + this.partnerAccountName;
       }

       renderedCallback()
       {

       }

       disconnectedCallback()
       {
            unsubscribe(this.subscribeToChannel);            
       }

       redirectToPartnerReviewFlow()
       {

            // Navigation : step 2
            const redirectioninput = {
                type: 'standard__webPage',
                attributes: {
                    
                    url: '/flow/Rate_Partner_Performance?partnerAccountId=' + this.partnerAccountId
                }
            };

            this[NavigationMixin.Navigate](redirectioninput, false);

       }

       showPartnerPOCLocation()
       {

       }


       get IsPartnerAccountSelected()
       {
        if(this.partnerAccountId !=null && this.partnerAccountId.length >0)
            return true;
        else
            return false;
       } 
}