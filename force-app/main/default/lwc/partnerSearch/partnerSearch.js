import { LightningElement, wire } from "lwc"; // 1. add wire decorator

import  fetchAllPartnerTypes from '@salesforce/apex/PartnerManagementController.getPartnerType' //2. import apex method using salesforce apex package


export default class PartnerSearch extends LightningElement {
    value = 'inProgress';

    partnerTypes; // property to hold all partner types retrieved from Database
    // 3. use @wire and make a call to APEX method from LWC
    @wire(fetchAllPartnerTypes)
    processOutput({data,error})
    {
        if(data)
        {
            
            // read the data and bind  to combo box
            console.log('Partner Types from DB::' + JSON.stringify(data));
            
            //this.partnerTypes = data;
            this.partnerTypes = [{label: '-- Select Partners --', value: ''}];

           // loop thru each item in the data array and change the key
            data.forEach(item => {
                const partnerType = {}; // empty object
                partnerType.label = item.Name;
                partnerType.value = item.Id;

                // add the object into partnerTypes main array of objects
                this.partnerTypes.push(partnerType);
            });

        
        
        }    
        else if(error)
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
    
}