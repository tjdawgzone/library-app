import React, {useState,createContext} from "react";
const LibraryContext = createContext();

export default function LibraryProvider({children}){
    const [myBooks,setMyBooks] = useState([]);
    return(
        <LibraryContext.Provider value={{myBooks,setMyBooks}}>
            {children}
        </LibraryContext.Provider>
    );
}
export {LibraryContext};