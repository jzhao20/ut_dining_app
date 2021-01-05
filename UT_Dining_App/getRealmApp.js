import Realm from "realm";
import React from "react";
const databaseContext = React.createContext({
  app:null,
  collection:null,
})
let app;

// Returns the shared instance of the Realm app.
export function getRealmApp() {
  const [app, setApp] = React.useState(null);
  const [collection, setCollection] = React.useState(null);
  if (app === undefined) {
    const appId = "react_native_ut_dining_hall_app-numvp"; // Set Realm app ID here.
    const appConfig = {
      id: appId,
      timeout: 10000,
      app: {
        name: "default",
        version: "0",
      },
    };
    setApp(new Realm.App(appConfig));
    user = await app.logIn(Realm.Credentials.anonymous());
    const mongoClient = user.mongoClient("ut_dining_app");
    setCollection(mongoClient
      .db("ut-dining-hall-app")
      .collection("user_profiles"));
  }
  return databaseContext;
}
