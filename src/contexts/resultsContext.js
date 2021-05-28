import React, {useState,createContext} from "react";
const ResultsContext = createContext();

export default function ResultsProvider({children}){
    const [results,setResults] = useState([]);
    return(
        <ResultsContext.Provider value={{results,setResults}}>
            {children}
        </ResultsContext.Provider>
    );
}
export {ResultsContext};