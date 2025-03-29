import { createContext } from "react";

export const MentorContext=createContext()

const MentorContextProvider=(props)=>{

    const value={

    }
    return(
        <MentorContext.Provider value={value}>
            {props.children}
        </MentorContext.Provider>
    )
}

export default MentorContextProvider