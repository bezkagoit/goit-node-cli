import { program } from 'commander';
import contacts from './contacts.js';

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      break;

    case 'get':
      const oneContact = await contacts.getContactById(id);
      console.log(oneContact);
      break;

    case 'add':
      const createdContact = await contacts.addContact(name, email, phone);
      console.log(createdContact);
      break;

    case 'remove':
      const deletedContact = await contacts.removeContact(id);
      console.log(deletedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(options);
