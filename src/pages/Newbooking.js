import React, { useEffect, useState } from "react";
import '../assets/css/app.min.css';
import '../assets/css/icons.min.css';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import InputMask from 'react-input-mask';
import { Col, Row } from 'antd';
import axios from "axios";
import moment from 'moment';
import feather from 'feather-icons';
import { useAuth } from '../context/AuthContext';
import { DatePicker } from "antd";
import dayjs from "dayjs";



export default function Newbooking({selectedHotel}){
    const { loggedInUser } = useAuth();
    const [randomNumber, setRandomNumber] = useState('');
    const [baseRoomRent, setBaseRoomRent] = useState(0);
    const [roomrent, setRoomrent] = useState(0);
    const [actroomrent, setActRoomrent] = useState(0);
    const [bedroomTypes, setBedroomTypes] = useState([]);
    const [selectedBedroom, setSelectedBedroom] = useState('AC');
    const [selectedBedtype, setSelectedBedtype] = useState('');
    const [extraValue, setExtraValue] = useState(0);
    const [discvalue, setDiscvalue] = useState(0);
    const [gstcost, setGstcost] = useState('0.00');
    const [extrapersoncost, setExtrapersoncost] = useState(0);
    const [extrapersondays, setExtrapersondays] = useState(1);
    const [extrapersonrate, setExtrapersonrate] = useState(0);
    const [bookingadvance, setBookingadvance] = useState(0);

    const [isGstChecked, setIsGstChecked] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState(''); 
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const bookingId = queryParams.get("bookingId");
    const [isEditMode, setIsEditMode] = useState(!!bookingId);
    console.log(bookingId);
    const countryCodes = [
        {"country":"Afghanistan","code":"93","iso":"AF"},
        {"country":"Albania","code":"355","iso":"AL"},
        {"country":"Algeria","code":"213","iso":"DZ"},
        {"country":"American Samoa","code":"1-684","iso":"AS"},
        {"country":"Andorra","code":"376","iso":"AD"},
        {"country":"Angola","code":"244","iso":"AO"},
        {"country":"Anguilla","code":"1-264","iso":"AI"},
        {"country":"Antarctica","code":"672","iso":"AQ"},
        {"country":"Antigua and Barbuda","code":"1-268","iso":"AG"},
        {"country":"Argentina","code":"54","iso":"AR"},
        {"country":"Armenia","code":"374","iso":"AM"},
        {"country":"Aruba","code":"297","iso":"AW"},
        {"country":"Australia","code":"61","iso":"AU"},
        {"country":"Austria","code":"43","iso":"AT"},
        {"country":"Azerbaijan","code":"994","iso":"AZ"},
        {"country":"Bahamas","code":"1-242","iso":"BS"},
        {"country":"Bahrain","code":"973","iso":"BH"},
        {"country":"Bangladesh","code":"880","iso":"BD"},
        {"country":"Barbados","code":"1-246","iso":"BB"},
        {"country":"Belarus","code":"375","iso":"BY"},
        {"country":"Belgium","code":"32","iso":"BE"},
        {"country":"Belize","code":"501","iso":"BZ"},
        {"country":"Benin","code":"229","iso":"BJ"},
        {"country":"Bermuda","code":"1-441","iso":"BM"},
        {"country":"Bhutan","code":"975","iso":"BT"},
        {"country":"Bolivia","code":"591","iso":"BO"},
        {"country":"Bosnia and Herzegovina","code":"387","iso":"BA"},
        {"country":"Botswana","code":"267","iso":"BW"},
        {"country":"Brazil","code":"55","iso":"BR"},
        {"country":"British Indian Ocean Territory","code":"246","iso":"IO"},
        {"country":"British Virgin Islands","code":"1-284","iso":"VG"},
        {"country":"Brunei","code":"673","iso":"BN"},
        {"country":"Bulgaria","code":"359","iso":"BG"},
        {"country":"Burkina Faso","code":"226","iso":"BF"},
        {"country":"Burundi","code":"257","iso":"BI"},
        {"country":"Cambodia","code":"855","iso":"KH"},
        {"country":"Cameroon","code":"237","iso":"CM"},
        {"country":"Canada","code":"1","iso":"CA"},
        {"country":"Cape Verde","code":"238","iso":"CV"},
        {"country":"Cayman Islands","code":"1-345","iso":"KY"},
        {"country":"Central African Republic","code":"236","iso":"CF"},
        {"country":"Chad","code":"235","iso":"TD"},
        {"country":"Chile","code":"56","iso":"CL"},
        {"country":"China","code":"86","iso":"CN"},
        {"country":"Christmas Island","code":"61","iso":"CX"},
        {"country":"Cocos Islands","code":"61","iso":"CC"},
        {"country":"Colombia","code":"57","iso":"CO"},
        {"country":"Comoros","code":"269","iso":"KM"},
        {"country":"Cook Islands","code":"682","iso":"CK"},
        {"country":"Costa Rica","code":"506","iso":"CR"},
        {"country":"Croatia","code":"385","iso":"HR"},
        {"country":"Cuba","code":"53","iso":"CU"},
        {"country":"Curacao","code":"599","iso":"CW"},
        {"country":"Cyprus","code":"357","iso":"CY"},
        {"country":"Czech Republic","code":"420","iso":"CZ"},
        {"country":"Democratic Republic of the Congo","code":"243","iso":"CD"},
        {"country":"Denmark","code":"45","iso":"DK"},
        {"country":"Djibouti","code":"253","iso":"DJ"},
        {"country":"Dominica","code":"1-767","iso":"DM"},
        {"country":"Dominican Republic","code":"1-809, 1-829, 1-849","iso":"DO"},
        {"country":"East Timor","code":"670","iso":"TL"},
        {"country":"Ecuador","code":"593","iso":"EC"},
        {"country":"Egypt","code":"20","iso":"EG"},
        {"country":"El Salvador","code":"503","iso":"SV"},
        {"country":"Equatorial Guinea","code":"240","iso":"GQ"},
        {"country":"Eritrea","code":"291","iso":"ER"},
        {"country":"Estonia","code":"372","iso":"EE"},
        {"country":"Ethiopia","code":"251","iso":"ET"},
        {"country":"Falkland Islands","code":"500","iso":"FK"},
        {"country":"Faroe Islands","code":"298","iso":"FO"},
        {"country":"Fiji","code":"679","iso":"FJ"},
        {"country":"Finland","code":"358","iso":"FI"},
        {"country":"France","code":"33","iso":"FR"},
        {"country":"French Polynesia","code":"689","iso":"PF"},
        {"country":"Gabon","code":"241","iso":"GA"},
        {"country":"Gambia","code":"220","iso":"GM"},
        {"country":"Georgia","code":"995","iso":"GE"},
        {"country":"Germany","code":"49","iso":"DE"},
        {"country":"Ghana","code":"233","iso":"GH"},
        {"country":"Gibraltar","code":"350","iso":"GI"},
        {"country":"Greece","code":"30","iso":"GR"},
        {"country":"Greenland","code":"299","iso":"GL"},
        {"country":"Grenada","code":"1-473","iso":"GD"},
        {"country":"Guam","code":"1-671","iso":"GU"},
        {"country":"Guatemala","code":"502","iso":"GT"},
        {"country":"Guernsey","code":"44-1481","iso":"GG"},
        {"country":"Guinea","code":"224","iso":"GN"},
        {"country":"Guinea-Bissau","code":"245","iso":"GW"},
        {"country":"Guyana","code":"592","iso":"GY"},
        {"country":"Haiti","code":"509","iso":"HT"},
        {"country":"Honduras","code":"504","iso":"HN"},
        {"country":"Hong Kong","code":"852","iso":"HK"},
        {"country":"Hungary","code":"36","iso":"HU"},
        {"country":"Iceland","code":"354","iso":"IS"},
        {"country":"India","code":"91","iso":"IN"},
        {"country":"Indonesia","code":"62","iso":"ID"},
        {"country":"Iran","code":"98","iso":"IR"},
        {"country":"Iraq","code":"964","iso":"IQ"},
        {"country":"Ireland","code":"353","iso":"IE"},
        {"country":"Isle of Man","code":"44-1624","iso":"IM"},
        {"country":"Israel","code":"972","iso":"IL"},
        {"country":"Italy","code":"39","iso":"IT"},
        {"country":"Ivory Coast","code":"225","iso":"CI"},
        {"country":"Jamaica","code":"1-876","iso":"JM"},
        {"country":"Japan","code":"81","iso":"JP"},
        {"country":"Jersey","code":"44-1534","iso":"JE"},
        {"country":"Jordan","code":"962","iso":"JO"},
        {"country":"Kazakhstan","code":"7","iso":"KZ"},
        {"country":"Kenya","code":"254","iso":"KE"},
        {"country":"Kiribati","code":"686","iso":"KI"},
        {"country":"Kosovo","code":"383","iso":"XK"},
        {"country":"Kuwait","code":"965","iso":"KW"},
        {"country":"Kyrgyzstan","code":"996","iso":"KG"},
        {"country":"Laos","code":"856","iso":"LA"},
        {"country":"Latvia","code":"371","iso":"LV"},
        {"country":"Lebanon","code":"961","iso":"LB"},
        {"country":"Lesotho","code":"266","iso":"LS"},
        {"country":"Liberia","code":"231","iso":"LR"},
        {"country":"Libya","code":"218","iso":"LY"},
        {"country":"Liechtenstein","code":"423","iso":"LI"},
        {"country":"Lithuania","code":"370","iso":"LT"},
        {"country":"Luxembourg","code":"352","iso":"LU"},
        {"country":"Macao","code":"853","iso":"MO"},
        {"country":"Macedonia","code":"389","iso":"MK"},
        {"country":"Madagascar","code":"261","iso":"MG"},
        {"country":"Malawi","code":"265","iso":"MW"},
        {"country":"Malaysia","code":"60","iso":"MY"},
        {"country":"Maldives","code":"960","iso":"MV"},
        {"country":"Mali","code":"223","iso":"ML"},
        {"country":"Malta","code":"356","iso":"MT"},
        {"country":"Marshall Islands","code":"692","iso":"MH"},
        {"country":"Mauritania","code":"222","iso":"MR"},
        {"country":"Mauritius","code":"230","iso":"MU"},
        {"country":"Mayotte","code":"262","iso":"YT"},
        {"country":"Mexico","code":"52","iso":"MX"},
        {"country":"Micronesia","code":"691","iso":"FM"},
        {"country":"Moldova","code":"373","iso":"MD"},
        {"country":"Monaco","code":"377","iso":"MC"},
        {"country":"Mongolia","code":"976","iso":"MN"},
        {"country":"Montenegro","code":"382","iso":"ME"},
        {"country":"Montserrat","code":"1-664","iso":"MS"},
        {"country":"Morocco","code":"212","iso":"MA"},
        {"country":"Mozambique","code":"258","iso":"MZ"},
        {"country":"Myanmar","code":"95","iso":"MM"},
        {"country":"Namibia","code":"264","iso":"NA"},
        {"country":"Nauru","code":"674","iso":"NR"},
        {"country":"Nepal","code":"977","iso":"NP"},
        {"country":"Netherlands","code":"31","iso":"NL"},
        {"country":"Netherlands Antilles","code":"599","iso":"AN"},
        {"country":"New Caledonia","code":"687","iso":"NC"},
        {"country":"New Zealand","code":"64","iso":"NZ"},
        {"country":"Nicaragua","code":"505","iso":"NI"},
        {"country":"Niger","code":"227","iso":"NE"},
        {"country":"Nigeria","code":"234","iso":"NG"},
        {"country":"Niue","code":"683","iso":"NU"},
        {"country":"North Korea","code":"850","iso":"KP"},
        {"country":"Northern Mariana Islands","code":"1-670","iso":"MP"},
        {"country":"Norway","code":"47","iso":"NO"},
        {"country":"Oman","code":"968","iso":"OM"},
        {"country":"Pakistan","code":"92","iso":"PK"},
        {"country":"Palau","code":"680","iso":"PW"},
        {"country":"Palestine","code":"970","iso":"PS"},
        {"country":"Panama","code":"507","iso":"PA"},
        {"country":"Papua New Guinea","code":"675","iso":"PG"},
        {"country":"Paraguay","code":"595","iso":"PY"},
        {"country":"Peru","code":"51","iso":"PE"},
        {"country":"Philippines","code":"63","iso":"PH"},
        {"country":"Pitcairn","code":"64","iso":"PN"},
        {"country":"Poland","code":"48","iso":"PL"},
        {"country":"Portugal","code":"351","iso":"PT"},
        {"country":"Puerto Rico","code":"1-787, 1-939","iso":"PR"},
        {"country":"Qatar","code":"974","iso":"QA"},
        {"country":"Republic of the Congo","code":"242","iso":"CG"},
        {"country":"Reunion","code":"262","iso":"RE"},
        {"country":"Romania","code":"40","iso":"RO"},
        {"country":"Russia","code":"7","iso":"RU"},
        {"country":"Rwanda","code":"250","iso":"RW"},
        {"country":"Saint Barthelemy","code":"590","iso":"BL"},
        {"country":"Saint Helena","code":"290","iso":"SH"},
        {"country":"Saint Kitts and Nevis","code":"1-869","iso":"KN"},
        {"country":"Saint Lucia","code":"1-758","iso":"LC"},
        {"country":"Saint Martin","code":"590","iso":"MF"},
        {"country":"Saint Pierre and Miquelon","code":"508","iso":"PM"},
        {"country":"Saint Vincent and the Grenadines","code":"1-784","iso":"VC"},
        {"country":"Samoa","code":"685","iso":"WS"},
        {"country":"San Marino","code":"378","iso":"SM"},
        {"country":"Sao Tome and Principe","code":"239","iso":"ST"},
        {"country":"Saudi Arabia","code":"966","iso":"SA"},
        {"country":"Senegal","code":"221","iso":"SN"},
        {"country":"Serbia","code":"381","iso":"RS"},
        {"country":"Seychelles","code":"248","iso":"SC"},
        {"country":"Sierra Leone","code":"232","iso":"SL"},
        {"country":"Singapore","code":"65","iso":"SG"},
        {"country":"Sint Maarten","code":"1-721","iso":"SX"},
        {"country":"Slovakia","code":"421","iso":"SK"},
        {"country":"Slovenia","code":"386","iso":"SI"},
        {"country":"Solomon Islands","code":"677","iso":"SB"},
        {"country":"Somalia","code":"252","iso":"SO"},
        {"country":"South Africa","code":"27","iso":"ZA"},
        {"country":"South Korea","code":"82","iso":"KR"},
        {"country":"South Sudan","code":"211","iso":"SS"},
        {"country":"Spain","code":"34","iso":"ES"},
        {"country":"Sri Lanka","code":"94","iso":"LK"},
        {"country":"Sudan","code":"249","iso":"SD"},
        {"country":"Suriname","code":"597","iso":"SR"},
        {"country":"Svalbard and Jan Mayen","code":"47","iso":"SJ"},
        {"country":"Swaziland","code":"268","iso":"SZ"},
        {"country":"Sweden","code":"46","iso":"SE"},
        {"country":"Switzerland","code":"41","iso":"CH"},
        {"country":"Syria","code":"963","iso":"SY"},
        {"country":"Taiwan","code":"886","iso":"TW"},
        {"country":"Tajikistan","code":"992","iso":"TJ"},
        {"country":"Tanzania","code":"255","iso":"TZ"},
        {"country":"Thailand","code":"66","iso":"TH"},
        {"country":"Togo","code":"228","iso":"TG"},
        {"country":"Tokelau","code":"690","iso":"TK"},
        {"country":"Tonga","code":"676","iso":"TO"},
        {"country":"Trinidad and Tobago","code":"1-868","iso":"TT"},
        {"country":"Tunisia","code":"216","iso":"TN"},
        {"country":"Turkey","code":"90","iso":"TR"},
        {"country":"Turkmenistan","code":"993","iso":"TM"},
        {"country":"Turks and Caicos Islands","code":"1-649","iso":"TC"},
        {"country":"Tuvalu","code":"688","iso":"TV"},
        {"country":"U.S. Virgin Islands","code":"1-340","iso":"VI"},
        {"country":"Uganda","code":"256","iso":"UG"},
        {"country":"Ukraine","code":"380","iso":"UA"},
        {"country":"United Arab Emirates","code":"971","iso":"AE"},
        {"country":"United Kingdom","code":"44","iso":"GB"},
        {"country":"United States","code":"1","iso":"US"},
        {"country":"Uruguay","code":"598","iso":"UY"},
        {"country":"Uzbekistan","code":"998","iso":"UZ"},
        {"country":"Vanuatu","code":"678","iso":"VU"},
        {"country":"Vatican","code":"379","iso":"VA"},
        {"country":"Venezuela","code":"58","iso":"VE"},
        {"country":"Vietnam","code":"84","iso":"VN"},
        {"country":"Wallis and Futuna","code":"681","iso":"WF"},
        {"country":"Western Sahara","code":"212","iso":"EH"},
        {"country":"Yemen","code":"967","iso":"YE"},
        {"country":"Zambia","code":"260","iso":"ZM"},
        {"country":"Zimbabwe","code":"263","iso":"ZW"}
    ];

    const [formData, setFormData] = useState({
        staffid: "",
        hotelid: "",
        source: "",
        personName: "",
        extnmob: "",
        mobile: "",
        email: "",
        guestCount: "",
        extrapersonName: "",
        extrapersoncharge: "",
        extrapersondays: "",
        roomType: "",
        bedType: "",
        address: "",
        nationality: "",
        identityType: "",
        aadharNum: "",
        checkin_Booking: "",
        checkin_Reserve: "",
        checkout: "",
        cFormNumber: "",
        roomNumbers: "",
        bookingNo: randomNumber,
        payment_Booking: [
            {
                roomrent: 0,
                extra: 0,
                discper: 0,
                discamt: 0,
                gst: 0,
                amountPaid: 0,
                amountDue: 0,
                paymentType: "",
            },
        ],
        payment_Reserve: [],
        bookingnotes: ""
    });

    useEffect(() => {
        if (bookingId) {
            setIsEditMode(true);
            fetchBookingDetails(bookingId);
        }
    }, [bookingId]);

    const fetchBookingDetails = async (id) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/book/single-booking?bookingId=${id}`, {
                headers: { Authorization: localStorage.getItem("token") },
            });
    
            if (response.data.success && response.data.booking.length > 0) {
                setFormData(response.data.booking[0]);

                setBaseRoomRent(response.data.booking[0].payment_Booking[0].roomrent);
                setExtraValue(response.data.booking[0].payment_Booking[0].extra);
                setDiscvalue(response.data.booking[0].payment_Booking[0].discamt);
                
                if(response.data.booking[0].payment_Booking[0].gst === 0){
                    setIsGstChecked(false);
                }else{
                    setIsGstChecked(true);
                    setGstcost(response.data.booking[0].payment_Booking[0].gst);
                }
                if(response.extrapersoncharge > 0 && response.extrapersoncharge !== 'NULL'){
                    setExtrapersoncost(response.extrapersoncharge);
                }
                setRoomrent(response.data.booking[0].payment_Booking[0].amountDue);
                
                setActRoomrent(response.data.booking[0].payment_Booking[0].total);
            } else {
                alert("Booking not found");
            }
        } catch (error) {
            console.error("Error fetching booking:", error);
            alert("Error loading booking details");
        }
    };
    
    

    const handleClose = () => {
        setShowModal(false);
        navigate("/booking");
    };

    const round2 = (num) => Math.round(num * 100) / 100;

    const handleRoomTypeChange = (e) => {
        const { name, value } = e.target;
        setSelectedBedroom(value);
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckindate = (date, dateString) => {
        if (!date) return;
        console.log("Selected Date & Time:", date);
        
        setFormData((prevData) => ({
          ...prevData,
          checkin_Booking: date.toDate(), // Convert Moment object to native Date object
        }));
      };
      

    const handleChangePhone = (e) => {
        const { name, value } = e.target;
        const sanitizedValue = value.replace(/[^0-9]/g, ''); // Allow only numeric values
        setFormData({ ...formData, [name]: sanitizedValue });
      };

    const handleRoomChange = (e) => {
        if(selectedBedroom === ''){
            alert("Select Room type AC or Non-AC");
        }else{
            const selectedBedtype = e.target.value;
            setSelectedBedtype(selectedBedtype);
            const selectedRoom = bedroomTypes.find((room) => room.type === selectedBedtype);
            
            let newRoomRent = Math.round(((Number(selectedRoom.rate) + Number(extrapersoncost) + Number(extraValue)) - Number(discvalue)));
            let calsgst = Math.round(((Number(selectedRoom.rate) + Number(extrapersoncost) + Number(extraValue)) - Number(discvalue)) * 0.12);

            if(selectedBedroom === 'AC'){
                setBaseRoomRent(selectedRoom.rate);
                setActRoomrent(newRoomRent);
                setRoomrent(newRoomRent);
            }else{
                setRoomrent(newRoomRent);
            }

            setGstcost(calsgst);
            setFormData((prevData) => ({
                ...prevData,
                bedType: selectedBedtype,
                payment_Booking: [
                    {
                        ...prevData.payment_Booking[0],
                        roomrent: selectedRoom.rate,
                    },
                ]
            }));
        }
    }

    const handleextrapersoncostChange = (e) => {
        const experrate = e.target.value;
        setExtrapersonrate(experrate);
        
        const calcExtraCost = Number(experrate) * Number(extrapersondays);
        setExtrapersoncost(calcExtraCost);
        
        let newRoomRent = Math.round(((Number(baseRoomRent) + Number(calcExtraCost) + Number(extraValue)) - Number(discvalue)));
        let calsgst = Math.round(((Number(baseRoomRent) + Number(calcExtraCost) + Number(extraValue)) - Number(discvalue)) * 0.12);
        
        setGstcost(calsgst);
        setActRoomrent(newRoomRent);

        if (isGstChecked) {
          newRoomRent = Number(newRoomRent)+Number(calsgst);
        }
        
        setRoomrent(newRoomRent);
      
        setFormData((prevData) => {
          const paymentBooking = prevData.payment_Booking.length > 0 
            ? prevData.payment_Booking[0]
            : {
                roomrent: 0,
                gst: 0,
                extra: 0,
                discper: 0,
                discamt: 0,
                total: 0,
                amountPaid: 0,
                amountDue: 0,
                paymentType: ""
              };
      
          const updatedPaymentBooking = {
            ...paymentBooking,
            total: newRoomRent,
            extra: Number(extraValue),
          };
      
          return {
            ...prevData,
            extrapersoncharge: calcExtraCost,
            extrapersondays: extrapersondays,
            payment_Booking: [updatedPaymentBooking],
          };
        });
      };
          
      const handleextrapersondayChange = (e) => {
        const experdays = e.target.value;
        setExtrapersondays(experdays);
        
        const calcExtraCost = Number(extrapersonrate) * Number(experdays);
        setExtrapersoncost(calcExtraCost);
        
        let newRoomRent = Math.round(((Number(baseRoomRent) + Number(calcExtraCost) + Number(extraValue)) - Number(discvalue)));
        let calsgst = Math.round(((Number(baseRoomRent) + Number(calcExtraCost) + Number(extraValue)) - Number(discvalue)) * 0.12);
        
        setGstcost(calsgst);
        setActRoomrent(newRoomRent);

        if (isGstChecked) {
          newRoomRent = Number(newRoomRent)+Number(calsgst);
        }
        
        setRoomrent(newRoomRent);
      
        setFormData((prevData) => {
          const paymentBooking = prevData.payment_Booking.length > 0 
            ? prevData.payment_Booking[0]
            : {
                roomrent: 0,
                gst: 0,
                extra: 0,
                discper: 0,
                discamt: 0,
                total: 0,
                amountPaid: 0,
                amountDue: 0,
                paymentType: ""
              };
      
          const updatedPaymentBooking = {
            ...paymentBooking,
            total: newRoomRent,
            extra: Number(extraValue),
          };
      
          return {
            ...prevData,
            extrapersondays: experdays,
            payment_Booking: [updatedPaymentBooking],
          };
        });
      };

    const handleExtraChange = (e) => {
        const getextravalue = parseFloat(e.target.value) || 0;
        setExtraValue(Number(getextravalue));
      
        let newRoomRent = Math.round(((Number(baseRoomRent) + Number(extrapersoncost) + Number(getextravalue)) - Number(discvalue)));
        let calsgst = Math.round(((Number(baseRoomRent) + Number(extrapersoncost) + Number(getextravalue)) - Number(discvalue)) * 0.12);
        
        setGstcost(calsgst);
        setActRoomrent(newRoomRent);

        if (isGstChecked) {
          newRoomRent = Number(newRoomRent)+Number(calsgst);
        }
        
        setRoomrent(newRoomRent);
      
        setFormData((prevData) => {
          const paymentBooking = prevData.payment_Booking.length > 0 
            ? prevData.payment_Booking[0]
            : {
                roomrent: 0,
                gst: 0,
                extra: 0,
                discper: 0,
                discamt: 0,
                total: 0,
                amountPaid: 0,
                amountDue: 0,
                paymentType: ""
              };
      
          const updatedPaymentBooking = {
            ...paymentBooking,
            total: newRoomRent,
            extra: getextravalue,
          };
      
          return {
            ...prevData,
            payment_Booking: [updatedPaymentBooking],
          };
        });
      };   

    const handleDiscChange = (event) => {
        const discPercentage = parseFloat(event.target.value) || 0;
        const discDecimal = Number(discPercentage) / 100;

        let newRoomRent_woDisc = Math.round(((Number(baseRoomRent) + Number(extrapersoncost) + Number(extraValue))));
        const discamount = Math.round(Number(newRoomRent_woDisc)*Number(discDecimal));

        let newRoomRent = Math.round(((Number(baseRoomRent) + Number(extrapersoncost) + Number(extraValue)) - Number(discamount)));
        let calsgst = Math.round(((Number(baseRoomRent) + Number(extrapersoncost) + Number(extraValue)) - Number(discamount)) * 0.12);
        setDiscvalue(discamount);
        setGstcost(calsgst);

        if (isGstChecked) {
          newRoomRent = Number(newRoomRent)+Number(calsgst);
        }
        
        setActRoomrent(newRoomRent);
        setRoomrent(newRoomRent);
        
        setFormData((prevData) => {
          const paymentBooking = prevData.payment_Booking.length > 0 
            ? prevData.payment_Booking[0]
            : {
                roomrent: 0,
                gst: 0,
                extra: 0,
                discper: 0,
                discamt: 0,
                total: 0,
                amountPaid: 0,
                amountDue: 0,
                paymentType: ""
              };
          
          const updatedPaymentBooking = {
            ...paymentBooking,
            total: newRoomRent,
            discper: discPercentage,
            discamt: discamount,
          };
          
          return {
            ...prevData,
            payment_Booking: [updatedPaymentBooking],
          };
        });
      };

      const handleGstChange = (event) => {
        const isChecked = event.target.checked;
        setIsGstChecked(isChecked);

        let newRoomRent = Math.round(((Number(baseRoomRent) + Number(extrapersoncost) + Number(extraValue)) - Number(discvalue)));
        let calsgst = Math.round(((Number(baseRoomRent) + Number(extrapersoncost) + Number(extraValue)) - Number(discvalue)) * 0.12);

        if (isChecked) {
            newRoomRent = Number(newRoomRent)+Number(calsgst);
        }

        setActRoomrent(newRoomRent);
        setRoomrent(newRoomRent);
        
        setFormData((prevData) => {
            const paymentBooking = prevData.payment_Booking.length > 0 
                ? prevData.payment_Booking[0] 
                : { roomrent: 0, gst: 0, extra: 0, discper: 0, discamt: 0, total: 0, amountPaid: 0, amountDue: 0, paymentType: "" };
    
            const updatedPaymentBooking = {
                ...paymentBooking, 
                total: newRoomRent,
                isgst:isGstChecked,
                gst: calsgst, 
            };
    
            return {
                ...prevData,
                payment_Booking: [updatedPaymentBooking], 
            };
        });
    };

    const handlePaymentChange = (event) => {
        const paymentamt = event.target.value;
        setBookingadvance(paymentamt);

        let newRoomRent = Math.round(((Number(baseRoomRent) + Number(extrapersoncost) + Number(extraValue)) - Number(discvalue)));
        let calsgst = Math.round(((Number(baseRoomRent) + Number(extrapersoncost) + Number(extraValue)) - Number(discvalue)) * 0.12);

        if (isGstChecked) {
            newRoomRent = Number(newRoomRent)+Number(calsgst);
        }

        setActRoomrent(newRoomRent);
        let balanceAmt = Number(newRoomRent)-Number(paymentamt);
        setRoomrent(balanceAmt);
        
        setFormData((prevData) => {
            const paymentBooking = prevData.payment_Booking[0];
            
            const updatedPaymentBooking = {
                ...paymentBooking,
                total: newRoomRent,
                amountPaid: paymentamt,
                amountDue: balanceAmt,
            };
        
            return {
                ...prevData,
                payment_Booking: [updatedPaymentBooking],
            };
        });
    };

    const handlePaymentmodeChange = (event) => {
        const selectedPaymentType = event.target.value; 
        setFormData((prevData) => {
            const paymentBooking = prevData.payment_Booking[0];
            const updatedPaymentBooking = {
                ...paymentBooking,
                paymentType: selectedPaymentType
            };
    
            return {
                ...prevData,
                payment_Booking: [updatedPaymentBooking],
            };
        });
    };

    // --------------------------------------------------//


    
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;
        
        // Capitalize first letter for all fields except email
        if (name !== "source") {
            console.log(name);
          formattedValue = value.toUpperCase();
        }
        
        setFormData((prevState) => ({
          ...prevState,
          [name]: formattedValue,
        }));
      };      
    

    const fetchBedroomTypes = async () => {
        try {
            const url = `${process.env.REACT_APP_API_BASE_URL}/api/room/bedtypes?hotelId=${selectedHotel}`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await axios.get(url, headers);
            setBedroomTypes(response.data.bedroomTypes || []);
        } catch (err) {
            console.error('Error fetching bedroom types:', err);
            setBedroomTypes([]);
        }
    };

    useEffect(() => {
        feather.replace();
        fetchBedroomTypes();
        if (loggedInUser) {
            setFormData((prevData) => ({
                ...prevData,
                staffid: loggedInUser,
                hotelid: selectedHotel,
                extnmob: "91",
                guestCount: 2,
                roomType: 'AC',
                bedType: 'Single occupancy',
            }));
        }
    }, [loggedInUser,selectedHotel]);

    const isEmptyCheckinDate = () => {
        if (!formData.checkin_Booking) return true; // Not provided
        // If it's a string, trim and check if it's empty
        if (typeof formData.checkin_Booking === "string") {
          return formData.checkin_Booking.trim() === "";
        }
        // If it's a Date object, check if it's invalid
        if (formData.checkin_Booking instanceof Date) {
          return isNaN(formData.checkin_Booking.getTime());
        }
        return false;
      };
    

      const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return; // Prevent multiple clicks
        setIsSubmitting(true);

        // Validation
        if (!formData.source || formData.source.trim() === "") {
            alert("Please select a source");
            return;
        }

        if (!formData.personName || formData.personName.trim() === "") {
            alert("Booking Person Name is required");
            return;
        }

        // if (!formData.mobile || formData.mobile.trim() === "") {
        //     alert("Booking Person Phone Number is required");
        //     return;
        // }

        if (!formData.email || formData.email.trim() === "") {
            alert("Email is required");
            return;
        }

        if (!formData.roomType || formData.roomType.trim() === "") {
            alert("Room Type is required");
            return;
        }

        if (!formData.checkin_Booking) {
            alert("Check-in Date is required");
            return;
        }

        if (!formData.address || formData.address.trim() === "") {
            alert("Address is required");
            return;
        }

        // Update payment_Booking details
        const updatedPaymentBooking = formData.payment_Booking.map((payment) => ({
            ...payment,
            amountDue: payment.amountDue === 0 ? payment.total : payment.amountDue,
        }));

        const updatedFormData = {
            ...formData,
            payment_Booking: updatedPaymentBooking,
        };

        try {
            const headers = { Authorization: localStorage.getItem("token") };

            let response;
            if (isEditMode) {
                // **Edit Mode: Update Booking**
                response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/book/edit-booking/${bookingId}`, updatedFormData, { headers });
            } else {
                // **New Mode: Create Booking**
                response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/book/new-booking`, updatedFormData, { headers });
            }

            if (response.data.success) {
                const successMessage = isEditMode ? "Booking successfully updated" : "Booking successfully created";
                setModalMessage(successMessage);
                setShowModal(true);
                setTimeout(() => {
                navigate("/booking");
                }, 5000);
            } else {
                alert("Failed to save booking");
            }
        } catch (error) {
            console.error("Error submitting booking:", error);
            alert("An error occurred");
        } finally {
        setIsSubmitting(false); // Re-enable button
    }
    };     

    return <>
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">

                        <div className="row pt-2">
                            <div className="card" style={{borderRadius:'30px'}}>
                                <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                <Row>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Row>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="pe-2 pt-2">
                                                <Row>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <p className="fs-18 fw-semibold text-blue pt-3">Booking Staff</p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <input type="text" name="staffid" onChange={handleChange} value={loggedInUser ?? ""} readOnly className="form-control" placeholder="Booking Staff Name" />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="pe-2 pt-2">
                                            <Row>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <p className="fs-18 fw-semibold text-blue pt-3">Source of Booking</p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <select className="form-select" name="source" onChange={handleChange} value={formData.source} id="example-select">
                                                            <option>Select ...</option>
                                                            <option value="Google">Google</option>
                                                            <option value="Social Media">Social media</option>
                                                            <option value="Make My Trip">Make My Trip</option>
                                                            <option value="Friends and Family">Friends & Family </option>
                                                            <option value="Goibibo">Goibibo</option>
                                                            <option value="Travel Agent">Travel Agent</option>
                                                            <option value="Walk-In">Walk-In</option>
                                                            <option value="Portal">Portal</option>
                                                            <option value="Others">Others</option>
                                                        </select>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>

                                    </Col>
                                </Row>

                                <div className="line mt-4" style={{height: '2px', background: 'linear-gradient(to right, transparent 50%, #b4b4b4 50%)',backgroundSize: '16px 2px, 100% 2px'}}></div>

                                <p className="fs-20 fw-semibold text-blue pt-2">Guest Info</p>

                                <Row className="pb-1">
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>

                                        <Row>
                                            <Col xs={8} sm={8} md={1} lg={1} xl={1} className="pe-2 pt-2">
                                                <select className="form-select" name="nameTitle" onChange={handleChange} value={formData.roomType} id="example-select">
                                                    <option value="Mr.">Mr.</option>
                                                    <option value="Mrs.">Mrs.</option>
                                                    <option value="Miss.">Miss.</option>
                                                    <option value="Ms.">Ms.</option>
                                                </select>
                                            </Col>
                                            <Col xs={16} sm={16} md={5} lg={5} xl={5} className="pe-2 pt-2">
                                                <input type="text" className="form-control" name="personName" onChange={handleChange} value={formData.personName} placeholder="Booking Person Name" autoComplete="off" />
                                            </Col>
                                            <Col xs={12} sm={12} md={2} lg={2} xl={2} className="pe-2 pt-2">
                                            <select value={formData.extnmob} name="extnmob" className="form-control" onChange={handleChange}>
                                                {countryCodes.map((country,index) => (
                                                <option key={index+1} value={country.code}>
                                                    {country.iso} (+{country.code})
                                                </option>
                                                ))}
                                            </select>
                                            </Col>
                                            <Col xs={24} sm={24} md={5} lg={5} xl={5} className="pe-2 pt-2">
                                            <input type="text" className="form-control" name="mobile" onChange={handleChangePhone} value={formData.mobile} placeholder="Mobile Number" maxLength="10" autoComplete="off" />
                                            </Col>
                                            <Col xs={24} sm={24} md={7} lg={7} xl={7} className="pe-2 pt-2">
                                                <input type="email" className="form-control" name="email" onChange={handleChange} value={formData.email} placeholder="Email Address" autoComplete="off" />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                                

                                <Row className="pb-1">
                                    
                                    <Col xs={24} sm={24} md={2} lg={2} xl={2}>
                                        <p className="fs-20 fw-semibold text-blue pt-3">No of Pax</p>
                                        <Row>
                                            <Col xs={24} sm={24} md={16} lg={16} xl={16} className="pe-2 pt-2" style={{marginLeft:'10px'}}>
                                                <select className="form-select" name="guestCount" onChange={handleChange} value={formData.guestCount} id="example-select">
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col xs={24} sm={24} md={9} lg={9} xl={9}>
                                        <p className="fs-20 fw-semibold text-blue pt-3">Room Type</p>
                                        <Row>
                                            <Col xs={24} sm={24} md={4} lg={4} xl={4} className="pe-2 pt-2">
                                                <select className="form-select" name="roomType" onChange={handleRoomTypeChange} value={formData.roomType} id="example-select">
                                                    <option value="AC">AC</option>
                                                    <option value="Non-AC">Non-AC</option>
                                                </select>
                                            </Col>

                                            <Col xs={24} sm={24} md={16} lg={16} xl={16} className="pe-2 pt-2">
                                                <select className="form-select" name="bedType" onChange={handleRoomChange} value={formData.bedType} id="example-select">
                                                    <option>Select Option</option>
                                                    {bedroomTypes.map((room, index) => (
                                                        <option key={index} value={room.type}>
                                                            {room.type}
                                                        </option>
                                                    ))}
                                                </select>
                                            </Col>
                                            <Col xs={24} sm={24} md={4} lg={4} xl={4} className="pe-2 pt-2">
                                                    <input type="text" className="form-control" value={baseRoomRent} readOnly />
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col xs={24} sm={24} md={9} lg={9} xl={9}>
                                        <p className="fs-20 fw-semibold text-blue pt-3 m-0">Extra Pax -  {extrapersoncost}</p>

                                        <Row>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12} className="">
                                                <p className="fs-16 m-0 fw-semibold text-blue">Name </p>
                                            </Col>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="pe-2">
                                                <p className="fs-16 m-0 fw-semibold text-blue">Cost </p>
                                            </Col>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="pe-2">
                                                <p className="fs-16 m-0 fw-semibold text-blue">Days </p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12} className="pe-2">
                                                <input type="text" className="form-control" name="extrapersonName" onChange={handleChange} value={formData.extrapersonName} placeholder="Extra Person Name" autoComplete="off" />
                                            </Col>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="pe-2">
                                            <input type="text" className="form-control" name="extrapersoncharge" onChange={handleextrapersoncostChange} value={formData.extrapersoncharge} placeholder="Cost" maxLength="10" autoComplete="off" />
                                            </Col>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="pe-2">
                                                <input type="text" className="form-control" name="extrapersondays" onChange={handleextrapersondayChange} value={formData.extrapersondays} placeholder="Days" autoComplete="off" />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                                <Row className="pb-3">
                                    <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                                        <Row>
                                            <Col xs={24} sm={24} md={10} lg={10} xl={10} className="pe-2">
                                                <Row>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <p className="fs-18 fw-semibold text-blue pt-3">Check IN Details</p>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <DatePicker
                                                        showTime={{ use12Hours: false, minuteStep: 15 }} // 24-hour format with 15-minute steps
                                                        format="DD-MM-YYYY HH:mm" // Ensures the correct display format
                                                        placeholder="Select Date & Time"
                                                        value={formData.checkin_Booking ? dayjs(formData.checkin_Booking) : null}
                                                        onChange={handleCheckindate}
                                                        className="form-control"
                                                    />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                                                <Row>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <p className="fs-18 fw-semibold text-blue pt-3">Address Details</p>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <textarea className="form-control" name="address" rows="1" onChange={handleChange} value={formData.address}>

                                                    </textarea>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} className="pe-2">
                                                <Row>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <p className="fs-18 fw-semibold text-blue pt-3">Notes</p>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <textarea className="form-control" name="bookingnotes" rows="1" onChange={handleChange} value={formData.bookingnotes}></textarea>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>


                                <div className="line mt-4" style={{height: '2px', background: 'linear-gradient(to right, transparent 50%, #b4b4b4 50%)',backgroundSize: '16px 2px, 100% 2px'}}></div>

                                <Row>
                                    <Col xs={24} sm={24} md={20} lg={20} xl={20} className="mt-3" style={{border:'solid #b4b4b4 1px', borderRadius:'15px', padding:'0px 10px'}}>
                                        <Row>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                                                <Row>
                                                    <Col xs={24} sm={24} md={8} lg={8} xl={8} >
                                                        <p className="fs-18 fw-semibold text-blue pt-3">Extra</p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                                                        <input type="text" name="bokingpayment" onChange={handleExtraChange} value={formData?.payment_Booking?.[0]?.extra || ""} className="form-control mt-2" placeholder="00.00" autoComplete="off"/>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={24} sm={24} md={8} lg={8} xl={8} >
                                                    <p className="fs-18 fw-semibold text-blue pt-2">Disc % ({discvalue})</p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                                                        <input type="text" name="discper" onChange={handleDiscChange} value={formData?.payment_Booking?.[0]?.discper || ""} className="form-control mt-2" placeholder="00.00" autoComplete="off"/>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={24} sm={24} md={8} lg={8} xl={8} >
                                                        <p className="fs-18 fw-semibold text-blue pt-3">GST :</p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                                                        <input className="form-check-input" style={{verticalAlign:'middle', marginTop: '-8px', marginRight:'5px'}} checked={isGstChecked} onChange={handleGstChange} type="checkbox" value="" id="flexCheckDefault"/>
                                                        <label className="form-check-label" htmlFor="flexCheckDefault"><p className="fs-18 fw-bold text-blue pt-3">Add GST ({gstcost})</p></label>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={24} sm={24} md={8} lg={8} xl={8} >
                                                        <p className="fs-18 fw-semibold text-blue pt-3">Booking Payment</p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                                                        <input type="text" name="bokingpayment" onChange={handlePaymentChange} value={formData?.payment_Booking?.[0]?.amountPaid || ""} className="form-control mt-3" placeholder="Booking Payment" autoComplete="off"/>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={24} sm={24} md={8} lg={8} xl={8} >
                                                        <p className="fs-18 fw-semibold text-blue pt-3">Mode of Payment</p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} >
                                                        <div className="col-sm-11 d-flex gap-4 mt-3 mb-3">
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="radio" name="gridRadios" onChange={handlePaymentmodeChange} id="gridRadios1" value="UPI"/>
                                                                <label className="form-check-label" htmlFor="gridRadios1">
                                                                    UPI
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="radio" name="gridRadios" onChange={handlePaymentmodeChange} id="gridRadios2" value="Card"/>
                                                                <label className="form-check-label" htmlFor="gridRadios2">
                                                                    Card
                                                                </label>
                                                            </div>
                                                            <div className="form-check disabled">
                                                                <input className="form-check-input" type="radio" name="gridRadios" onChange={handlePaymentmodeChange} id="gridRadios3" value="Cash"/>
                                                                <label className="form-check-label" htmlFor="gridRadios3">
                                                                    Cash
                                                                </label>
                                                            </div>
                                                            <div className="form-check disabled">
                                                                    <input className="form-check-input" type="radio" name="gridRadios" onChange={handlePaymentmodeChange} id="gridRadios3" value="Baash"/>
                                                                    <label className="form-check-label" htmlFor="gridRadios3">
                                                                        BAASH
                                                                    </label>
                                                                </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={24} sm={24} md={4} lg={4} xl={4} ></Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8} style={{textAlign:'right'}}>

                                                <Row>
                                                <Col xs={24} sm={24} md={11} lg={11} xl={11} >
                                                        <p className="fs-18 fw-semibold text-blue pt-2">Room Rent : </p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={11} lg={11} xl={11} >
                                                        <p className="fs-18 fw-semibold text-black pt-2">INR {Number(baseRoomRent)+Number(extraValue)}/- </p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                <Col xs={24} sm={24} md={11} lg={11} xl={11} >
                                                        <p className="fs-18 fw-semibold text-blue pt-1">Extra Pax: </p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={11} lg={11} xl={11} >
                                                        <p className="fs-18 fw-semibold text-black pt-1">INR {extrapersoncost}/- </p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                <Col xs={24} sm={24} md={11} lg={11} xl={11} >
                                                        <p className="fs-18 fw-semibold text-blue pt-1">Discount : </p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={11} lg={11} xl={11} >
                                                        <p className="fs-18 fw-semibold text-black pt-1">INR {discvalue}/- </p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={24} sm={24} md={11} lg={11} xl={11} >
                                                        <p className="fs-18 fw-semibold text-blue pt-2">Taxable Amount : </p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={11} lg={11} xl={11} >
                                                        <p className="fs-18 fw-semibold text-black pt-2">INR {actroomrent - (isGstChecked ? gstcost : 0)}/-  </p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                <Col xs={24} sm={24} md={11} lg={11} xl={11} >
                                                        <p className="fs-18 fw-semibold text-blue pt-1">GST :</p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={11} lg={11} xl={11} >
                                                        <p className="fs-18 fw-semibold text-black pt-1">INR {isGstChecked ? gstcost : 0.00}/- </p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={24} sm={24} md={11} lg={11} xl={11} >
                                                        <p className="fs-18 fw-semibold text-blue pt-2">Payable Amount : </p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={11} lg={11} xl={11} >
                                                        <p className="fs-18 fw-semibold text-black pt-2">INR {actroomrent}/- </p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                <Col xs={24} sm={24} md={11} lg={11} xl={11} >
                                                        <p className="fs-18 fw-semibold text-blue pt-1">Balance :</p>
                                                    </Col>
                                                    <Col xs={24} sm={24} md={11} lg={11} xl={11} >
                                                        <p className="fs-18 fw-semibold text-black pt-1">INR {roomrent}/- </p>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                                        <button className="btn btn-warning d-flex" style={{float:'right', marginTop:'50%'}} type="submit" disabled={isSubmitting}> {isSubmitting ? "Processing..." : "Submit"} </button>
                                    </Col>
                                </Row>
                                
                                </form>

                                {/* <Modal show={showModal} size="sm" onHide={handleClose} backdrop="static"> */}
                                <Modal size="sm" centered show={showModal} style={{maxWidth: '60vh',marginRight:'auto',marginLeft:'60vh'}} onHide={handleClose} aria-labelledby="example-modal-sizes-title-sm">
                                    {/* <Modal.Header closeButton>
                                        <Modal.Title>{modalMessage}</Modal.Title>
                                    </Modal.Header> */}
                                    <Modal.Body>
                                    <Modal.Title>{modalMessage}</Modal.Title>
                                        <i className="text-danger" data-feather="mail" style={{marginLeft:'25vh', fontSize:'30px'}}></i>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button className='btn btn-warning rounded-pill' onClick={handleClose}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                </div>
                            </div>
                        </div>
                        
                    </div> 
                </div> 

            </div>
    </>
}
