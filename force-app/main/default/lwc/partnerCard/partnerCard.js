import { LightningElement, api, wire } from 'lwc';



export default class PartnerCard extends LightningElement {

    // JS Object


    @api partnerAccount; // This will elevate a private property to public property so that it can receive data from outside or the caller


    partnerBadgeTheme = 'slds-theme_offline';
    userImg; // property to hold user Img

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


}