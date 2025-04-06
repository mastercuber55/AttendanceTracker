import { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

const AuthContext = createContext()
const URL = "https://attendancetrackerapi.netlify.app/.netlify/functions/"

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadToken = async() => {
            const storedToken = await AsyncStorage.getItem("authToken")
            setToken(storedToken)
            setLoading(false)
            
        }
        loadToken()
    }, [])

    const login = async({ username, password }) => {
        
        const res = await fetch(URL + "login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          });
          
          let data = null
          let error = null

          if (res.ok) {
            data = await res.json()
            await AsyncStorage.setItem("authToken", data.token) 
            return [data, error];
          } else { 
            error = await res.text()
            return [data, error];
          }
    }

    const signup = async({ username, password }) => {
        
        const res = await fetch(URL + signup, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          });
          
          let data = null
          let error = null

          if (res.ok) {
            data = await res.json()
            await AsyncStorage.setItem("authToken", data.token) 
            return [data, error];
          } else { 
            error = await res.text()
            return [data, error];
          }
    }

    const logout = async() => {
        await AsyncStorage.removeItem("authToken")
    }

    return (
        <AuthContext.Provider value={{ token, loading, login, signup, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)