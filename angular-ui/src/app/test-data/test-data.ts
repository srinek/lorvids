import {Business} from '../model/business.model';

export const staff = [
    {
        name : 'Dr. Navin',
        availableSlots : [
            {
                date : new Date("09/10/2017"),
                slots : [
                    {bookingId:'b1s1s1', slotTime : "10:00 AM"},
                    {bookingId:'b1s1s2', slotTime : "10:30 AM"},
                    {bookingId:'b1s1s3', slotTime : "11:00 AM"},
                    {bookingId:'b1s1s4', slotTime : "11:30 AM"},
                    {bookingId:'b1s1s5', slotTime : "12:00 AM"},
                    {bookingId:'b1s1s6', slotTime : "12:30 AM"},
                    {bookingId:'b1s1s7', slotTime : "01:00 AM"},
                    {bookingId:'b1s1s8', slotTime : "01:30 AM"}
                ]
            },
            {
                date : new Date("09/11/2017"),
                slots : [
                    {bookingId:'b1s2s1', slotTime : "10:00 AM"},
                    {bookingId:'b1s2s1', slotTime : "10:30 AM"},
                    {bookingId:'b1s2s1', slotTime : "11:00 AM"},
                    {bookingId:'b1s2s1', slotTime : "11:30 AM"},
                    {bookingId:'b1s2s1', slotTime : "12:00 AM"},
                    {bookingId:'b1s2s1', slotTime : "12:30 AM"},
                    {bookingId:'b1s2s1', slotTime : "01:00 AM"},
                    {bookingId:'b1s2s1', slotTime : "01:30 AM"},
                ]
            }
        ]
    },
    {
        name : 'Dr.Pompi',
        availableSlots : [
            {
                date : new Date("09/10/2017"),
                slots : [
                    {bookingId:'b1s2s1', slotTime : "10:00 AM"},
                    {bookingId:'b1s2s2', slotTime : "10:30 AM"},
                    {bookingId:'b1s2s3', slotTime : "11:00 AM"},
                    {bookingId:'b1s2s4', slotTime : "11:30 AM"},
                    {bookingId:'b1s2s5', slotTime : "12:00 AM"},
                    {bookingId:'b1s2s6', slotTime : "12:30 AM"},
                    {bookingId:'b1s2s7', slotTime : "01:00 AM"},
                    {bookingId:'b1s2s8', slotTime : "01:30 AM"},
                ]
            },
            {
                date : new Date("09/11/2017"),
                slots : [
                    {bookingId:'b1s2s9', slotTime : "10:00 AM"},
                    {bookingId:'b1s2s10', slotTime : "10:30 AM"},
                    {bookingId:'b1s2s11', slotTime : "11:00 AM"},
                    {bookingId:'b1s2s12', slotTime : "11:30 AM"},
                    {bookingId:'b1s2s13', slotTime : "12:00 AM"},
                    {bookingId:'b1s2s14', slotTime : "12:30 AM"},
                    {bookingId:'b1s2s15', slotTime : "01:00 AM"},
                    {bookingId:'b1s2s16', slotTime : "01:30 AM"},
                ]
            }
        ]
    }
];

