import { LightningElement, wire } from "lwc";
import  fetchAllPartnerTypes from '@salesforce/apex/PartnerManagementController.getPartnerType';
import { NavigationMixin} from 'lightning/navigation';
import { refreshApex } from '@salesforce/apex'; 
export default class PartnerSearch extends NavigationMixin(LightningElement) { 
    value = 'inProgress';
    dataReceived;
    dataToRefresh;


    partnerTypes; // property to hold all partner types retrieved from Database
    
    @wire(fetchAllPartnerTypes)
    processOutput(result)
    {
        if(result.data)
        {

                
            this.dataReceived = result.data; 
            this.dataToRefresh = result;

            refreshApex(this.dataToRefresh); 
          
            console.log('Partner Types from DB::' + JSON.stringify(result.data));
            
            //this.partnerTypes = data;
            this.partnerTypes = [{label: '-- Select Partners --', value: ''}];

          
           result.data.forEach(item => {
                const partnerType = {};
                partnerType.label = item.Name;
                partnerType.value = item.Id;

                // add the object into partnerTypes main array of objects
                this.partnerTypes.push(partnerType);
            });

        
        
        }    
        else if(result.error)
        {
            console.log('Error:' + error.body.message);
        }
    }
    
    get options() {

        return [
            { label: 'Marketing Partner', value: '0X123' },
            { label: 'Technology Partner', value: 'oY23233' },
            { label: 'Social Media Partner', value: 'o22w3233' },
            { label: 'Client Advocates', value: '7kfkf2w3233' },
            { label: 'Legal Partner', value: '3op03848' },
        ];
    }

    get cardTitle()
    {
        return 'Learning Data Binding';
    }


    OpenPartnerTypePage(event)
    {
        const redirectioninput = {
            type: 'standard__objectPage',
            attributes: {
                actionName: "new",
                objectApiName: "Partner_Type__c"
            }
        };

        this[NavigationMixin.Navigate](redirectioninput);


    }

    OpenAccountStdPage()
    {
         const redirectioninput = {
            type: 'standard__objectPage',
            attributes: {
                actionName: "new",
                objectApiName: "Account"
            }
        };

        this[NavigationMixin.Navigate](redirectioninput);

    }

    OpenContactStdPage()
    {
        const redirectioninput = {
            type: 'standard__objectPage',
            attributes: {
                actionName: "new",
                objectApiName: "Contact"
            }
        };

        this[NavigationMixin.Navigate](redirectioninput);
    }


    PartnerChangeHandler(event)
    {
        // read partner Type Id
        const selectedPartnerTypeId = event.detail.value; 

        // Send selectedPartnerTypeId to masterContainner parent component using custom events
        const evt = new CustomEvent('selectedpartnertype', {detail: selectedPartnerTypeId});
        this.dispatchEvent(evt);


    }
    
}