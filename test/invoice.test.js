const Invoice = require('../invoice.js');
const InvoiceLine = require('../invoiceLine.js');

var assert = require('assert');

describe('Test invoice', function () {
    it('addInvoiceLine', function () {
        var invoice = new Invoice();
        var appleInvoiceLine = new InvoiceLine(1, 6.99, 1, "Apple");
        var orangeInvoiceLine = new InvoiceLine(1, 7.01, 1, "Orange");
        invoice.addInvoiceLine(appleInvoiceLine);
        invoice.addInvoiceLine(orangeInvoiceLine);
        invoice.addInvoiceLine(null);
        assert.ok(invoice.lineItems.length == 2);
    });

    it('removeInvoiceLine', function () {
        var invoice = new Invoice();
        var appleInvoiceLine = new InvoiceLine(1, 6.99, 1, "Apple");
        var orangeInvoiceLine = new InvoiceLine(1, 7.01, 1, "Orange");
        invoice.addInvoiceLine(appleInvoiceLine);
        invoice.addInvoiceLine(orangeInvoiceLine);

        invoice.removeInvoiceLine(1);
        invoice.removeInvoiceLine(10);
        assert.ok(invoice.lineItems.length == 1);
        assert.equal(appleInvoiceLine.cost, invoice.lineItems[0].cost);
    });

    it('getTotal', function () {
        var invoice = new Invoice();
        invoice.addInvoiceLine(new InvoiceLine(1, 10.21, 4, "Banana"));
        invoice.addInvoiceLine(new InvoiceLine(2, 5.21, 1, "Orange"));
        invoice.addInvoiceLine(new InvoiceLine(3, 5.21, 5, "Pineapple"));
        assert.equal(72.10, invoice.getTotal());
    });

    it('mergeInvoice', function () {
        var invoice1 = new Invoice();
        invoice1.addInvoiceLine(new InvoiceLine(1, 10.21, 4, "Banana"));

        var invoice2 = new Invoice();
        invoice2.addInvoiceLine(new InvoiceLine(2, 5.21, 1, "Orange"));
        invoice2.addInvoiceLine(new InvoiceLine(3, 5.21, 5, "Pineapple"));

        invoice1.mergeInvoices(invoice2);
        assert.equal(72.10, invoice1.getTotal());
    });

    it('clone', function () {
        var invoice = new Invoice();
        invoice.addInvoiceLine(new InvoiceLine(1, 10.21, 4, "Banana"));
        invoice.addInvoiceLine(new InvoiceLine(2, 5.21, 1, "Orange"));
        invoice.addInvoiceLine(new InvoiceLine(3, 5.21, 5, "Pineapple"));

        const clonedInvoice = invoice.clone();
        assert.equal(72.10, clonedInvoice.getTotal());
    });
});
