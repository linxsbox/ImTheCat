// This will allow you to load `.vue` files from disk.
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

// This will allow you to load `.json` files from disk.
declare module '*.json'
{ const value: any;
  export default value;
}

// This will allow you to load JSON from remote URL responses.
declare module 'json!*' {
  const value: any;
  export default value;
}

// This will allow you to load TEXT from remote URL responses.
declare module '*!text' {
  const content: string;
  export default content;
}
