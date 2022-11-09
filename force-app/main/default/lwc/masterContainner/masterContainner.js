import { LightningElement } from 'lwc';

export default class MasterContainner extends LightningElement {

    // To hold selected partner Type Id sent by child component (partnerSearch)
    partnerTypeId = ''; 
    
    partnerSelectHandler(event)
    {
        this.partnerTypeId = event.detail;

    }
   
}