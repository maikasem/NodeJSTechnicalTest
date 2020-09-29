class Invoice {

    constructor(invoiceDate = new Date(), invoiceNumber = "", lineItems = []) {
        this.invoiceDate = invoiceDate;
        this.invoiceNumber = invoiceNumber;
        this.lineItems = lineItems;
    }

    // Adds a line to invoice
    addInvoiceLine(line) {
        if (line) {
            this.lineItems.push(line);
        } else {
            console.log("Warning: null invoiceLine detected. The item won't be added to the invoice");
        }
    };

    // Removes a line
    removeInvoiceLine(invoiceLineIndex) {
        let items = this.lineItems;
        if (invoiceLineIndex >= 0 && invoiceLineIndex < items.length) {
            items.splice(invoiceLineIndex, 1);
        } else {
            console.log(`ERROR: out of bound index passed to the RemoveInvoiceLine method. List Size:${items.length} passed index:${invoiceLineIndex}`);
        }
    };

    getTotal() {
        let total = 0;
        let items = this.lineItems;
        if (items) {
            for (let i = 0; i < items.length; i++) {
                let invoiceLine = items[i];//added to avoid array lookup in every usage
                total += parseInt(invoiceLine.cost*100) * invoiceLine.quantity;
            }
        }
        if (total > 0) {
            total = (total / 100);
        }
        return total;
    };

    mergeInvoices(invoice2) {
        let mergedLineItems = [];
        if (this.lineItems && invoice2 && invoice2.lineItems) {
            mergedLineItems = [...this.lineItems, ...invoice2.lineItems];
            this.lineItems = mergedLineItems;
        }
    }

    clone() {
        let _ = require('lodash');
        return _.cloneDeep(this);
    };
}

module.exports = Invoice;
