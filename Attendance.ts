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

const statuses = ["Present" , "Absent" , "Holiday" , "Important", "Unmarked"]

const Attendance = {

    // For handling each day
    getDate: async (date: string) => {
        let status = await AsyncStorage.getItem(date)
        if(status == null) status = "Unmarked"
        return status;
    },
    setDate: async(date: string, status: string) => {
        if(!statuses.includes(status)) return console.error("AN INVALID STATE WAS GIVEN", status)

        if(status == "Unmarked")
            await AsyncStorage.removeItem(date)
        else
            await AsyncStorage.setItem(date, status)

        return true;
    },

    // For getting a whole weekk
    /*
        Firstly, let's discuss this maybe since uhh i can't think all that in my head bruh

        So how this is gonna work is that you give it a initial date, and from it it obtains the dates for the whole week 
        HHEY WAIT A MINUTE, What if the given date isn't the starting date of the week as it would be most likely
        But I still do need it from monday to sunday, so I do need to keep track of actual date system it seems ughh
        so considering that, what if I find out which week does the date belong to then take out every date in that week.
    */
    getWeek: async(date: string) => {

        // Soo First of all lets get our monday/first day of the week
        const input = new Date(date); 
        const day = input.getDay() // 0 (Sun) - 6 (Sat)
        const diff = (day + 6) % 7; // Convert Sunday=0 to last day cz yk yk i like to start my week on monday 💔💔
        const monday = new Date(input); // clone input
        monday.setDate(input.getDate() - diff); // adjust to Monday

        // Now lets get dates for the whole week
        const week = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);
            week.push(d.toISOString().slice(0, 10)); // "YYYY-MM-DD"
        }

        const data = await AsyncStorage.multiGet(week)
        // if(status == null) status = "Unmarked"
        // do this piece of code manually when looping
        return data;

    }
}

export default Attendance;