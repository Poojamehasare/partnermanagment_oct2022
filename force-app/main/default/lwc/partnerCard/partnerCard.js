import { LightningElement, api, wire } from 'lwc';



export default class PartnerCard extends LightningElement {

    // JS Object
    
    
    @api partnerAccount; // This will elevate a private property to public property so that it can receive data from outside or the caller


    partnerBadgeTheme = 'slds-theme_offline';

    connectedCallback() {

        // get the theme dynamically
        this.getPartnerTheme(this.partnerAccount.Partner_Type);
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


}