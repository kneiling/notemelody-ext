import { createRxDatabase, addRxPlugin, removeRxDatabase, type RxDatabase } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';

import { melodyRxSchema } from './melody/schema';
import melodyCollection from "~data/melody/collection"


const init = async (): Promise<RxDatabase> => {
  addRxPlugin(RxDBDevModePlugin)
  addRxPlugin(RxDBQueryBuilderPlugin);

  const db: RxDatabase = await createRxDatabase({
    name: 'melody-db',
    storage: getRxStorageDexie()
  })
  window['db'] = db // write to window for debugging

  await db.addCollections({melodies: melodyCollection})

  return db
}

export default init