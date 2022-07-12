import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// accept content and add it to the database
export const putDb = async (content) => {
  const jateDB = await openDB("jate", 1);
  const text = jateDB.transaction("jate", "readwrite");
  const store = text.objectStore("jate");
  const request = store.put({ jate: content });
  const result = await request;
  console.log("Saved data to the jate database", result);
};

// get all content from the database
export const getDb = async () => {
  const jateDB = await openDB("jate", 1);
  const text = jateDB.transaction("jate", "readonly");
  const storage = text.objectStore("jate");
  const request = storage.getAll();
  const result = await request;
  console.log(result);
};

initdb();
