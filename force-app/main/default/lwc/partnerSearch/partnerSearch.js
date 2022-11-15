import { LightningElement, wire } from "lwc"; // 1. add wire decorator

import  fetchAllPartnerTypes from '@salesforce/apex/PartnerManagementController.getPartnerType' //2. import apex method using salesforce apex package

import { NavigationMixin} from 'lightning/navigation'; // Navigation : step 1

import { refreshApex } from '@salesforce/apex'; 

export default class PartnerSearch extends NavigationMixin(LightningElement) { // Navigation : step 3
    value = 'inProgress';


    // cache burst
    dataReceived;
    dataToRefresh;


    partnerTypes; // property to hold all partner types retrieved from Database
    // 3. use @wire and make a call to APEX method from LWC
    @wire(fetchAllPartnerTypes)
    //processOutput({data,error})
    processOutput(result)
    {
        if(result.data)
        {

                
            this.dataReceived = result.data; // copy of data
            this.dataToRefresh = result; // copy of entire object containing data and error

            refreshApex(this.dataToRefresh); // Keep checking for new changes, if there are any, burst the cache and make a call to DB and bring data
            
            // read the data and bind  to combo box
            console.log('Partner Types from DB::' + JSON.stringify(result.data));
            
            //this.partnerTypes = data;
            this.partnerTypes = [{label: '-- Select Partners --', value: ''}];

           // loop thru each item in the data array and change the key
           result.data.forEach(item => {
                const partnerType = {}; // empty object
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

        // JS array of objects
        return [
            { label: 'Marketing Partner', value: '0X123' },
            { label: 'Technology Partner', value: 'oY23233' },
            { label: 'Social Media Partner', value: 'o22w3233' },
            { label: 'Client Advocates', value: '7kfkf2w3233' },
            { label: 'Legal Partner', value: '3op03848' },
        ];
    }

    // property - Syntax Option I
    //cardTitle = 'Learning Data Binding';

    // property - Syntax Option II
    get cardTitle()
    {
        return 'Learning Data Binding';
    }


    OpenPartnerTypePage(event)
    {
        // Navigation : step 2
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

    OpenContactStdPage()
    {
        // Navigation : step 2
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
        // read channel partner Type Id
        const selectedPartnerTypeId = event.detail.value; 

        // Send selectedPartnerTypeId to masterContainner parent component using custom events
        const evt = new CustomEvent('selectedpartnertype', {detail: selectedPartnerTypeId});
        this.dispatchEvent(evt);


    }
    
}