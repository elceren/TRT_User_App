"use client"

import React, {createContext, ReactNode, useState} from "react";

export type Form = { name: string, surname: string, email: string, phoneNumber: string }
type ContextProps = {
    data: Form
    setData: React.Dispatch<React.SetStateAction<Form>>
}
type ProviderProps = {
    children: ReactNode
}

const DataContext = createContext<Partial<ContextProps>>({})

const DataProvider = ({ children }: ProviderProps) => {
    const [data,setData] = useState<Form>()

    return <DataContext.Provider value={{data,setData}}>{children}</DataContext.Provider>
}

export {DataContext, DataProvider}