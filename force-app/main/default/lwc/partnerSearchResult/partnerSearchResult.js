import { LightningElement, wire, api } from 'lwc'; // 1. add wire decorator

//2. import apex method using salesforce apex package

import  getPartners from '@salesforce/apex/PartnerManagementController.getPartnerAccounts' 


import { NavigationMixin} from 'lightning/navigation'; // Navigation : step 1

export default class PartnerSearchResult extends NavigationMixin(LightningElement) { // Navigation : step 3

    /*
    partnerAccountData = {

        userImg: 'https://randomuser.me/api/portraits/med/women/75.jpg',
        Name: 'Adobe Inc',
        Partner_Primary_POC: 'Lavanya A',
        Partner_Type: 'Technology Partner',
    };*/


    @api selectedPartnerTypeId; 

    partnerAccounts; // property to hold all partner accounts retrieved from Database
    // 3. use @wire and make a call to APEX method from LWC
    @wire(getPartners, {strPartnerTypeId: '$selectedPartnerTypeId'})
    processOutput({data,error})
    {
        if(data)
        {
            this.partnerAccounts = data;
            console.log('this.partnerAccounts::' + JSON.stringify(this.partnerAccounts));
        }
        else if(error)
        {
            console.log('Error:' + error.body.message);

        }
    };

    
    get IsPartnerAccountsFound()
    {
        if(this.partnerAccounts != null && this.partnerAccounts.length >0)
        {
            return true;
        }
        return false;
    }

    OpenNewPartnerAccountPage(event)
    {
       
        event.preventDefault();

        // Navigation : step 2
        const redirectioninput = {
            type: 'standard__objectPage',
            attributes: {
                actionName: "new",
                objectApiName: "Account"
            }
        };

        this[NavigationMixin.Navigate](redirectioninput);

    }

}