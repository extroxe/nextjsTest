import {createContext, useContext} from 'react';
import PostStore from "./PostStore"

const StoresContext = createContext(new PostStore());
// console.log("StoresContext", StoresContext)
const useStores = () => useContext(StoresContext);
export default useStores
