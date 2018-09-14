import React from 'react';
import DeniReactTreeView from 'deni-react-treeview';

var documents = [
  {
    "children": [
      {
        "id": 1,
        "text": "Andorra",
        "isLeaf": true
      },
      {
        "id": 6,
        "text": "Albania",
        "isLeaf": true
      },
      {
        "id": 12,
        "text": "Austria",
        "isLeaf": true
      },
      {
        "id": 15,
        "text": "Åland",
        "isLeaf": true
      },
      {
        "id": 17,
        "text": "Bosnia and Herzegovina",
        "isLeaf": true
      },
      {
        "id": 20,
        "text": "Belgium",
        "isLeaf": true
      },
      {
        "id": 22,
        "text": "Bulgaria",
        "isLeaf": true
      },
      {
        "id": 36,
        "text": "Belarus",
        "isLeaf": true
      },
      {
        "id": 43,
        "text": "Switzerland",
        "isLeaf": true
      },
      {
        "id": 55,
        "text": "Cyprus",
        "isLeaf": true
      },
      {
        "id": 56,
        "text": "Czechia",
        "isLeaf": true
      },
      {
        "id": 57,
        "text": "Germany",
        "isLeaf": true
      },
      {
        "id": 59,
        "text": "Denmark",
        "isLeaf": true
      },
      {
        "id": 64,
        "text": "Estonia",
        "isLeaf": true
      },
      {
        "id": 68,
        "text": "Spain",
        "isLeaf": true
      },
      {
        "id": 70,
        "text": "Finland",
        "isLeaf": true
      },
      {
        "id": 74,
        "text": "Faroe Islands",
        "isLeaf": true
      },
      {
        "id": 75,
        "text": "France",
        "isLeaf": true
      },
      {
        "id": 77,
        "text": "United Kingdom",
        "isLeaf": true
      },
      {
        "id": 81,
        "text": "Guernsey",
        "isLeaf": true
      },
      {
        "id": 83,
        "text": "Gibraltar",
        "isLeaf": true
      },
      {
        "id": 89,
        "text": "Greece",
        "isLeaf": true
      },
      {
        "id": 98,
        "text": "Croatia",
        "isLeaf": true
      },
      {
        "id": 100,
        "text": "Hungary",
        "isLeaf": true
      },
      {
        "id": 102,
        "text": "Ireland",
        "isLeaf": true
      },
      {
        "id": 104,
        "text": "Isle of Man",
        "isLeaf": true
      },
      {
        "id": 109,
        "text": "Iceland",
        "isLeaf": true
      },
      {
        "id": 110,
        "text": "Italy",
        "isLeaf": true
      },
      {
        "id": 111,
        "text": "Jersey",
        "isLeaf": true
      },
      {
        "id": 129,
        "text": "Liechtenstein",
        "isLeaf": true
      },
      {
        "id": 133,
        "text": "Lithuania",
        "isLeaf": true
      },
      {
        "id": 134,
        "text": "Luxembourg",
        "isLeaf": true
      },
      {
        "id": 135,
        "text": "Latvia",
        "isLeaf": true
      },
      {
        "id": 138,
        "text": "Monaco",
        "isLeaf": true
      },
      {
        "id": 139,
        "text": "Moldova",
        "isLeaf": true
      },
      {
        "id": 140,
        "text": "Montenegro",
        "isLeaf": true
      },
      {
        "id": 144,
        "text": "Macedonia",
        "isLeaf": true
      },
      {
        "id": 153,
        "text": "Malta",
        "isLeaf": true
      },
      {
        "id": 166,
        "text": "Netherlands",
        "isLeaf": true
      },
      {
        "id": 167,
        "text": "Norway",
        "isLeaf": true
      },
      {
        "id": 179,
        "text": "Poland",
        "isLeaf": true
      },
      {
        "id": 184,
        "text": "Portugal",
        "isLeaf": true
      },
      {
        "id": 189,
        "text": "Romania",
        "isLeaf": true
      },
      {
        "id": 190,
        "text": "Serbia",
        "isLeaf": true
      },
      {
        "id": 191,
        "text": "Russia",
        "isLeaf": true
      },
      {
        "id": 197,
        "text": "Sweden",
        "isLeaf": true
      },
      {
        "id": 200,
        "text": "Slovenia",
        "isLeaf": true
      },
      {
        "id": 201,
        "text": "Svalbard and Jan Mayen",
        "isLeaf": true
      },
      {
        "id": 202,
        "text": "Slovakia",
        "isLeaf": true
      },
      {
        "id": 204,
        "text": "San Marino",
        "isLeaf": true
      },
      {
        "id": 230,
        "text": "Ukraine",
        "isLeaf": true
      },
      {
        "id": 236,
        "text": "Vatican City",
        "isLeaf": true
      },
      {
        "id": 245,
        "text": "Kosovo",
        "isLeaf": true
      }
    ],
    "id": 1,
    "text": "Europe"
  },
  {
    "children": [
      {
        "id": 2,
        "text": "United Arab Emirates",
        "isLeaf": true
      },
      {
        "id": 3,
        "text": "Afghanistan",
        "isLeaf": true
      },
      {
        "id": 7,
        "text": "Armenia",
        "isLeaf": true
      },
      {
        "id": 16,
        "text": "Azerbaijan",
        "isLeaf": true
      },
      {
        "id": 19,
        "text": "Bangladesh",
        "isLeaf": true
      },
      {
        "id": 23,
        "text": "Bahrain",
        "isLeaf": true
      },
      {
        "id": 28,
        "text": "Brunei",
        "isLeaf": true
      },
      {
        "id": 33,
        "text": "Bhutan",
        "isLeaf": true
      },
      {
        "id": 39,
        "text": "Cocos [Keeling] Islands",
        "isLeaf": true
      },
      {
        "id": 48,
        "text": "China",
        "isLeaf": true
      },
      {
        "id": 54,
        "text": "Christmas Island",
        "isLeaf": true
      },
      {
        "id": 79,
        "text": "Georgia",
        "isLeaf": true
      },
      {
        "id": 95,
        "text": "Hong Kong",
        "isLeaf": true
      },
      {
        "id": 101,
        "text": "Indonesia",
        "isLeaf": true
      },
      {
        "id": 103,
        "text": "Israel",
        "isLeaf": true
      },
      {
        "id": 105,
        "text": "India",
        "isLeaf": true
      },
      {
        "id": 106,
        "text": "British Indian Ocean Territory",
        "isLeaf": true
      },
      {
        "id": 107,
        "text": "Iraq",
        "isLeaf": true
      },
      {
        "id": 108,
        "text": "Iran",
        "isLeaf": true
      },
      {
        "id": 113,
        "text": "Jordan",
        "isLeaf": true
      },
      {
        "id": 114,
        "text": "Japan",
        "isLeaf": true
      },
      {
        "id": 116,
        "text": "Kyrgyzstan",
        "isLeaf": true
      },
      {
        "id": 117,
        "text": "Cambodia",
        "isLeaf": true
      },
      {
        "id": 121,
        "text": "North Korea",
        "isLeaf": true
      },
      {
        "id": 122,
        "text": "South Korea",
        "isLeaf": true
      },
      {
        "id": 123,
        "text": "Kuwait",
        "isLeaf": true
      },
      {
        "id": 125,
        "text": "Kazakhstan",
        "isLeaf": true
      },
      {
        "id": 126,
        "text": "Laos",
        "isLeaf": true
      },
      {
        "id": 127,
        "text": "Lebanon",
        "isLeaf": true
      },
      {
        "id": 130,
        "text": "Sri Lanka",
        "isLeaf": true
      },
      {
        "id": 146,
        "text": "Myanmar [Burma]",
        "isLeaf": true
      },
      {
        "id": 147,
        "text": "Mongolia",
        "isLeaf": true
      },
      {
        "id": 148,
        "text": "Macao",
        "isLeaf": true
      },
      {
        "id": 155,
        "text": "Maldives",
        "isLeaf": true
      },
      {
        "id": 158,
        "text": "Malaysia",
        "isLeaf": true
      },
      {
        "id": 168,
        "text": "Nepal",
        "isLeaf": true
      },
      {
        "id": 172,
        "text": "Oman",
        "isLeaf": true
      },
      {
        "id": 177,
        "text": "Philippines",
        "isLeaf": true
      },
      {
        "id": 178,
        "text": "Pakistan",
        "isLeaf": true
      },
      {
        "id": 183,
        "text": "Palestine",
        "isLeaf": true
      },
      {
        "id": 187,
        "text": "Qatar",
        "isLeaf": true
      },
      {
        "id": 193,
        "text": "Saudi Arabia",
        "isLeaf": true
      },
      {
        "id": 198,
        "text": "Singapore",
        "isLeaf": true
      },
      {
        "id": 212,
        "text": "Syria",
        "isLeaf": true
      },
      {
        "id": 218,
        "text": "Thailand",
        "isLeaf": true
      },
      {
        "id": 219,
        "text": "Tajikistan",
        "isLeaf": true
      },
      {
        "id": 222,
        "text": "Turkmenistan",
        "isLeaf": true
      },
      {
        "id": 225,
        "text": "Turkey",
        "isLeaf": true
      },
      {
        "id": 228,
        "text": "Taiwan",
        "isLeaf": true
      },
      {
        "id": 235,
        "text": "Uzbekistan",
        "isLeaf": true
      },
      {
        "id": 241,
        "text": "Vietnam",
        "isLeaf": true
      },
      {
        "id": 246,
        "text": "Yemen",
        "isLeaf": true
      }
    ],
    "id": 2,
    "text": "Asia"
  },
  {
    "children": [
      {
        "id": 4,
        "text": "Antigua and Barbuda",
        "isLeaf": true
      },
      {
        "id": 5,
        "text": "Anguilla",
        "isLeaf": true
      },
      {
        "id": 14,
        "text": "Aruba",
        "isLeaf": true
      },
      {
        "id": 18,
        "text": "Barbados",
        "isLeaf": true
      },
      {
        "id": 26,
        "text": "Saint Barthélemy",
        "isLeaf": true
      },
      {
        "id": 27,
        "text": "Bermuda",
        "isLeaf": true
      },
      {
        "id": 30,
        "text": "Bonaire",
        "isLeaf": true
      },
      {
        "id": 32,
        "text": "Bahamas",
        "isLeaf": true
      },
      {
        "id": 37,
        "text": "Belize",
        "isLeaf": true
      },
      {
        "id": 38,
        "text": "Canada",
        "isLeaf": true
      },
      {
        "id": 50,
        "text": "Costa Rica",
        "isLeaf": true
      },
      {
        "id": 51,
        "text": "Cuba",
        "isLeaf": true
      },
      {
        "id": 53,
        "text": "Curacao",
        "isLeaf": true
      },
      {
        "id": 60,
        "text": "Dominica",
        "isLeaf": true
      },
      {
        "id": 61,
        "text": "Dominican Republic",
        "isLeaf": true
      },
      {
        "id": 78,
        "text": "Grenada",
        "isLeaf": true
      },
      {
        "id": 84,
        "text": "Greenland",
        "isLeaf": true
      },
      {
        "id": 87,
        "text": "Guadeloupe",
        "isLeaf": true
      },
      {
        "id": 91,
        "text": "Guatemala",
        "isLeaf": true
      },
      {
        "id": 97,
        "text": "Honduras",
        "isLeaf": true
      },
      {
        "id": 99,
        "text": "Haiti",
        "isLeaf": true
      },
      {
        "id": 112,
        "text": "Jamaica",
        "isLeaf": true
      },
      {
        "id": 120,
        "text": "Saint Kitts and Nevis",
        "isLeaf": true
      },
      {
        "id": 124,
        "text": "Cayman Islands",
        "isLeaf": true
      },
      {
        "id": 128,
        "text": "Saint Lucia",
        "isLeaf": true
      },
      {
        "id": 141,
        "text": "Saint Martin",
        "isLeaf": true
      },
      {
        "id": 150,
        "text": "Martinique",
        "isLeaf": true
      },
      {
        "id": 152,
        "text": "Montserrat",
        "isLeaf": true
      },
      {
        "id": 157,
        "text": "Mexico",
        "isLeaf": true
      },
      {
        "id": 165,
        "text": "Nicaragua",
        "isLeaf": true
      },
      {
        "id": 173,
        "text": "Panama",
        "isLeaf": true
      },
      {
        "id": 180,
        "text": "Saint Pierre and Miquelon",
        "isLeaf": true
      },
      {
        "id": 182,
        "text": "Puerto Rico",
        "isLeaf": true
      },
      {
        "id": 210,
        "text": "El Salvador",
        "isLeaf": true
      },
      {
        "id": 211,
        "text": "Sint Maarten",
        "isLeaf": true
      },
      {
        "id": 214,
        "text": "Turks and Caicos Islands",
        "isLeaf": true
      },
      {
        "id": 226,
        "text": "Trinidad and Tobago",
        "isLeaf": true
      },
      {
        "id": 233,
        "text": "United States",
        "isLeaf": true
      },
      {
        "id": 237,
        "text": "Saint Vincent and the Grenadines",
        "isLeaf": true
      },
      {
        "id": 239,
        "text": "British Virgin Islands",
        "isLeaf": true
      },
      {
        "id": 240,
        "text": "U.S. Virgin Islands",
        "isLeaf": true
      }
    ],
    "id": 3,
    "text": "North America"
  },
  {
    "children": [
      {
        "id": 8,
        "text": "Angola",
        "isLeaf": true
      },
      {
        "id": 21,
        "text": "Burkina Faso",
        "isLeaf": true
      },
      {
        "id": 24,
        "text": "Burundi",
        "isLeaf": true
      },
      {
        "id": 25,
        "text": "Benin",
        "isLeaf": true
      },
      {
        "id": 35,
        "text": "Botswana",
        "isLeaf": true
      },
      {
        "id": 40,
        "text": "Democratic Republic of the Congo",
        "isLeaf": true
      },
      {
        "id": 41,
        "text": "Central African Republic",
        "isLeaf": true
      },
      {
        "id": 42,
        "text": "Republic of the Congo",
        "isLeaf": true
      },
      {
        "id": 44,
        "text": "Ivory Coast",
        "isLeaf": true
      },
      {
        "id": 47,
        "text": "Cameroon",
        "isLeaf": true
      },
      {
        "id": 52,
        "text": "Cape Verde",
        "isLeaf": true
      },
      {
        "id": 58,
        "text": "Djibouti",
        "isLeaf": true
      },
      {
        "id": 62,
        "text": "Algeria",
        "isLeaf": true
      },
      {
        "id": 65,
        "text": "Egypt",
        "isLeaf": true
      },
      {
        "id": 66,
        "text": "Western Sahara",
        "isLeaf": true
      },
      {
        "id": 67,
        "text": "Eritrea",
        "isLeaf": true
      },
      {
        "id": 69,
        "text": "Ethiopia",
        "isLeaf": true
      },
      {
        "id": 76,
        "text": "Gabon",
        "isLeaf": true
      },
      {
        "id": 82,
        "text": "Ghana",
        "isLeaf": true
      },
      {
        "id": 85,
        "text": "Gambia",
        "isLeaf": true
      },
      {
        "id": 86,
        "text": "Guinea",
        "isLeaf": true
      },
      {
        "id": 88,
        "text": "Equatorial Guinea",
        "isLeaf": true
      },
      {
        "id": 93,
        "text": "Guinea-Bissau",
        "isLeaf": true
      },
      {
        "id": 115,
        "text": "Kenya",
        "isLeaf": true
      },
      {
        "id": 119,
        "text": "Comoros",
        "isLeaf": true
      },
      {
        "id": 131,
        "text": "Liberia",
        "isLeaf": true
      },
      {
        "id": 132,
        "text": "Lesotho",
        "isLeaf": true
      },
      {
        "id": 136,
        "text": "Libya",
        "isLeaf": true
      },
      {
        "id": 137,
        "text": "Morocco",
        "isLeaf": true
      },
      {
        "id": 142,
        "text": "Madagascar",
        "isLeaf": true
      },
      {
        "id": 145,
        "text": "Mali",
        "isLeaf": true
      },
      {
        "id": 151,
        "text": "Mauritania",
        "isLeaf": true
      },
      {
        "id": 154,
        "text": "Mauritius",
        "isLeaf": true
      },
      {
        "id": 156,
        "text": "Malawi",
        "isLeaf": true
      },
      {
        "id": 159,
        "text": "Mozambique",
        "isLeaf": true
      },
      {
        "id": 160,
        "text": "Namibia",
        "isLeaf": true
      },
      {
        "id": 162,
        "text": "Niger",
        "isLeaf": true
      },
      {
        "id": 164,
        "text": "Nigeria",
        "isLeaf": true
      },
      {
        "id": 188,
        "text": "Réunion",
        "isLeaf": true
      },
      {
        "id": 192,
        "text": "Rwanda",
        "isLeaf": true
      },
      {
        "id": 195,
        "text": "Seychelles",
        "isLeaf": true
      },
      {
        "id": 196,
        "text": "Sudan",
        "isLeaf": true
      },
      {
        "id": 199,
        "text": "Saint Helena",
        "isLeaf": true
      },
      {
        "id": 203,
        "text": "Sierra Leone",
        "isLeaf": true
      },
      {
        "id": 205,
        "text": "Senegal",
        "isLeaf": true
      },
      {
        "id": 206,
        "text": "Somalia",
        "isLeaf": true
      },
      {
        "id": 208,
        "text": "South Sudan",
        "isLeaf": true
      },
      {
        "id": 209,
        "text": "São Tomé and Príncipe",
        "isLeaf": true
      },
      {
        "id": 213,
        "text": "Swaziland",
        "isLeaf": true
      },
      {
        "id": 215,
        "text": "Chad",
        "isLeaf": true
      },
      {
        "id": 217,
        "text": "Togo",
        "isLeaf": true
      },
      {
        "id": 223,
        "text": "Tunisia",
        "isLeaf": true
      },
      {
        "id": 229,
        "text": "Tanzania",
        "isLeaf": true
      },
      {
        "id": 231,
        "text": "Uganda",
        "isLeaf": true
      },
      {
        "id": 247,
        "text": "Mayotte",
        "isLeaf": true
      },
      {
        "id": 248,
        "text": "South Africa",
        "isLeaf": true
      },
      {
        "id": 249,
        "text": "Zambia",
        "isLeaf": true
      },
      {
        "id": 250,
        "text": "Zimbabwe",
        "isLeaf": true
      }
    ],
    "id": 4,
    "text": "Africa"
  },
  {
    "children": [
      {
        "id": 9,
        "text": "Antarctica",
        "isLeaf": true
      },
      {
        "id": 34,
        "text": "Bouvet Island",
        "isLeaf": true
      },
      {
        "id": 90,
        "text": "South Georgia and the South Sandwich Islands",
        "isLeaf": true
      },
      {
        "id": 96,
        "text": "Heard Island and McDonald Islands",
        "isLeaf": true
      },
      {
        "id": 216,
        "text": "French Southern Territories",
        "isLeaf": true
      }
    ],
    "id": 5,
    "text": "Antarctica"
  },
  {
    "children": [
      {
        "id": 10,
        "text": "Argentina",
        "isLeaf": true
      },
      {
        "id": 29,
        "text": "Bolivia",
        "isLeaf": true
      },
      {
        "id": 31,
        "text": "Brazil",
        "isLeaf": true
      },
      {
        "id": 46,
        "text": "Chile",
        "isLeaf": true
      },
      {
        "id": 49,
        "text": "Colombia",
        "isLeaf": true
      },
      {
        "id": 63,
        "text": "Ecuador",
        "isLeaf": true
      },
      {
        "id": 72,
        "text": "Falkland Islands",
        "isLeaf": true
      },
      {
        "id": 80,
        "text": "French Guiana",
        "isLeaf": true
      },
      {
        "id": 94,
        "text": "Guyana",
        "isLeaf": true
      },
      {
        "id": 174,
        "text": "Peru",
        "isLeaf": true
      },
      {
        "id": 186,
        "text": "Paraguay",
        "isLeaf": true
      },
      {
        "id": 207,
        "text": "Suriname",
        "isLeaf": true
      },
      {
        "id": 234,
        "text": "Uruguay",
        "isLeaf": true
      },
      {
        "id": 238,
        "text": "Venezuela",
        "isLeaf": true
      }
    ],
    "id": 6,
    "text": "South America"
  },
  {
    "children": [
      {
        "id": 11,
        "text": "American Samoa",
        "isLeaf": true
      },
      {
        "id": 13,
        "text": "Australia",
        "isLeaf": true
      },
      {
        "id": 45,
        "text": "Cook Islands",
        "isLeaf": true
      },
      {
        "id": 71,
        "text": "Fiji",
        "isLeaf": true
      },
      {
        "id": 73,
        "text": "Micronesia",
        "isLeaf": true
      },
      {
        "id": 92,
        "text": "Guam",
        "isLeaf": true
      },
      {
        "id": 118,
        "text": "Kiribati",
        "isLeaf": true
      },
      {
        "id": 143,
        "text": "Marshall Islands",
        "isLeaf": true
      },
      {
        "id": 149,
        "text": "Northern Mariana Islands",
        "isLeaf": true
      },
      {
        "id": 161,
        "text": "New Caledonia",
        "isLeaf": true
      },
      {
        "id": 163,
        "text": "Norfolk Island",
        "isLeaf": true
      },
      {
        "id": 169,
        "text": "Nauru",
        "isLeaf": true
      },
      {
        "id": 170,
        "text": "Niue",
        "isLeaf": true
      },
      {
        "id": 171,
        "text": "New Zealand",
        "isLeaf": true
      },
      {
        "id": 175,
        "text": "French Polynesia",
        "isLeaf": true
      },
      {
        "id": 176,
        "text": "Papua New Guinea",
        "isLeaf": true
      },
      {
        "id": 181,
        "text": "Pitcairn Islands",
        "isLeaf": true
      },
      {
        "id": 185,
        "text": "Palau",
        "isLeaf": true
      },
      {
        "id": 194,
        "text": "Solomon Islands",
        "isLeaf": true
      },
      {
        "id": 220,
        "text": "Tokelau",
        "isLeaf": true
      },
      {
        "id": 221,
        "text": "East Timor",
        "isLeaf": true
      },
      {
        "id": 224,
        "text": "Tonga",
        "isLeaf": true
      },
      {
        "id": 227,
        "text": "Tuvalu",
        "isLeaf": true
      },
      {
        "id": 232,
        "text": "U.S. Minor Outlying Islands",
        "isLeaf": true
      },
      {
        "id": 242,
        "text": "Vanuatu",
        "isLeaf": true
      },
      {
        "id": 243,
        "text": "Wallis and Futuna",
        "isLeaf": true
      },
      {
        "id": 244,
        "text": "Samoa",
        "isLeaf": true
      }
    ],
    "id": 7,
    "text": "Oceania"
  }
];

function DocumentTree () {
    return <DeniReactTreeView/>;
    
};

export default DocumentTree;