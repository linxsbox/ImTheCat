let storageDB = null // IDBOpen Request Object
let osdb = null // IDB Database Object
let tabledb = null // IDBObjectStore Object form onupgradeneeded

if (!storageDB || !window.indexedDB) {
  // Open the indexedDB, if indexedDB is non existent, will created it else open it.
  storageDB = window.indexedDB.open('catdb', '1') // IDBOpen Request
  // console.log(storageDB) 
  
  // https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
  // onblocked、onupgradeneeded、onversionchange 在 IndexedDB_API 中已经被标红，访问它的地址已经被移除，未来或许被抛弃？
  // 虽然在chrome中还是可以使用，但是在 MDN 上已经增加了 complete、close等方法，兼容性却不好。

  storageDB.onblocked = e => { // The last indexeDB is unclose or unfinish transaction.
    console.log('onblocked: ', storageDB.readyState, e)
  }
  storageDB.onerror = e => { // Open error
    console.log('onerror: ', storageDB.readyState, e)
  }
  storageDB.onsuccess = e => { // Open success
    console.log('onsuccess: ', storageDB.readyState, e)
    initTableDB(e.target)
  }
  storageDB.onupgradeneeded = e => { // Upgraden
    // 唯一可修改数据库结构和属性的函数作用域
    console.log('onupgradeneeded: ', storageDB.readyState, e)
    initTableDB(e.target)
  }

  let initTableDB = (storageDB) => {
    osdb = storageDB.result
    // Create object store and give it a name.
    if (!osdb.objectStoreNames.contains('siWebStore')) {
      // IDBObjectStore
      // https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore#Properties

      /**
       * Create database table
       * @param tableName  // 数据表表名
       * @param Object // 配置对象
       * @param Object.keyPath // 主键
       * @param Object.autoIncrement // 是否自增
       */
      tabledb = osdb.createObjectStore('siWebStore', {keyPath: 'id', autoIncrement: true}) 
      // console.log(tabledb)

      /**
       * Create database table index
       * @param indexName  // 索引名
       * @param indexField // 索引字段名
       * @param Object // 配置对象
       * @param Object.unique // 可否包含重复值
       */
      tabledb.createIndex('name', 'name', { unique: false })
    }
  }
  // if (storageDB.error) {}
  // error
  // source
  // transaction
}

let init = function () {
  return osdb
}

export default {
  init: new init()
}