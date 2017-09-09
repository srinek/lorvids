import {Business} from '../model/business.model';

export const searchResults :  Business[] = [
    {
        id: 1, name : "Smile Dental", 
        address : "110 Durham Road, Piscataway", 
        imageurl : "../../assets/trendy_looks.jpg", 
        rating : [0 , 0 , 0 ,0 ],
        staff : [
            {
                name : 'Dr. Navin',
                availableSlots : [
                    {
                        date : new Date("09/10/2017"),
                        slots : [
                            "10:00 AM",
                            "10:30 AM",
                            "11:00 AM",
                            "11:30 AM",
                            "12:00 AM",
                            "12:30 AM",
                            "01:00 AM",
                            "01:30 AM",
                        ]
                    },
                    {
                        date : new Date("09/11/2017"),
                        slots : [
                            "10:00 AM",
                            "10:30 AM",
                            "11:00 AM",
                            "11:30 AM",
                            "12:00 AM",
                            "12:30 AM",
                            "01:00 AM",
                            "01:30 AM",
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
                            "10:00 AM",
                            "10:30 AM",
                            "11:00 AM",
                            "11:30 AM",
                            "12:00 AM",
                            "12:30 AM",
                            "01:00 AM",
                            "01:30 AM",
                        ]
                    },
                    {
                        date : new Date("09/11/2017"),
                        slots : [
                            "10:00 AM",
                            "10:30 AM",
                            "11:00 AM",
                            "11:30 AM",
                            "12:00 AM",
                            "12:30 AM",
                            "01:00 AM",
                            "01:30 AM",
                        ]
                    }
                ]
            }
        ]
    },
    {id: 2, name : "Bubbles Pediatrician", address : "1145 fifth avenue, Edison", imageurl : "../../assets/home_cleaning.jpg", rating : [0 , 0 , 0 ,0 ]},
    {id: 3, name : "Trendy Looks (Salon)", address : "1145 fifth avenue, Edison", imageurl : "../../assets/trendy_looks.jpg", rating : [0 , 0 , 0 ,0 ]},
    {id: 4, name : "A1 Cleaners", address : "1145 fifth avenue, Edison", imageurl : "../../assets/home_cleaning.jpg", rating : [0 , 0 , 0 ,0 ]}
];

export const recentlyVisitedBusiness : Business[] = [
    {id: 1, name : "Smile Dental", address : "110 Durham Road, Piscataway", imageurl : "", rating : [0 , 0 , 0 ,0 ]},
    {id: 2, name : "Bubbles Pediatrician", address : "1145 fifth avenue, Edison", imageurl : "", rating : [0 , 0 , 0 ,0 ]},
    {id: 3, name : "Trendy Looks (Salon)", address : "1145 fifth avenue, Edison", imageurl : "", rating : [0 , 0 , 0 ,0 ]},
    {id: 4, name : "A1 Cleaners", address : "1145 fifth avenue, Edison", imageurl : "", rating : [0 , 0 , 0 ,0 ]}
];

export const trendingBusiness : Business[] = [
    {id: 1, name : "Smile Dental", address : "110 Durham Road, Piscataway", imageurl : "", rating : [0 , 0 , 0 ,0 ]},
    {id: 2, name : "Bubbles Pediatrician", address : "1145 fifth avenue, Edison", imageurl : "", rating : [0 , 0 , 0 ,0 ]},
    {id: 3, name : "Trendy Looks (Salon)", address : "1145 fifth avenue, Edison", imageurl : "", rating : [0 , 0 , 0 ,0 ]},
    {id: 4, name : "A1 Cleaners", address : "1145 fifth avenue, Edison", imageurl : "", rating : [0 , 0 , 0 ,0 ]}
];