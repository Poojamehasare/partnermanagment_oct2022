import { LightningElement, wire, api } from 'lwc'; 
import  getPartners from '@salesforce/apex/PartnerManagementController.getPartnerAccounts' 
import { NavigationMixin} from 'lightning/navigation'; 
export default class PartnerSearchResult extends NavigationMixin(LightningElement) { 

    /*
    partnerAccountData = {

        userImg: 'https://randomuser.me/api/portraits/med/women/75.jpg',
        Name: 'Adobe Inc',
        Partner_Primary_POC: 'Lavanya A',
        Partner_Type: 'Technology Partner',
    };*/

 
    @api selectedPartnerTypeId; 

    partnerAccounts; // property to hold all partner accounts retrieved from Database
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

    get IsPartnerAccountsFound(){
        if(this.partnerAccounts != null && this.partnerAccounts.length >0)
        {
            return true;
        }
        return false;
    }

    OpenNewPartnerAccountPage(event)
    {
       
        event.preventDefault();
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