export const searchResults :  Business[] = []; /* [
    {
        bus_id: 1, bus_name : "Smile Dental", 
        address : "110 Durham Road, Piscataway", 
        imageurl : "../../assets/trendy_looks.jpg", 
        rating : [0 , 0 , 0 ,0 ],
        staff : [
            {
                staff_name : 'Dr. Navin'/*,
                 availableSlots : [
                    {
                        date : new Date("09/10/2017"),
                        slots : [
                            {bookingId:'b1s1s1', slotTime : "10:00 AM"},
                            {bookingId:'b1s1s2', slotTime : "10:30 AM"},
                            {bookingId:'b1s1s3', slotTime : "11:00 AM"},
                            {bookingId:'b1s1s4', slotTime : "11:30 AM"},
                            {bookingId:'b1s1s5', slotTime : "12:00 AM"},
                            {bookingId:'b1s1s6', slotTime : "12:30 AM"},
                            {bookingId:'b1s1s7', slotTime : "01:00 AM"},
                            {bookingId:'b1s1s8', slotTime : "01:30 AM"}
                        ]
                    },
                    {
                        date : new Date("09/11/2017"),
                        slots : [
                            {bookingId:'b1s2s1', slotTime : "10:00 AM"},
                            {bookingId:'b1s2s1', slotTime : "10:30 AM"},
                            {bookingId:'b1s2s1', slotTime : "11:00 AM"},
                            {bookingId:'b1s2s1', slotTime : "11:30 AM"},
                            {bookingId:'b1s2s1', slotTime : "12:00 AM"},
                            {bookingId:'b1s2s1', slotTime : "12:30 AM"},
                            {bookingId:'b1s2s1', slotTime : "01:00 AM"},
                            {bookingId:'b1s2s1', slotTime : "01:30 AM"},
                        ]
                    }
                ] 
            },
            {
                name : 'Dr.Pompi' ,
                availableSlots : [
                    {
                        date : new Date("09/10/2017"),
                        slots : [
                            {bookingId:'b1s2s1', slotTime : "10:00 AM"},
                            {bookingId:'b1s2s2', slotTime : "10:30 AM"},
                            {bookingId:'b1s2s3', slotTime : "11:00 AM"},
                            {bookingId:'b1s2s4', slotTime : "11:30 AM"},
                            {bookingId:'b1s2s5', slotTime : "12:00 AM"},
                            {bookingId:'b1s2s6', slotTime : "12:30 AM"},
                            {bookingId:'b1s2s7', slotTime : "01:00 AM"},
                            {bookingId:'b1s2s8', slotTime : "01:30 AM"},
                        ]
                    },
                    {
                        date : new Date("09/11/2017"),
                        slots : [
                            {bookingId:'b1s2s9', slotTime : "10:00 AM"},
                            {bookingId:'b1s2s10', slotTime : "10:30 AM"},
                            {bookingId:'b1s2s11', slotTime : "11:00 AM"},
                            {bookingId:'b1s2s12', slotTime : "11:30 AM"},
                            {bookingId:'b1s2s13', slotTime : "12:00 AM"},
                            {bookingId:'b1s2s14', slotTime : "12:30 AM"},
                            {bookingId:'b1s2s15', slotTime : "01:00 AM"},
                            {bookingId:'b1s2s16', slotTime : "01:30 AM"},
                        ]
                    }
                ] 
            }
        ]
    },
    {id: 2, name : "Bubbles Pediatrician", address : "1145 fifth avenue, Edison", imageurl : "../../assets/home_cleaning.jpg", rating : [0 , 0 , 0 ,0 ]},
    {id: 3, name : "Trendy Looks (Salon)", address : "1145 fifth avenue, Edison", imageurl : "../../assets/trendy_looks.jpg", rating : [0 , 0 , 0 ,0 ]},
    {id: 4, name : "A1 Cleaners", address : "1145 fifth avenue, Edison", imageurl : "../../assets/home_cleaning.jpg", rating : [0 , 0 , 0 ,0 ]}
]; */

export const recentlyVisitedBusiness : Business[] = []; /* = [
    {bus_id: 1, bus_name : "Smile Dental", address : "110 Durham Road, Piscataway", imageurl : "", rating : [0 , 0 , 0 ,0 ]},
    {bus_id: 2, bus_name : "Bubbles Pediatrician", address : "1145 fifth avenue, Edison", imageurl : "", rating : [0 , 0 , 0 ,0 ]},
    {bus_id: 3, bus_name : "Trendy Looks (Salon)", address : "1145 fifth avenue, Edison", imageurl : "", rating : [0 , 0 , 0 ,0 ]},
    {bus_id: 4, bus_name : "A1 Cleaners", address : "1145 fifth avenue, Edison", imageurl : "", rating : [0 , 0 , 0 ,0 ]}
] */;

export const trendingBusiness : Business[] = []; /* = [
    {bus_id: 1, bus_name : "Smile Dental", address : "110 Durham Road, Piscataway", imageurl : "", rating : [0 , 0 , 0 ,0 ]},
    {bus_id: 2, bus_name : "Bubbles Pediatrician", address : "1145 fifth avenue, Edison", imageurl : "", rating : [0 , 0 , 0 ,0 ]},
    {bus_id: 3, bus_name : "Trendy Looks (Salon)", address : "1145 fifth avenue, Edison", imageurl : "", rating : [0 , 0 , 0 ,0 ]},
    {bus_id: 4, bus_name : "A1 Cleaners", address : "1145 fifth avenue, Edison", imageurl : "", rating : [0 , 0 , 0 ,0 ]}
] */;