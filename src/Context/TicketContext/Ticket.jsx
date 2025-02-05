import { createContext } from "react";

export const TicketContext = createContext();

export const TicketContextProvier = ({children}) => {

       return (
              <TicketContext.Provider value={''}>
                     {children}
              </TicketContext.Provider>
       )
}
