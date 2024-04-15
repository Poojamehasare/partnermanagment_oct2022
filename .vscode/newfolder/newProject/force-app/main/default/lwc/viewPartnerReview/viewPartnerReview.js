import { LightningElement, wire, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getPartnerReviews from '@salesforce/apex/PartnerManagementController.getPartnerReviews';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import PARTNER_CHANNEL from '@salesforce/messageChannel/PartnerAccountDataMessageChannel__c';

export default class ViewPartnerReview extends NavigationMixin(LightningElement) {

    // properties to hold information from MC
    channelName;
    partnerAccountName;
    partnerAccountId;
    subscribeToChannel; // property to hold whether subscription is done or not
    partnerReviews; // to hold all the reviews about the partner
    partner; // to hold current partner review
    recordIndex = 0; // to hold current item or index of the review

    @wire(getPartnerReviews, { partnerAccountId: '$partnerAccountId' })
    processOutput({ data, error }) {
        if (data) {
            this.partnerReviews = data;

            console.log('this.partnerReviews::' + JSON.stringify(this.partnerReviews));

            if (this.IsReviewsFound) {
                this.getCurrentPArtnerReview();
            }
        }
        else if (error) {
            console.log('Error:' + error.body.message);

        }
    };
    // LMS : Step 3 - This will hold information about the component, page from which data is being published
    @wire(MessageContext)
    messageContext;


    getCurrentPArtnerReview() {
        this.partner = this.partnerReviews[this.recordIndex];
    }

    navigatepreviousReview() {
        this.recordIndex = this.recordIndex - 1;
        //this.partner = this.partnerReviews[this.recordIndex];
        this.getCurrentPArtnerReview();
    }

    navigateNextReview() {
        this.recordIndex = this.recordIndex + 1;
        //this.partner = this.partnerReviews[this.recordIndex];
        this.getCurrentPArtnerReview();
    }

    connectedCallback() {
        //  LMS : Step 4  - subscribe to the channel

        if (this.subscribeToChannel)
            return;

        this.subscribeToChannel = subscribe(this.messageContext, PARTNER_CHANNEL,
            (message) => {
                this.unpackMessage(message);
            }/* ,{ scope: APPLICATION_SCOPE }*/
        );
        //this.subscribeToChannel = subscribe(this.MessageContext, PARTNER_CHANNEL, (message) => {this.unpackMessage(message);});
    }

    // //  LMS : Step 4.1 - read data published in the channel
    unpackMessage(message) {
        this.channelName = message.name;
        this.partnerAccountName = message.selectedpartneraccountName;
        this.partnerAccountId = message.selectedpartneraccountId;


    }

    renderedCallback() {

    }

    disconnectedCallback() {
        unsubscribe(this.subscribeToChannel);
    }


    get IsPartnerAccountSelected() {
        if (this.partnerAccountId != null && this.partnerAccountId.length > 0)
            return true;
        else
            return false;
    }

    get IsReviewsFound() {
        if (this.partnerReviews != null && this.partnerReviews.length > 0) {
            return true;
        }
        return false;
    }

    navigateToAddReviewFlow(event) {

        // Navigation : step 2
        const redirectioninput = {
            type: 'standard__webPage',
            attributes: {

                url: '/flow/Rate_Partner_Performance?partnerAccountId=' + this.partnerAccountId
            }
        };

        this[NavigationMixin.Navigate](redirectioninput, false);

    }




}