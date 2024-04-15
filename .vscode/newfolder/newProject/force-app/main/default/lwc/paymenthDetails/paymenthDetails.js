import { LightningElement, api, wire, track } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { createRecord } from 'lightning/uiRecordApi';
//import createPayment from '@salesforce/apex/PaymentController.createPayment';
const PAYMENT_OBJECT_API_NAME = 'Payments__c';

const fields = [
    'Statement__c.Name',
    'Statement__c.Balance__c',
    'Statement__c.Rental_Agreement__r.Renter__r.Name',
    'Statement__c.Rental_Agreement__r.Renter__r.MailingStreet',
    'Statement__c.Rental_Agreement__r.Renter__r.MailingCity',
    'Statement__c.Rental_Agreement__r.Renter__r.MailingState',
    'Statement__c.Rental_Agreement__r.Renter__r.MailingPostalCode'
];

export default class PaymentComponent extends LightningElement {
    @api recordId;
    @track StatementBalance;
    @track ContactName;
    @track ContactStreet;
    @track ContactCity;
    @track ContactState;
    @track ContactPostalCode;
    @track selectedPayment;
    @track showCreditCardFields = false;
    @track showCheckFields = false;
    @track showCashFields = false;

    @wire(getRecord, { recordId: '$recordId', fields: fields })
    wiredRecord({ error, data }) {
        if (data) {
            this.StatementBalance = getFieldValue(data, 'Statement__c.Balance__c');
            this.ContactName = getFieldValue(data, 'Statement__c.Rental_Agreement__r.Renter__r.Name');
            this.ContactStreet = getFieldValue(data, 'Statement__c.Rental_Agreement__r.Renter__r.MailingStreet');
            this.ContactCity = getFieldValue(data, 'Statement__c.Rental_Agreement__r.Renter__r.MailingCity');
            this.ContactState = getFieldValue(data, 'Statement__c.Rental_Agreement__r.Renter__r.MailingState');
            this.ContactPostalCode = getFieldValue(data, 'Statement__c.Rental_Agreement__r.Renter__r.MailingPostalCode');
        } else if (error) {
            console.error('Error fetching record data:', error);
        }
    }

    handlePaymentMethodChange(event) {
        this.selectedPayment = event.detail.value;
        this.showCreditCardFields = this.selectedPayment === 'Credit Card';
        this.showCheckFields = this.selectedPayment === 'Check';
        this.showCashFields = this.selectedPayment === 'Cash';
    }
    get paymentOptions() {
        return [
            { label: 'Cash', value: 'Cash' },
            { label: 'Credit Card', value: 'Credit Card' },
            { label: 'Check', value: 'Check' }
        ];
    }
    handleSubmit(event){
       // event.preventDefault();
        const fields = event.detail.fields;
        const paymentRecordInput ={apiName: PAYMENT_OBJECT_API_NAME, fields};
        createRecord(paymentRecordInput)
        .then(payment =>{
            this.template.querySelector('lightning-record-edit-form').submit(this.fields);
            
            console.log('payment created',payment);

        }).catch(error=>{
            console.error('error found while payment',error);
        })
    }
}