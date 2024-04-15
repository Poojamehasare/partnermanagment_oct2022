import { LightningElement, api, wire } from 'lwc';
import { publish, MessageContext} from 'lightning/messageService';
import PARTNER_CHANNEL from '@salesforce/messageChannel/PartnerAccountDataMessageChannel__c'
export default class PartnerCard extends LightningElement {

    @api partnerAccount; 

   partnerBadgeTheme = 'slds-theme_offline';
    userImg; // property to hold user Img


    //This will hold information about the component, page from which data is being published
    @wire(MessageContext)
    messageContext;
    partnerCardStyle;

    connectedCallback() {

        // get the theme dynamically
        this.getPartnerTheme(this.partnerAccount.Partner_Type_Lookup__r.Name);
        this.getUserImage(this.partnerAccount.Partner_Primary_POC__r.Salutation);
    }

    getPartnerTheme(partnerType) {
        switch (partnerType) {
            case "Technology Partner":
                this.partnerBadgeTheme = 'slds-theme_success';
                break;
            case "Marketing Partner":
                this.partnerBadgeTheme = 'slds-theme_info';
                break;
            case "Social Media Channel Partner":
                this.partnerBadgeTheme = 'slds-theme_warning';
                break;

            default:
                this.partnerBadgeTheme = 'slds-theme_offline';
                break;
        }
    }

    getUserImage(salutaion) {
        // genrate a random number
        const randomNumber = Math.floor(Math.random() * 100);
        switch (salutaion) {
            case "Mr.":
                this.userImg = `https://randomuser.me/api/portraits/med/men/${randomNumber}.jpg`;
                break;
            case "Ms.":
                this.userImg = `https://randomuser.me/api/portraits/med/women/${randomNumber}.jpg`;
                break;
            default:
                this.userImg = 'https://randomuser.me/api/portraits/med/women/15.jpg';

                break;
        }
    }

    selectedPartnerHandler(event)
    {

        // LMS : Step 4 - Start adding data into MC and publish

        const msgPublish = {

            name:'Partner Card',
            selectedpartneraccountId: this.partnerAccount.Id,
            selectedpartneraccountName: this.partnerAccount.Name
        };


        //publish
        publish(this.messageContext, PARTNER_CHANNEL,msgPublish);
    }


}