import { LightningElement, api, wire } from 'lwc';


import { loadScript, loadStyle } from 'lightning/platformResourceLoader'; // functions to load css and js dynamically
import LEAFLET from '@salesforce/resourceUrl/leaflet'; // load Static resource

import { getRecord } from 'lightning/uiRecordApi'; // uiRecordAPI : Step 1:  import module and function 
/* https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_lightning_ui_api_record */

export default class PartnerContactLocation extends LightningElement {

 
    @api partnerAccountRecordId; // will receive account id from parent (partnerDetail)

    leafletMap; 

    lat;
    long;
    result;


    // uiRecordAPI : Step 2:  make a call to DB 
    @wire(getRecord, {
        recordId: '$partnerAccountRecordId',
        fields: ['Account.Partner_Geo_Location__Latitude__s', 'Account.Partner_Geo_Location__Longitude__s']
    })
    processOutput({data,error})
    {
        if(data)
        {
            this.result = data;

            // read the field values returned from DB
            this.lat = this.result.fields.Partner_Geo_Location__Latitude__s.value;
            this.long = this.result.fields.Partner_Geo_Location__Longitude__s.value;

            console.log('this.lat::' + this.lat);
            console.log('this.long::' + this.long);
            
        }
        else if(error)
        {
            console.log('Error::' + JSON.stringify(error));
        }

    };

    connectedCallback()
    {
        // JS Promise  to load style and JS async

        Promise.all(

            [loadStyle(this, LEAFLET + '/leaflet.css'),loadScript(this, LEAFLET + '/leaflet.js')]
        ).then(
            () => { this.plotMap(); }
        );

    }

    plotMap()
    {

        // create map and plot location

        // 1. find the div in which map to be loaded
        const map = this.template.querySelector('.map');

        // 2. check if div exists then load the map
        if(map)
        {
            this.leafletMap = L.map(map, {zoomControl:true}).setView([51.505, -0.09], 13);


            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(this.leafletMap);
        }


        const location = [this.lat, this.long];

        // 3. create marker
        const leafletMarker =  L.marker(location).addTo(this.leafletMap);
        this.leafletMap.setView(location);

    }
    

}