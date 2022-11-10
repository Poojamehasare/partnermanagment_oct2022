import { LightningElement, wire } from 'lwc';


// LMS : Step 1
import { subscribe, unsubscribe, MessageContext} from 'lightning/messageService';

 // LMS : Step 2 - Import or refer MC being created to carry data to all subscribers
import PARTNER_CHANNEL from '@salesforce/messageChannel/PartnerAccountDataMessageChannel__c'


export default class PartnerDetail extends LightningElement {

      subscribeToChannel; // property to hold whether subscription is done or not

      // properties to hold information from MC
      channelName;
      partnerAccountName;
      partnerAccountId;
    
        // LMS : Step 3 - This will hold information about the component, page from which data is being published
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
       }

       renderedCallback()
       {

       }

       disconnectedCallback()
       {
            unsubscribe(this.subscribeToChannel);            
       }


       get IsPartnerAccountSelected()
       {
        if(this.partnerAccountId !=null && this.partnerAccountId.length >0)
            return true;
        else
            return false;
       }

}