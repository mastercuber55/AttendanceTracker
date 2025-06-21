import AsyncStorage from '@react-native-async-storage/async-storage';

// For now which I do consider to be permanent thinking it shouold be fast enough
// The data structure wiill be as following
/*
    {
        ...
        "2025-06-21": "present",
        ...
    }
*/
// Its really simple and flexible so I consider it the best option for now
// unless.. we come accross visible speed issues.

const statuses = ["present" , "absent" , "holiday" , "important"]

const Attendance = {
    getDate: async (date: string) => {
        const status = await AsyncStorage.getItem(date)
        return status;
    },
    setDate: async(date: string, status: string) => {
        if(!statuses.includes(status)) throw Error("AAAAAAAA A STATUS THAT ISN'T VALID WAS GIVEN WHAT ARE YOU DOING CUBE!!!!!!!")
        await AsyncStorage.setItem(date, status)
        return true;
    }
}

export default Attendance;