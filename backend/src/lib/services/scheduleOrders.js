import Agenda from 'agenda';
import getEnv from '#helpers/getEnv.js';
import moveOrder from '#helpers/moveOrder.js';

// Create a new instance of Agenda
const mongoConnectionString = getEnv('MONGODB_URI');
const agenda = new Agenda({ db: { address: mongoConnectionString } });

async function scheduleOrder(access, orderID, orderDate) {
  // Define a job to move order
  agenda.define(orderID, async () => {
    await moveOrder(access, orderID);
  });

  // Start Agenda and schedule the job
  await agenda.start();
  await agenda.schedule(orderDate, orderID);
}

// Cancel a scheduled order
async function cancelOrder(orderID) {
  await agenda.cancel({ name: orderID });
}

export { scheduleOrder, cancelOrder };
