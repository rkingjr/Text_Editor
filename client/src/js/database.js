import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  console.log("PUT request to update jateDB.");
  const jateDB=await openDB("jate",1);
  const tx=jateDB.transaction("jate","readwrite");
  const objStore=tx.objectStore("jate");
  const req=objStore.put({content:content})
  const res=await req;
  console.log("Data saved to jateDB.",res);
};

export const getDb = async (value) => {
  console.log("Getting data from jateDB.");
  const jateDB=await openDB("jate",1);
  const tx=jateDB.transaction("jate","readwrite");
  const objStore=tx.objectStore("jate");
  const req=objStore.getAll()
  const res=await req;
  console.log("Data saved to jateDB",res);
};

initdb();
