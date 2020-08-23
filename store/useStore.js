import {createContext, useContext} from 'react';
import PostStore from "./PostStore"

const StoresContext = createContext(PostStore);
const useStores = () => useContext(StoresContext);
console.log(PostStore)
export default useStores