import React, { createContext,useState } from "react";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
    const [sidebar, setSidebar] = useState(true)

    const showSidebar = () => {
        setSidebar(!sidebar)
     }

    return (<SidebarContext.Provider value={{ sidebar, showSidebar }}>
        {children}
    </SidebarContext.Provider>)
}

export default SidebarContext