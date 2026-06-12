import Parse from 'parse';

Parse.initialize(
  import.meta.env.VITE_PARSE_APP_ID as string,
  import.meta.env.VITE_PARSE_JS_KEY as string
);
Parse.serverURL = 'https://parseapi.back4app.com/';

export { Parse };
