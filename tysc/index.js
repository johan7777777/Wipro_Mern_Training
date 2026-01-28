// Step 2: Implement the ContactManager Class
var ContactManager = /** @class */ (function () {
    function ContactManager() {
        this.contacts = [];
    }
    // Add a new contact
    ContactManager.prototype.addContact = function (contact) {
        this.contacts.push(contact);
        console.log("\u2705 Contact \"".concat(contact.name, "\" added successfully!"));
    };
    // View all contacts
    ContactManager.prototype.viewContacts = function () {
        if (this.contacts.length === 0) {
            console.log("No contacts available.");
        }
        return this.contacts;
    };
    // Modify an existing contact
    ContactManager.prototype.modifyContact = function (id, updatedContact) {
        var contact = this.contacts.find(function (c) { return c.id === id; });
        if (!contact) {
            console.log(" Error: Contact with ID ".concat(id, " does not exist."));
            return;
        }
        Object.assign(contact, updatedContact);
        console.log("\u2705 Contact with ID ".concat(id, " modified successfully!"));
    };
    // Delete a contact
    ContactManager.prototype.deleteContact = function (id) {
        var index = this.contacts.findIndex(function (c) { return c.id === id; });
        if (index === -1) {
            console.log(" Error: Contact with ID ".concat(id, " does not exist."));
            return;
        }
        var removedContact = this.contacts.splice(index, 1)[0];
        console.log("\u2705 Contact \"".concat(removedContact.name, "\" deleted successfully!"));
    };
    return ContactManager;
}());
// =======================
// Step 3: Testing the ContactManager
// =======================
var manager = new ContactManager();
// Add contacts
manager.addContact({ id: 1, name: "John Doe", email: "john@example.com", phone: "1234567890" });
manager.addContact({ id: 2, name: "Jane Smith", email: "jane@example.com", phone: "9876543210" });
// View contacts
console.log("All Contacts:", manager.viewContacts());
// Modify a contact
manager.modifyContact(1, { phone: "1112223333" });
// Attempt to modify a non-existing contact
manager.modifyContact(3, { name: "Not Found" });
// View contacts after modification
console.log("Updated Contacts:", manager.viewContacts());
// Delete a contact
manager.deleteContact(2);
// Attempt to delete a non-existing contact
manager.deleteContact(5);
// View contacts after deletion
console.log("Final Contacts:", manager.viewContacts());
