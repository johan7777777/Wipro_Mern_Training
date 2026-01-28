
interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
}

// Step 2: Implement the ContactManager Class
class ContactManager {
    private contacts: Contact[] = [];

    // Add a new contact
    addContact(contact: Contact): void {
        this.contacts.push(contact);
        console.log(`✅ Contact "${contact.name}" added successfully!`);
    }

    // View all contacts
    viewContacts(): Contact[] {
        if (this.contacts.length === 0) {
            console.log("No contacts available.");
        }
        return this.contacts;
    }

    // Modify an existing contact
    modifyContact(id: number, updatedContact: Partial<Contact>): void {
        const contact = this.contacts.find(c => c.id === id);
        if (!contact) {
            console.log(` Error: Contact with ID ${id} does not exist.`);
            return;
        }
        Object.assign(contact, updatedContact);
        console.log(`✅ Contact with ID ${id} modified successfully!`);
    }

    // Delete a contact
    deleteContact(id: number): void {
        const index = this.contacts.findIndex(c => c.id === id);
        if (index === -1) {
            console.log(` Error: Contact with ID ${id} does not exist.`);
            return;
        }
        const removedContact = this.contacts.splice(index, 1)[0];
        console.log(`✅ Contact "${removedContact.name}" deleted successfully!`);
    }
}

// =======================
// Step 3: Testing the ContactManager
// =======================

const manager = new ContactManager();

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
