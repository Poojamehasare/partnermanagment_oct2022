import { LightningElement, wire, track } from 'lwc';
import getStatements from '@salesforce/apex/RollupMethods.getStatements';

export default class MyComponent extends LightningElement {
    @track statements;
    @track showPaymentSection = false;

    // Fetch statements using wire service
    @wire(getStatements)
    wiredStatements({ error, data }) {
        if (data) {
            this.statements = data;
        } else if (error) {
            // Handle error
            console.error('Error fetching statements:', error);
        }
    }

    // Method to handle payment button click
    handlePaymentClick() {
        this.showPaymentSection = true;
    }
}
