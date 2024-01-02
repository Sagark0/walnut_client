import { Categories } from "../types";
import { red, pink, teal, blue, lime, green, purple, orange, brown, yellow } from "@mui/material/colors";
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import FlightIcon from '@mui/icons-material/Flight';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CloseIcon from '@mui/icons-material/Close';
import LiveTvIcon from '@mui/icons-material/LiveTv';

export const categories: Categories = {
    "uncategorised" : {
      category_label: "Uncategorised",
      category_id: "uncategorised",
      category_color: red[500],
      category_avatar: <PriorityHighIcon />,
    },
    "bills" : {
      category_label: "Bills",
      category_id: "bills",
      category_color: blue[500],
      category_avatar: <ReceiptLongIcon />,
    },
    "food" : {
      category_label: "Food & Drinks",
      category_id: "food",
      category_color: green[500],
      category_avatar: <FastfoodIcon />,
    },
    "emi" : {
      category_label: "EMI",
      category_id: "emi",
      category_color: purple[500],
      category_avatar: <DateRangeIcon />,
    },
    "grocery" : {
      category_label: "Grocery",
      category_id: "grocery",
      category_color: orange[500],
      category_avatar: <LocalGroceryStoreIcon />,
    },
    "fitness" : {
      category_label: "Fitness",
      category_id: "fitness",
      category_color: brown[500],
      category_avatar: <SportsGymnasticsIcon />,
    },
    "entertainment" : {
      category_label: "Entertainment",
      category_id: "entertainment",
      category_color: lime[500],
      category_avatar: <LiveTvIcon />,
    },
    "travel" : {
      category_label: "Travel",
      category_id: "travel",
      category_color: yellow[500],
      category_avatar: <FlightIcon />,
    },
    "fuel" : {
      category_label: "Fuel",
      category_id: "fuel",
      category_color: teal[500],
      category_avatar: <LocalGasStationIcon />,
    },
    "others" : {
      category_label: "Others",
      category_id: "others",
      category_color: pink[500],
      category_avatar: <MoreHorizIcon />,
    },
    "ignored" : {
      category_label: "Ignore",
      category_id: "ignored",
      category_color: red[500],
      category_avatar: <CloseIcon />,
    },
  };