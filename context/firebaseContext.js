import { createContext, useState } from "react";

import { FirebaseClass } from "../helper/firebaseHelper";

const FirebaseContext = createContext();

export function FirebaseProvider({children}) {
    let fb = new FirebaseClass(null);
    
    return (
        <FirebaseContext.Provider value={{fb}}>{children}</FirebaseContext.Provider>
    );
}

export default FirebaseContext;