exports.getBedroomTypes = async (req, res, next) => {
    try {
        const { hotelId } = req.query;
        const hotels = {
            MAAR: [
                {type:"DOUBLE BED WITHOUT KITCHEN",rate:"1700",tax:"204",total:"1904",rooms:[101,102,103,104,105,201,202,203,204,301,302,303,304,305,306,307,308,309]},
                {type:"DOUBLE BED WITH KITCHEN",rate:"2000",tax:"240",total:"2240",rooms:[401,402,403,404,405,406]},
                {type:"TRIBLE BED KICHEN(SUITE ROOM)",rate:"3200",tax:"384",total:"3584", rooms:[111]}
            ],
            MAAG: [
                {type:"PREMIUM DOUBLE BED WITHOUT KITCHEN",rate:"2500",tax:"300",total:"2800", rooms:[601]},
                {type:"PREMIUM DOUBLE BED WITH KITCHEN",rate:"2800",tax:"336",total:"3136", rooms:[602, 603, 604]},
                {type:"PREMIUM FOUR BED WITHOUT KICHEN",rate:"3800",tax:"456",total:"4256", rooms:[701, 702, 703]},
                {type:"PREMIUM FOUR BED WITH KICHEN",rate:"4200",tax:"504",total:"4704", rooms:[704, 705]},
                {type:"PREMIUM TRIBLE BED WITHOUT KITCHEN",rate:"3200",tax:"384",total:"3584", rooms:[901, 902, 903]},
                {type:"PREMIUM TRIBLE BED WITH KITCHEN",rate:"3500",tax:"420",total:"3920", rooms:[904]},
                {type:"PREMIUM DOUBLE BED WITH KITCHEN",rate:"2800",tax:"336",total:"3136", rooms:[906, 907, 908, 909]},
                {type:"PREMIUM SUITE ROOM",rate:"3800",tax:"456",total:"4256", rooms:[222, 333]}
            ],
            MAASA: [
                {type:"TRIBLE BED ROOM - Type1",rate:"3000",tax:"360",total:"3360", rooms:[101, 102]},
                {type:"TRIBLE BED ROOM - Type2",rate:"2500",tax:"300",total:"2800", rooms:[104]},
                {type:"TRIBLE BED ROOM - Type3",rate:"2800",tax:"336",total:"3136", rooms:[201, 202]},
                {type:"TRIBLE BED WITH BALCONY",rate:"2500",tax:"300",total:"2800", rooms:[204]}
            ]
        };

        const bedroomTypes = hotels[hotelId] || [];
        res.json({ success: true, bedroomTypes });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
