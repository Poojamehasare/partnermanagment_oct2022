import { LightningElement, api, wire } from 'lwc';



export default class PartnerCard extends LightningElement {

    // JS Object
    partnerAccount = {

        userImg: 'https://randomuser.me/api/portraits/med/men/75.jpg',
        Name: 'Salesforce Inc',
        Partner_Primary_POC: 'Kate Willamson',
        Partner_Type: 'Social Media Channel Partner',
    };


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