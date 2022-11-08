import { LightningElement, wire } from 'lwc'; // 1. add wire decorator

//2. import apex method using salesforce apex package

import  getPartners from '@salesforce/apex/PartnerManagementController.getPartnerAccounts' 

export default class PartnerSearchResult extends LightningElement {

    /*
    partnerAccountData = {

        userImg: 'https://randomuser.me/api/portraits/med/women/75.jpg',
        Name: 'Adobe Inc',
        Partner_Primary_POC: 'Lavanya A',
        Partner_Type: 'Technology Partner',
    };*/

    partnerTypeId = ''; 

    partnerAccounts; // property to hold all partner accounts retrieved from Database
    // 3. use @wire and make a call to APEX method from LWC
    @wire(getPartners, {strPartnerTypeId: '$partnerTypeId'})
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

    partnerAccountData = [

        {

            userImg: 'https://randomuser.me/api/portraits/med/women/75.jpg',
            Name: 'Adobe Inc',
            Partner_Primary_POC: 'Lavanya A',
            Partner_Type: 'Technology Partner',
        },
        {

            userImg: 'https://randomuser.me/api/portraits/med/men/75.jpg',
            Name: 'Salesforce Inc',
            Partner_Primary_POC: 'Deepak A',
            Partner_Type: 'Technology Partner',
        },
        {

            userImg: 'https://randomuser.me/api/portraits/med/men/15.jpg',
            Name: '6sense Inc',
            Partner_Primary_POC: 'Saddam',
            Partner_Type: 'Marketing Partner',
        },
        {

            userImg: 'https://randomuser.me/api/portraits/med/men/5.jpg',
            Name: 'Microsoft Inc',
            Partner_Primary_POC: 'Nishant A',
            Partner_Type: 'Technology Partner',
        },
        {

            userImg: 'https://randomuser.me/api/portraits/med/women/50.jpg',
            Name: 'Oracle Inc',
            Partner_Primary_POC: 'Dhanshri A',
            Partner_Type: 'Technology Partner',
        },
        {

            userImg: 'https://randomuser.me/api/portraits/med/men/50.jpg',
            Name: 'Salesforce Inc',
            Partner_Primary_POC: 'Mohan A',
            Partner_Type: 'Marketing Partner',
        },
        {

            userImg: 'https://randomuser.me/api/portraits/med/men/51.jpg',
            Name: 'Demandbase Inc',
            Partner_Primary_POC: 'Nikhil',
            Partner_Type: 'Marketing Partner',
        },
        {

            userImg: 'https://randomuser.me/api/portraits/med/men/55.jpg',
            Name: 'Cisco Inc',
            Partner_Primary_POC: 'Aatish A',
            Partner_Type: 'Technology Partner',
        }

    ];


}