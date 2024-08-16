import React, { ReactNode, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {
  Backdrop,
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  Paper,
  SelectChangeEvent,
  styled,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import RefreshIcon from '@mui/icons-material/Refresh';
import TablePagination from '@mui/material/TablePagination';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { CiFilter } from 'react-icons/ci';
import IconButton from '@mui/material/IconButton';
import Deliveroo from '@/assets/icons/Deliveroo.svg';
import UberEats from '@/assets/icons/uber.svg';
import JustEat from '@/assets/icons/just-eat.svg';
import Drawer from '@mui/material/Drawer';
import { MdFastfood } from 'react-icons/md';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { GoPencil } from 'react-icons/go';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { DialogActions, DialogTitle } from '@mui/material';
import { FormControl } from '@mui/material';
import { RiCalendarScheduleLine } from 'react-icons/ri';
import { MdOutlineSubdirectoryArrowRight } from 'react-icons/md';
import '@/assets/scss/order/tableStyle.css';
import { AlertState } from '@/themes/AppThemeProvider';
import Menu from '@mui/material/Menu';
import { IoIosCall } from 'react-icons/io';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { FaCircle } from 'react-icons/fa';
import AnimatedButton from '@/components/AnimatedButton';
import deliveroo from '@/assets/icons/Deliveroo.png';
//<IoCheckmarkCircleOutline />
//<IoIosCloseCircleOutline />
interface Order {
  order_commission: string;
  delivery_charge: string;
  driver_id: null;
  driver_name: ReactNode;
  dispatch_id: ReactNode;
  temp_order: boolean | number;
  order_id: number;
  order_date: string | number | Date;
  order_time: any;
  total_order_amount: string;
  delivery_mode:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | null
    | undefined;
  order_status:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | null
    | undefined;
  source_image: string;
  order_type_id: any;
  customer_paid_status: boolean;
  sos_order_number: string | number;
}

interface OrderDetails {
  order_type: any;
  order_time: ReactNode;
  prepare_for: ReactNode;
  customer_paid_status: any;
  restaurant: any;
  subtotal_amount: ReactNode;
  order_id: number;
  order_date: string;
  customer: {
    customer_name: string;
    email_address: string;
    contact_number: string;
  };
  total_order_amount: string;
  order_status: {
    order_status: string;
  };
  source_image: string;
  items: {
    item_name: string;
    quantity: number;
    unit_price: number;
    item_total: number;
  }[];
  notes: {
    cutlery_notes: string;
  };
}
[];

interface Item {
  modifier_total: any;
  modifiers: any;
  item_name: string;
  quantity: number;
  unit_price: string;
  item_total: string;
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${theme.palette.mode === 'light' ? 'head' : 'root'} `]: {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : '#fff',
    color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
  },
  [`&.${theme.palette.mode === 'light' ? 'body' : 'root'}`]: {
    fontSize: 14,
  },
  //tienen que tener la misma altura
  '&:first-child': {
    width: '20%',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  //hde all borders
  '& td, & th': {
    border: 'none',
  },
}));

import getAllDeliveriesAPI from '@/services/order/API/getAllDeliveries';
import getTempOrdersAPI from '@/services/order/API/getTempOrders';
import getOrdersAPI from '@/services/order/API/getOrders';
import getOrderDetailsAPI from '@/services/order/API/getOrderDetails';
import acceptOrderAPI from '@/services/order/API/acceptOrder';
import rejectOrderAPI from '@/services/order/API/rejectOrder';
import updateOrderStatusAPI from '@/services/order/API/updateOrderStatus';
import setPrepTimeAPI from '@/services/order/API/setPrepTime';
import getDeliveryCountAPI from '@/services/order/API/getDeliveryCount';

import { Filter } from '@mui/icons-material';
import { parseString } from '@/utils';
import { dateConversion } from '@/utils/dateUtils';


const OrderTable: React.FC = () => {
  const [activePage, setActivePage] = useState(0);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [totalNumberOfOrders, setTotalNumberOfOrders] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [orders, setOrders] = useState<any>([]);
  const [orderDetails, setOrderDetails] = useState<any>({});
  const [orderSource, setOrderSource] = useState('');
  const [activeTab, setActiveTab] = useState<string>('driver_waiting');

  const [allDeliveryCount, setAllDeliveryCount] = useState(0);
  const [driverWaitingCount, setDeiverWaitingCount] = useState(0);
  const [driverAssignedCount, setDriverAssignedCount] = useState(0);
  const [inTransitCount, setInTransitCount] = useState(0);
  const [deliveredCount, setDeliveredCount] = useState(0);

  const [selectedMenuValue, setSelectedMenuValue] = useState('');
  const [selectedPrepTime, setSelectedPrepTime] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [rejectNote, setRejectNote] = useState('');

  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [filterPaymentStatus, setFilterPaymentStatus] = useState('');
  const [filterDeliveryFeePaymentStatus, setFilterDeliveryFeePaymentStatus] = useState('');
  const [filterAggregator, setFilterAggregator] = useState('');
  const [filterDriverName, setFilterDriverName] = useState('');
  const [filterLocation, setFilterLocation] = useState<string[]>([]);

  const [tempFilterStartDate, setTempFilterStartDate] = useState('');
  const [tempFilterEndDate, setTempFilterEndDate] = useState('');
  const [tempFilterPaymentStatus, setTempFilterPaymentStatus] = useState('');
  const [tempFilterDeliveryFeePaymentStatus, setTempFilterDeliveryFeePaymentStatus] = useState('');
  const [tempFilterAggregator, setTempFilterAggregator] = useState('');
  const [tempFilterDriverName, setTempFilterDriverName] = useState('');
  const [tempFilterLocation, setTempFilterLocation] = useState('');

  const adjustedPage = totalNumberOfOrders === 0 ? 0 : activePage;

  // Adjust rowsPerPage to show all items if totalNumberOfOrders is selected
  const adjustedRowsPerPage = rowsPerPage === -1 ? totalNumberOfOrders : rowsPerPage;

  const rowsPerPageOptions = totalNumberOfOrders === 0
  ? [5, 10, 25]
  : [5, 10, 25, { label: 'All', value: totalNumberOfOrders }];

  const [openDrawerId, setOpenDrawerId] = useState(null);
  // Función para abrir o cerrar el Drawer de una fila específica
  const toggleDrawer1 = (index) => {
    setOpen(false);
    setOpenDrawerId(openDrawerId === index ? null : index);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const filterOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { mutate: getAllDeliveriesAPICall } = getAllDeliveriesAPI();
  const { mutate: getTempOrdersCall } = getTempOrdersAPI();
  const { mutate: getOrdersCall } = getOrdersAPI();
  const { mutate: getOrderDetailsCall } = getOrderDetailsAPI();
  const { mutate: acceptOrderCall } = acceptOrderAPI();
  const { mutate: rejectOrderCall } = rejectOrderAPI();
  const { mutate: updateOrderStatusCall } = updateOrderStatusAPI();
  const { mutate: setPrepTimeCall } = setPrepTimeAPI();
  const { mutate: getDeliveryCountCall } = getDeliveryCountAPI();

  const printOrder = () => {
    console.log(orderDetails);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Order</title>
            <style>
            @font-face {
                font-family: "CircularStd-Book";
                src: url("../assets/fonts/Circular/CircularStd-Book.otf") format("truetype");
            }
            body {
                width: 302px;
                padding: 5px;
                border: grey 1px solid;
                font-family: "Arial", sans-serif;
            }
            h1 {
                font-weight: bold;
            }
            p {
                margin: 0;
            }
            </style>
        </head>
        <body>
            <h1 style="position: relative; top: -25px">Grauns</h1>
            <div style="position: relative; top: -45px; font-size: small">
                <p>NO: 4A Parson Street, Banbury, Oxfordshire, England, OX16 5LW.</p>
                <p>VAT NUMBER: 425864770</p>
            </div>
        
            <div
            style="
                background-color: #0000001a;
                padding: 20px;
                display: flex;
                justify-content: space-between;
                font-size: larger;
                position: relative;
                top: -40px;
            "
            >
            <p>Order ID: ${orderDetails.order_id}</p>
            <p>${orderDetails.order_source.order_source}</p>
            </div>
        
            <div style="position: relative; top: -30px; font-size: small">
                <p>Order received:
                ${dateConversion(orderDetails.order_date, orderDetails.order_time)}
                </p>
                <p>Start Preparation time: ${new Date(orderDetails.start_preparing_at).toLocaleString('en-US', {
                  month: 'numeric',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: false,
                })}</p>
                <p>Estimated delivery time: ${new Date(orderDetails.prepare_for).toLocaleString('en-US', {
                  month: 'numeric',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: false,
                })}</p>
            </div>
        
            <div style="position: relative; top: -20px">
            <p style="background-color: #0000001a; padding: 5px; font-weight: bold; margin-bottom: 10px;">
                Items
            </p>
            <div style="font-size: small">
                ${orderDetails.items
                  .map(
                    (item: Item) => `
                    <div style="display: flex; justify-content: space-between">
                        <p style="font-weight: bold">${item.quantity} x ${item.item_name}</p>
                        <p>${(parseFloat(item.unit_price) / 100).toFixed(2)}</p>
                    </div>
                    ${item.modifiers
                      .map(
                        (modifier: Item) => `
                        <div style="display: flex; justify-content: space-between">
                            <p style="margin-left: 10px">${modifier.quantity} x ${modifier.item_name}</p>
                            <p>${parseFloat(
                              (parseFloat(modifier.unit_price) / 100).toFixed(2),
                            )}</p>                               
                        </div>
                    `,
                      )
                      .join('')}
                `,
                  )
                  .join('')}
            </div>
            </div>
        
            <div
            style="border-bottom: black 1px solid; position: relative; top: -10px"
            ></div>
        
            <div style="font-size: small">
            <div style="display: flex; justify-content: space-between">
                <p>Subtotal</p>
                <p>${(parseFloat(orderDetails.subtotal_amount) / 100).toFixed(2)}</p>
            </div>
            <div style="display: flex; justify-content: space-between">
                <p>Delivery fee</p>
                <p>${parseFloat(orderDetails.order_commission?.order_commission || 0) / 100}</p>
            </div>
            <!-- Add other fee details here -->
            <div style="display: flex; justify-content: space-between; font-weight: bold">
                <p>Amount</p>
                <p>£${(parseFloat(orderDetails.total_order_amount) / 100).toFixed(2)}</p>
            </div>
            </div>
        
            <div
            style="
                background-color: #0000001a;
                padding: 5px;
                font-size: small;
                margin-top: 10px;
                margin-bottom: 10px;
            "
            >
            <p style="font-weight: bold">Special Instructions</p>
            <p>Order Note: ${orderDetails.notes?.order_notes || 'N/A'}</p>
            <p>Order Note: ${orderDetails.notes.cutlery_notes}</p>
            </div>
        
            <div style="font-size: small">
            <div style="display: flex">
                <p style="font-weight: bold">Customer Name:</p>
                <p style="margin-left: 5px">${orderDetails.customer.customer_name}</p>
            </div>
            <p style="font-weight: bold">Delivery address</p>
            ${
              Object.keys(orderDetails.address).length !== 0
                ? `<p>${orderDetails.address.line1}, ${orderDetails.address.line2}, ${orderDetails.address.city} ${orderDetails.address.postcode}</p>`
                : `<p>N/A</p>`
            }
            <p>Phone: ${orderDetails.customer.contact_number}</p>
            <p>Email: ${orderDetails.customer?.email_address || 'N/A'}</p>
        
            <div style="border-bottom: black 1px solid; margin-top: 10px;"></div>
            <p style="text-align: center; margin-top: 5px;">Thank you for ordering with us</p>
            </div>
        </body>
        </html>
        `);

      printWindow.document.close();
      printWindow.print();
    }
  };

  const orderStatusList: Record<string, string> = {
    driver_assigned: 'waiting for prep',
    in_transit: 'in prep',
    delivered: 'ready for collection',
    collected: 'collected',
    rejected: 'rejected',
    cancelled: 'cancelled',
  };

  const [validationError, setValidationError] = useState('');

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    if (newStartDate && tempFilterEndDate && new Date(newStartDate) > new Date(tempFilterEndDate)) {
      setValidationError('Start date cannot be later than end date');
      setTempFilterStartDate('');
      setTempFilterEndDate('');
    } else {
      setValidationError('');
    }
    setTempFilterStartDate(newStartDate);
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    console.log(tempFilterStartDate)
    if (tempFilterStartDate && newEndDate && new Date(tempFilterStartDate) > new Date(newEndDate)) {
      setValidationError('End date cannot be earlier than start date');
      setTempFilterStartDate('');
      setTempFilterEndDate('');
    } else {
      setValidationError('');
    }
    setTempFilterEndDate(newEndDate);
  };

  const fetchOrders = async () => {
    try {
      const payload: any = {
        pageNumber: activePage + 1,
        recordsPerPage: rowsPerPage,
      };

      if (activeTab == 'all_deliveries') {
        if (filterPaymentStatus) {
          payload.customer_paid_status = filterPaymentStatus === 'paid';
        }

        if (filterAggregator) {
          payload.order_source = filterAggregator;
        }

        if (filterStartDate && filterEndDate) {
          payload.orderDate = {
            from: filterStartDate,
            to: filterEndDate,
          };
        }

        if (filterDriverName) {
          payload.driver_name = filterDriverName;
        }

        if (filterDeliveryFeePaymentStatus) {
          // payload.driver_name = filterDriverName
        }

        if (filterLocation.length !== 0) {
          payload.postalCodes = filterLocation;
        }

        getAllDeliveriesAPICall(payload, {
          onSuccess: (data) => {
            setOrders(data.data);
            console.log(data.data);
            setTotalNumberOfPages(data.totalPages);
            setTotalNumberOfOrders(parseInt(data.totalCount));
            setAllDeliveryCount(parseInt(data.totalCount));
          },
          onError: (error) => {
            // Handle error
            console.error('Error:', error);
            throw new Error('Failed to fetch orders');
          },
        });
      } else if (activeTab == 'driver_waiting') {
        //filters:
        if (filterPaymentStatus) {
          payload.customer_paid_status = filterPaymentStatus === 'paid';
        }

        if (filterAggregator) {
          payload.order_source = filterAggregator;
        }

        if (filterStartDate && filterEndDate) {
          payload.orderDate = {
            from: filterStartDate,
            to: filterEndDate,
          };
        }

        if (filterDriverName) {
          payload.driver_name = filterDriverName;
        }

        if (filterDeliveryFeePaymentStatus) {
          // payload.driver_name = filterDriverName
        }

        if (filterLocation.length !== 0) {
          payload.postalCodes = filterLocation;
        }

        if (filterDeliveryFeePaymentStatus) {
          // payload.driver_name = filterDriverName
        }

        if (filterLocation.length !== 0) {
          payload.postalCodes = filterLocation;
        }

        payload.order_status = 'ready for deliver';
        payload.driver_id = null;
        getOrdersCall(payload, {
          onSuccess: (data) => {
            // Handle successful response
            console.log('Response:', data);
            setOrders(data.data);
            setTotalNumberOfPages(data.totalPages);
            setTotalNumberOfOrders(parseInt(data.totalCount));
            setDeiverWaitingCount(parseInt(data.totalCount));
          },
          onError: (error) => {
            // Handle error
            console.error('Error:', error);
            throw new Error('Failed to fetch orders');
          },
        });
      } else if (activeTab == 'driver_assigned') {
        //filters:
        if (filterPaymentStatus) {
          payload.customer_paid_status = filterPaymentStatus === 'paid';
        }

        if (filterAggregator) {
          payload.order_source = filterAggregator;
        }

        if (filterStartDate && filterEndDate) {
          payload.orderDate = {
            from: filterStartDate,
            to: filterEndDate,
          };
        }

        if (filterDriverName) {
          payload.driver_name = filterDriverName;
        }

        if (filterDeliveryFeePaymentStatus) {
          // payload.driver_name = filterDriverName
        }

        if (filterLocation.length !== 0) {
          payload.postalCodes = filterLocation;
        }

        if (filterDeliveryFeePaymentStatus) {
          // payload.driver_name = filterDriverName
        }

        if (filterLocation.length !== 0) {
          payload.postalCodes = filterLocation;
        }

        payload.order_status = 'ready for deliver';
        payload.driver_id = 'not_null';
        getOrdersCall(payload, {
          onSuccess: (data) => {
            // Handle successful response
            console.log('Response:', data);
            setOrders(data.data);
            setTotalNumberOfPages(data.totalPages);
            setTotalNumberOfOrders(parseInt(data.totalCount));
            setDriverAssignedCount(parseInt(data.totalCount));
          },
          onError: (error) => {
            // Handle error
            console.error('Error:', error);
            throw new Error('Failed to fetch orders');
          },
        });
      } else if (activeTab == 'in_transit') {
        //filters:
        if (filterPaymentStatus) {
          payload.customer_paid_status = filterPaymentStatus === 'paid';
        }

        if (filterDriverName) {
          payload.driver_name = filterDriverName;
        }

        if (filterAggregator) {
          payload.order_source = filterAggregator;
        }

        if (filterStartDate && filterEndDate) {
          payload.orderDate = {
            from: filterStartDate,
            to: filterEndDate,
          };
        }

        if (filterDeliveryFeePaymentStatus) {
          // payload.driver_name = filterDriverName
        }

        if (filterLocation.length !== 0) {
          payload.postalCodes = filterLocation;
        }

        payload.order_status = 'in transit';
        getOrdersCall(payload, {
          onSuccess: (data) => {
            // Handle successful response
            console.log('Response:', data);
            setOrders(data.data);
            setTotalNumberOfPages(data.totalPages);
            setTotalNumberOfOrders(parseInt(data.totalCount));
            setInTransitCount(parseInt(data.totalCount));
          },
          onError: (error) => {
            // Handle error
            console.error('Error:', error);
            throw new Error('Failed to fetch orders');
          },
        });
      } else if (activeTab == 'delivered') {
        //filters:
        if (filterPaymentStatus) {
          payload.customer_paid_status = filterPaymentStatus === 'paid';
        }

        if (filterDriverName) {
          payload.driver_name = filterDriverName;
        }

        if (filterAggregator) {
          payload.order_source = filterAggregator;
        }

        if (filterStartDate && filterEndDate) {
          payload.orderDate = {
            from: filterStartDate,
            to: filterEndDate,
          };
        }

        if (filterDeliveryFeePaymentStatus) {
          // payload.driver_name = filterDriverName
        }

        if (filterLocation.length !== 0) {
          payload.postalCodes = filterLocation;
        }

        payload.order_status = 'delivered';
        getOrdersCall(payload, {
          onSuccess: (data) => {
            // Handle successful response
            console.log('Response:', data);
            setOrders(data.data);
            setTotalNumberOfPages(data.totalPages);
            setTotalNumberOfOrders(parseInt(data.totalCount));
            setDeliveredCount(parseInt(data.totalCount));
          },
          onError: (error) => {
            // Handle error
            console.error('Error:', error);
            throw new Error('Failed to fetch orders');
          },
        });
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  const fetchOrderCount = async () => {
    try {
      const payload: any = {
      };

      if (filterPaymentStatus) {
        payload.customer_paid_status = filterPaymentStatus === 'paid';
      }

      if (filterAggregator) {
        payload.order_source = filterAggregator;
      }

      if (filterStartDate && filterEndDate) {
        payload.orderDate = {
          from: filterStartDate,
          to: filterEndDate,
        };
      }

      if (filterDriverName) {
        payload.driver_name = filterDriverName;
      }

      if (filterDeliveryFeePaymentStatus) {
        // payload.driver_name = filterDriverName
      }

      if (filterLocation.length !== 0) {
        payload.postalCodes = filterLocation;
      }

      getDeliveryCountCall(payload, {
        onSuccess: (data) => {
          const count = data.data;
          setDeiverWaitingCount(count.driver_waiting);
          setDriverAssignedCount(count.driver_assigned);
          setInTransitCount(count.in_transit);
          setDeliveredCount(count.delivered);
          setAllDeliveryCount(count.allDeliveryCount);
        },
        onError: (error) => {
          // Handle error
          console.error('Error:', error);
          throw new Error('Failed to fetch orders');
        },
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  function toCapitalize(name: any) {
    return name
      .trim()
      .toLowerCase()
      .split(' ')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)) 
      .join(' ');
  }

  const setFilters = () => {
    setFilterStartDate(tempFilterStartDate);
    setFilterEndDate(tempFilterEndDate);
    setFilterPaymentStatus(tempFilterPaymentStatus);
    setFilterDeliveryFeePaymentStatus(tempFilterDeliveryFeePaymentStatus);
    setFilterAggregator(tempFilterAggregator);

    const formattedName = toCapitalize(tempFilterDriverName);
    setFilterDriverName(formattedName);

    if (tempFilterLocation != '') {
      const locationArray = tempFilterLocation.split(',').map((loc) => loc.trim());
      setFilterLocation(locationArray);
    }

    handleClose();
  };

  const clearFilters = () => {
    setTempFilterStartDate('');
    setTempFilterEndDate('');
    setTempFilterPaymentStatus('');
    setTempFilterDeliveryFeePaymentStatus('');
    setTempFilterAggregator('');
    setTempFilterDriverName('');
    setTempFilterLocation('');

    setFilterStartDate('');
    setFilterEndDate('');
    setFilterPaymentStatus('');
    setFilterDeliveryFeePaymentStatus('');
    setFilterAggregator('');
    setFilterDriverName('');
    setFilterLocation([]);
  };

  const formatCount = (count) => {
    return count < 10 ? `${count}` : count;
  };
  
  const tabs = [
    { id: 'all_deliveries', label: 'All Deliveries', count: formatCount(allDeliveryCount) },
    { id: 'driver_waiting', label: 'Driver Waiting', count: formatCount(driverWaitingCount) },
    { id: 'driver_assigned', label: 'Driver Assigned', count: formatCount(driverAssignedCount) },
    { id: 'in_transit', label: 'In Transit', count: formatCount(inTransitCount) },
    { id: 'delivered', label: 'Delivered', count: formatCount(deliveredCount) },
  ];
  
  const renderTabs = () => {
    return tabs.map((tab) => (
      <Grid
        item
        xs={tab.id === 'in_transit' ? 1 : 2} // Adjust width based on tab id
        key={tab.id}
        style={{
          borderBottom: activeTab === tab.id ? '3px solid black' : 'none',
          position: 'relative',
          textAlign: 'center',
        }}
      >
        <button
          style={{
            position: 'relative',
            backgroundColor: 'transparent',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            fontSize: 15,
            fontWeight: activeTab === tab.id ? '600' : '400',
            color: activeTab === tab.id ? 'black' : '#544d4b',
            borderRadius: '5px',
            transition: 'color 0.3s ease, font-weight 0.3s ease',
            outline: 'none',
          }}
          onClick={() => handleTabChange(tab.id)}
        >
          <div
            style={{
              backgroundColor: 'red',
              color: 'white',
              width: '23px',
              height: '20px',
              borderRadius: '60%',
              textAlign: 'center',
              position: 'absolute',
              top: '-12px',
              left: '85%',
              fontSize: 15,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {tab.count}
          </div>
          {tab.label}
        </button>
      </Grid>
    ));
  };

  const showOrderDetail = async (orderId: number | boolean, temp_order: boolean) => {
    if (!orderId) {
      console.log('something went wrong with show order details');
    }

    if (temp_order) {
      getTempOrdersCall(
        {
          temp_order_id: orderId,
        },
        {
          onSuccess: (data) => {
            console.log('Response:', data);
            const tempData = data.data[0];
            const dmsOrderObject = tempData.dms_order_object;
            const {
              order_id,
              order_source_id,
              aggregator_order_number,
              order_date,
              order_time,
              total_price,
              sub_total,
              delivery_fee,
              offer_discount,
              bag_fee,
              cash_due,
              order_type_id,
              customer_paid_status,
              delivery_mode,
              items,
              customer,
              address,
              notes,
              asap,
              start_preparing_at,
              prepare_for,
              deliver_by,
            } = dmsOrderObject;

            const orderObject = {
              temp_order_id: tempData.temp_order_id,
              order_id,
              source_id: order_source_id,
              sos_order_number: aggregator_order_number,
              order_date,
              order_time,
              total_order_amount: total_price,
              subtotal_amount: sub_total.toFixed(2),
              delivery_charge: delivery_fee.toFixed(2),
              bag_fee: bag_fee ? bag_fee.toFixed(2) : null,
              discounts: offer_discount.toFixed(2),
              start_preparing_at,
              prepare_for,
              deliver_by,
              notes: {
                order_notes: notes.order_notes,
                cutlery_notes: notes.cutlery_notes,
                delivery_notes: notes.delivery_notes,
              },
              prep_time: dmsOrderObject.prepare_for,
              customer_paid_status,
              delivery_mode: {
                delivery_mode: delivery_mode,
              },
              address,
              order_status: tempData.temp_order_status,
              customer,
              items,
              order_type: {
                order_type: asap ? 'asap' : 'sheduled',
              },
              order_source: {
                order_source: tempData.source_name,
              },
              source_image: tempData.source_image,
            };
            setOrderDetails(orderObject);
            setOrderSource(tempData.source_name);
            console.log(orderObject);
            setOpen(true);
          },
          onError: (error) => {
            // Handle error
            console.error('Error:', error);
            throw new Error('Failed to fetch orders');
          },
        },
      );
    } else {
      getOrderDetailsCall(
        {
          order_id: orderId,
        },
        {
          onSuccess: (data) => {
            // Handle successful response
            console.log('Response:', data);
            setOrderDetails(data);
            setOrderSource(data.order_source.order_source);
            setOpen(true);
          },
          onError: (error) => {
            // Handle error
            console.error('Error:', error);
            throw new Error('Failed to fetch orders');
          },
        },
      );
    }
  };

  const acceptOrder = async (tempOrderId: number | null) => {
    if (tempOrderId == null) {
      console.log('Unable to accept order with null temp order id!');
      return;
    }
    if (activeTab == 'driver_waiting') {
      acceptOrderCall(
        {
          temp_order_id: tempOrderId,
        },
        {
          onSuccess: (data) => {
            // Handle successful response
            console.log('Response:', data);
            alert('Order Accepted!');
            fetchOrders();
            setOpen(false);
            setSelectedMenuValue('');
          },
          onError: (error: any) => {
            // Handle error
            console.error('Error:', error);
            // alert(error.message);
            setSelectedMenuValue('');
          },
        },
      );
    }
  };

  const rejectOrder = async (tempOrderId: number | null) => {
    console.log('rejectReason: ', rejectReason);

    if (tempOrderId == null) {
      alert('Unable to accept order with null temp order id!');
      return;
    }
    if (rejectReason == null || rejectReason == '' || rejectNote == null || rejectNote == '') {
      alert('Provide a valid Rejection Reason and a note!');
      return;
    }
    if (activeTab == 'driver_waiting') {
      rejectOrderCall(
        {
          temp_order_id: tempOrderId,
          reason: 'busy',
          note: 'Not interested to accept this order',
        },
        {
          onSuccess: (data) => {
            // Handle successful response
            console.log('Response:', data);
            alert('Order Rejected!');
            fetchOrders();
            setOpen(false);
            setSelectedMenuValue('');
            setRejectReason('');
            setRejectNote('');
            closePopup();
          },
          onError: (error: any) => {
            // Handle error
            console.error('Error:', error.data.message);
            // alert(error.data.message);
            setSelectedMenuValue('');
            setRejectReason('');
            setRejectNote('');
            closePopup();
          },
        },
      );
    }
  };

  const updateOrderStatus = async (orderId: number) => {
    if (activeTab == 'driver_waiting' || activeTab == 'rejected') {
      console.log('Waiting Orders are not allowed to update status!');
      return;
    }

    if (selectedMenuValue == null || selectedMenuValue == '') {
      alert('Please select order status to update');
      return;
    }

    updateOrderStatusCall(
      {
        order_id: orderId,
        new_order_status: selectedMenuValue,
      },
      {
        onSuccess: (data) => {
          // Handle successful response
          console.log('Response:', data);
          alert('Order Status Updated!');
          fetchOrders();
          setOpen(false);
          setSelectedMenuValue('');
        },
        onError: (error: any) => {
          // Handle error
          console.error('Error:', error.data.message);
          alert(error.message);
        },
      },
    );
  };

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    fetchOrders();
    fetchOrderCount();
    if (!open) {
      const intervalId = setInterval(() => {
        fetchOrders();
        fetchOrderCount();
      }, 3000);
      return () => clearInterval(intervalId);
    }
  }, [
    open,
    rowsPerPage,
    activePage,
    activeTab,
    selectedMenuValue,
    filterStartDate,
    filterEndDate,
    filterPaymentStatus,
    filterDeliveryFeePaymentStatus,
    filterAggregator,
    filterDriverName,
    filterLocation,
  ]);

  const [openPop, openchange] = React.useState(false);
  const functionOpenPopup = () => {
    openchange(true);
  };
  const closePopup = () => {
    openchange(false);
  };

  const time = [
    {
      value: '10',
      label: '10 min',
    },
    {
      value: '20',
      label: '20 min',
    },
    {
      value: '30',
      label: '30 min',
    },
    {
      value: '35',
      label: '35 min',
    },
  ];

  const orderStatus = [
    {
      value: 'waiting for prep',
      label: 'Waiting for Prep',
    },
    {
      value: 'in prep',
      label: 'In Prep',
    },
    {
      value: 'ready for deliver',
      label: 'Ready for Deliver',
    },
    {
      value: 'ready for collection',
      label: 'Ready for Collection',
    },
    {
      value: 'collected',
      label: 'Collected',
    },
  ];

  const orderReject = [
    {
      value: 'closing_early',
      label: 'Closing Early',
    },
    {
      value: 'busy',
      label: 'Busy',
    },
    {
      value: 'ingredient_unavailable',
      label: 'Ingredient Unavailable',
    },
    {
      value: 'other',
      label: 'Other reason',
    },
  ];

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
    if (newOpen == false) {
      setSelectedMenuValue('');
    }
  };

  const handleMenuChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setSelectedMenuValue(event.target.value);
    event.preventDefault();
  };

  const handlePrepTimeChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    event.preventDefault();
    console.log('odl:', orderDetails);
    const gotPrepTime = event.target.value;
    setSelectedPrepTime(gotPrepTime);
    setPrepTimeCall(
      {
        tempOrderId: orderDetails.temp_order_id,
        prepTime: gotPrepTime,
      },
      {
        onSuccess: (data) => {
          // Handle successful response
          console.log('Response:', data);
          alert(data);
          showOrderDetail(orderDetails.temp_order_id, true);
        },
        onError: (error: any) => {
          // Handle error
          console.error('Error:', error);
          // alert(error.message);
          setSelectedMenuValue('');
        },
      },
    );
  };

  const DrawerList =
    orderDetails !== null && Object.keys(orderDetails).length > 0 ? (
      <Box
        sx={{
          width: 600,
          padding: '10px',
        }}
        role="presentation"
        onClick={() => toggleDrawer(false)}
      >
        <div style={{ display: 'flex', marginBottom: 10, alignItems:'center' }}>
          <div style={{ display: 'flex', width:'70%' }}>
            <div>
              <b>Order ID: {orderDetails.sos_order_number} </b> - 
            </div>
            <div
              style={{
                fontSize: 17,
                fontWeight:'bold',
                marginLeft: '5px',
                color: 'green',
                textTransform: 'capitalize',
              }}
            >
              {orderDetails.order_status?.order_status || orderDetails.order_status}
            </div>
          </div>
          {/* <div style={{width:'30%', display: 'flex', justifyContent:'end'}}>
          <p
            style={{
              fontStyle: 'bold',
              fontWeight: '700',
            }}
          >
            Dispatch ID
          </p>
          <p
            style={{
              marginLeft: '5px',
            }}
          >
            #{orderDetails.dispatch?.dispatch_id || 'N/A'}
          </p>
          </div> */}
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: '10px',
          }}
        >
          <p
            style={{
              fontStyle: 'bold',
              fontWeight: '700',
            }}
          >
            Dispatch ID
          </p>
          <p
            style={{
              marginLeft: '5px',
            }}
          >
            #{orderDetails.dispatch?.dispatch_id || 'N/A'}
          </p>
        </div>

        <div
          style={{
            marginTop: '10px',
            // marginBottom: '10px',
            boxShadow: '0px 0px 5px 0px #E0E0E0',
          }}
        >
          <div
            style={{
              width: '100%',
              // height: '130px',
              minHeight: '80px',
              border: '1px solid #E0E0E0',
              borderBottomLeftRadius: '10px',
              borderBottomRightRadius: '10px',
              background: 'linear-gradient(#F4F8FA, #FFFFFF)',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                marginLeft: '70px',
                marginTop: '20px',
              }}
            >
              {orderDetails.driver?.driver_id && orderDetails.driver?.profile_photo_id ? (
                <img
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    position: 'absolute',
                    left: '20px',
                    top: '90px',
                  }}
                  src={orderDetails.driver.profile_photo_id}
                  alt="Customer Image"
                ></img>
              ) : (
                <AccountCircle
                  style={{
                    fontSize: '50px',
                    position: 'absolute',
                    left: '20px',
                    top: '85px',
                  }}
                />
              )}

              <p>{orderDetails.driver?.driver_name || 'N/A'}</p>

              <div
                style={{
                  display: 'flex',
                  gap: '5px',
                }}
              >
                <p>Vehicle Registration:</p>
                <p>{orderDetails.driver?.vehicle_reg_number || 'N/A'}</p>
              </div>
            </div>
            <div
              style={{
                textAlign: 'end',
                fontSize: '0.9rem',
                marginRight: '40px',
                marginTop: '20px',
                lineHeight: '1.6',
              }}
            >
              {orderDetails.order_status.order_status == 'ready for deliver' ? (
                <>
                  <div>
                    <p>Waiting for driver assignment</p>
                    <div
                      style={{
                        backgroundColor: orderDetails.driver?.driver_id ? '' : '#ADF3FF',
                        width: '23px',
                        height: '23px',
                        borderRadius: '50%',
                        position: 'relative',
                        left: '195px',
                        top: '-23px',
                        zIndex: 1,
                      }}
                    >
                      <FaCircle
                        style={{
                          color: '#19BBD6',
                          marginTop: '4px',
                          // marginLeft: '10px',
                          border: '2px solid white',
                          borderRadius: '50%',
                          position: 'absolute',
                          left: '19%',
                        }}
                      />
                    </div>
                  </div>
                  {orderDetails.driver?.driver_id ? (
                    <>
                      <hr
                        className="line"
                        style={{
                          position: 'absolute',
                          top: '93px',
                          height: '50px',
                          width: '2px',
                          backgroundColor: '#19BBD6',
                          right: '33px',
                          zIndex: 0,
                        }}
                      ></hr>
                      <div
                        style={{
                          position: 'relative',
                          top: '-15px',
                        }}
                      >
                        <p>Driver assigned</p>
                        <div
                          style={{
                            backgroundColor: orderDetails.driver?.driver_id ? '#ADF3FF' : '',
                            width: '23px',
                            height: '23px',
                            borderRadius: '50%',
                            position: 'relative',
                            left: '195px',
                            top: '-23px',
                          }}
                        >
                          <FaCircle
                            style={{
                              color: '#19BBD6',
                              marginTop: '4px',
                              // marginLeft: '10px',
                              border: '2px solid white',
                              borderRadius: '50%',
                              position: 'absolute',
                              left: '19%',
                            }}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : orderDetails.order_status.order_status == 'in transit' ? (
                <>
                  <hr
                    className="line"
                    style={{
                      position: 'absolute',
                      top: '92px',
                      height: '50px',
                      width: '2px',
                      backgroundColor: '#19BBD6',
                      right: '32px',
                    }}
                  ></hr>
                  <div>
                    <p>Waiting for driver assignment</p>
                    <div>
                      <FaCircle
                        style={{
                          color: '#19BBD6',
                          marginTop: '4px',
                          marginLeft: '10px',
                          border: '2px solid white',
                          borderRadius: '50%',
                          position: 'absolute',
                          top: '95px',
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <p>Driver assigned</p>
                    <div>
                      <FaCircle
                        style={{
                          color: '#19BBD6',
                          marginTop: '4px',
                          marginLeft: '10px',
                          border: '2px solid white',
                          borderRadius: '50%',
                          position: 'absolute',
                          top: '120px',
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <p>In transit</p>
                    <div
                      style={{
                        backgroundColor: '#ADF3FF',
                        width: '23px',
                        height: '23px',
                        borderRadius: '50%',
                        position: 'relative',
                        left: '195px',
                        top: '-20px',
                      }}
                    >
                      <FaCircle
                        style={{
                          color: '#19BBD6',
                          marginTop: '4px',
                          // marginLeft: '10px',
                          border: '2px solid white',
                          borderRadius: '50%',
                          position: 'absolute',
                          left: '19%',
                        }}
                      />
                    </div>
                  </div>
                </>
              ) : orderDetails.order_status.order_status == 'delivered' ? (
                <>
                  <hr
                    className="line"
                    style={{
                      position: 'absolute',
                      top: '117px',
                      height: '90px',
                      width: '2px',
                      backgroundColor: '#19BBD6',
                      right: '32px',
                    }}
                  ></hr>
                  <div>
                    <p>Waiting for driver assignment</p>
                    <div>
                      <FaCircle
                        style={{
                          color: '#19BBD6',
                          marginTop: '4px',
                          marginLeft: '10px',
                          border: '2px solid white',
                          borderRadius: '50%',
                          position: 'absolute',
                          top: '120px',
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <p>Driver assigned</p>
                    <div>
                      <FaCircle
                        style={{
                          color: '#19BBD6',
                          marginTop: '4px',
                          marginLeft: '10px',
                          border: '2px solid white',
                          borderRadius: '50%',
                          position: 'absolute',
                          top: '145px',
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <p>In transit</p>
                    <div>
                      <FaCircle
                        style={{
                          color: '#19BBD6',
                          marginTop: '4px',
                          marginLeft: '10px',
                          border: '2px solid white',
                          borderRadius: '50%',
                          position: 'absolute',
                          top: '167px',
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <p>Delivered</p>
                    <div
                      style={{
                        backgroundColor: '#ADF3FF',
                        width: '23px',
                        height: '23px',
                        borderRadius: '50%',
                        position: 'relative',
                        left: '195px',
                        top: '-20px',
                      }}
                    >
                      <FaCircle
                        style={{
                          color: '#19BBD6',
                          marginTop: '4px',
                          // marginLeft: '10px',
                          border: '2px solid white',
                          borderRadius: '50%',
                          position: 'absolute',
                          left: '19%',
                        }}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          {/* <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              border: '1px solid #E0E0E0',
              boxShadow: '0px 0px 5px 0px #E0E0E0',
              padding: '10px',
            }}
          >
            <p>Driver is on the way</p>
            <div
              style={{
                display: 'flex',
                gap: '5px',
              }}
            >
              <p>Arrive in</p>
              <p
                style={{
                  fontWeight: 'bold',
                }}
              >
                20 min
              </p>
            </div>
          </div> */}
        </div>

        <Grid
          container
          spacing={0}
          justifyContent={'space-between'}
          sx={{
            padding: '10px 0',
          }}
        >
          <Grid
            item
            xs={5.8}
            sx={{
              border: '1px solid #E0E0E0',
              padding: '10px',
              borderRadius: '10px',
              boxShadow: '0px 0px 5px 0px #E0E0E0',
            }}
          >
            <div
              style={{
                display: 'flex',
              }}
            >
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                }}
              >
                Customer Details
              </p>
              {/* <GoPencil
                style={{
                  marginLeft: 'auto',
                  fontSize: '1rem',
                }}
              /> */}
            </div>

            <div
              className="customerDetails"
              style={{
                fontSize: 15,
                marginTop: '5px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '5px',
                }}
                className="contact"
              >
                <p
                  style={{
                    color: 'grey',
                  }}
                >
                  Name:
                </p>{' '}
                <p
                  style={{
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                  }}
                >
                  {orderDetails.customer.customer_name}
                </p>
              </div>
              {/* <p style={{textTransform:'capitalize'}}>{orderDetails.customer.customer_name}</p> */}
              <div
                style={{
                  display: 'flex',
                  gap: '5px',
                }}
                className="contact"
              >
                <p
                  style={{
                    color: 'grey',
                  }}
                >
                  Contact:
                </p>{' '}
                <p
                  className="contact_number"
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  {orderDetails.customer.contact_number}
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '5px',
                }}
                className="emailDetails"
              >
                <p
                  style={{
                    color: 'grey',
                  }}
                >
                  AccesCode:
                </p>{' '}
                <p
                  className="email"
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  {orderDetails.contact_access_code || 'N/A'}
                </p>
              </div>
            </div>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              border: '1px solid #E0E0E0',
              padding: '10px',
              borderRadius: '10px',
              boxShadow: '0px 0px 5px 0px #E0E0E0',
            }}
          >
            <div
              style={{
                display: 'flex',
              }}
            >
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                }}
              >
                Delivery Address
              </p>
              {/* <GoPencil
                style={{
                  marginLeft: 'auto',
                  fontSize: '1rem',
                }}
              /> */}
            </div>

            {Object.keys(orderDetails.address).length !== 0 ? (
              <div
                className="deliveryDetails"
                style={{
                  fontSize: 15,
                  marginTop: '10px',
                }}
              >
                <p className="flatNum">
                  {`${orderDetails.address.line1} ${orderDetails.address.line2 ? ',' + orderDetails.address.line2 : ''}
                  ${orderDetails.address.city ? ',' + orderDetails.address.city : ''}`}
                </p>
                <p className="postalCode">{orderDetails.address.postcode}</p>
              </div>
            ) : (
              <div
                className="deliveryDetails"
                style={{
                  fontSize: 15,
                  marginTop: '10px',
                }}
              >
                <p className="flatNum">N/A</p>
              </div>
            )}
          </Grid>
        </Grid>

        <Box
          sx={{
            padding: '10px',
            border: '1px solid #E0E0E0',
            borderRadius: '10px',
            width: '100%',
            display: 'flex',
            boxShadow: '0px 0px 5px 0px #E0E0E0',
          }}
        >
          <img src={orderDetails.source_image} alt="Order Source" style={{ width: '35px', height: '35px' }} />
          <div style={{ marginLeft: '10px', fontSize: 15 }}>
            {/* <div style={{ display: 'flex', gap: 5 }}>
              Order Placed time :{' '}
              <p className="order_placed_time" style={{ fontSize: 15, color: 'grey' }}>
                {dateConversion(orderDetails.order_date, orderDetails.order_time)}
              </p>
            </div> */}
            <div style={{ display: 'flex', gap: 5 }}>
              Start Preparation time :{' '}
              <p style={{ fontSize: 15, color: 'grey' }}>
                {new Date(orderDetails.start_preparing_at).toLocaleString('en-GB', {
                  month: 'numeric',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: false,
                })}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 5 }}>
              Estimated Ready time :{' '}
              <p style={{ fontSize: 15, color: 'grey' }}>
                {new Date(orderDetails.prepare_for).toLocaleString('en-GB', {
                  month: 'numeric',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: false,
                })}
              </p>
            </div>
          </div>
          <div style={{ marginLeft: 'auto', fontSize: 15 }}>
            <div style={{ display: 'flex', gap: 5 }}>
              Payment Status :{' '}
              <p style={{ fontSize: 15, color: 'grey' }}>
                {orderDetails.customer_paid_status ? 'Paid' : 'Unpaid'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 5 }}>
              Order Preparation :{' '}
              <p style={{ fontSize: 15, color: 'grey', textTransform: 'capitalize' }}>
                {orderDetails.order_type?.order_type || ''}
              </p>
            </div>
            {/* <div style={{ display: 'flex', gap: 5 }}>
              Fullfillment Type :{' '}
              <p style={{ fontSize: 15, color: 'grey', textTransform: 'capitalize' }}>
                {orderDetails.delivery_mode?.delivery_mode || ''}
              </p>
            </div> */}
          </div>
        </Box>
        <div
          style={{
            border: '1px solid #E0E0E0',
            borderRadius: '10px',
            marginTop: '10px',
            boxShadow: '0px 0px 5px 0px #E0E0E0',
          }}
        >
          <TableContainer sx={{}}>
            <Table sx={{ minWidth: 200 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell className="customTableCell">Items</TableCell>
                  <TableCell className="customTableCell">Qty</TableCell>
                  <TableCell className="customTableCell">Unit Price</TableCell>
                  <TableCell className="customTableCell">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderDetails.items.map((item: Item, index: React.Key | null | undefined) => (
                  <>
                    <StyledTableRow key={index}>
                      <StyledTableCell className="customTableRow">{item.item_name}</StyledTableCell>
                      <StyledTableCell className="customTableRow">{item.quantity}</StyledTableCell>
                      <StyledTableCell className="customTableRow">
                        £ {(parseFloat(item.unit_price) / 100).toFixed(2)}
                      </StyledTableCell>
                      <StyledTableCell className="customTableRow">
                        £ {(parseFloat(item.item_total) / 100).toFixed(2)}
                      </StyledTableCell>
                    </StyledTableRow>
                    {item.modifiers &&
                      item.modifiers.map((modifier: Item, modifierIndex: number) => (
                        <StyledTableRow key={modifierIndex}>
                          <StyledTableCell
                            className="customTableRow"
                            sx={{
                              display: 'flex',
                            }}
                          >
                            <div
                              style={{
                                marginRight: '5px',
                              }}
                            >
                              <MdOutlineSubdirectoryArrowRight />
                            </div>
                            {modifier.item_name}
                          </StyledTableCell>
                          <StyledTableCell className="customTableRow">{modifier.quantity}</StyledTableCell>
                          <StyledTableCell className="customTableRow">
                            £ {(parseFloat(modifier.unit_price) / 100).toFixed(2)}
                          </StyledTableCell>
                          <StyledTableCell className="customTableRow">
                            £ {(parseFloat(modifier.modifier_total) / 100).toFixed(2)}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </>
                ))}
                <StyledTableRow>
                  <TableCell>Subtotal</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>£ {(parseFloat(orderDetails.subtotal_amount) / 100).toFixed(2)}</TableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {orderSource == 'deliveroo' ? (
            <></>
          ) : (
            <></>
            // <div
            //   style={{
            //     display: 'flex',
            //     justifyContent: 'end',
            //   }}
            // >
            //   <p>SERVICE CHARGE</p>
            //   <p
            //     style={{
            //       marginLeft: '5px',
            //       border: '1px solid #E0E0E0',
            //       width: '100px',
            //     }}
            //   >
            //     £ 5
            //   </p>
            // </div>
          )}

          {orderDetails.bag_fee && orderDetails.bag_fee != 0 ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'end',
              }}
            >
              <p>Bag Charge: </p>
              <p
                style={{
                  marginLeft: '5px',
                  border: '1px solid #E0E0E0',
                  width: '100px',
                }}
              >
                £ {(parseFloat(orderDetails?.bag_fee || '0') / 100).toFixed(2)}
              </p>
            </div>
          ) : (
            <></>
          )}

          {orderDetails.delivery_charge && orderDetails.delivery_charge != 0 ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'end',
              }}
            >
              <p>Customer Delivery Fee: </p>
              <p
                style={{
                  marginLeft: '5px',
                  border: '1px solid #E0E0E0',
                  width: '100px',
                }}
              >
                £ {(parseFloat(orderDetails?.delivery_charge || '0.00') / 100).toFixed(2)}
              </p>
            </div>
          ) : (
            <></>
          )}

          {orderDetails.discounts && orderDetails.discounts != 0 ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'end',
              }}
            >
              <p>Discount: </p>
              <p
                style={{
                  marginLeft: '5px',
                  border: '1px solid #E0E0E0',
                  width: '100px',
                }}
              >
                £ {(parseFloat(orderDetails?.discounts || '0.00') / 100).toFixed(2)}
              </p>
            </div>
          ) : (
            <></>
          )}

          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            <p style={{ textTransform: 'capitalize' }}>
              {orderDetails.order_source.order_source} Total <span style={{ fontSize: 12 }}>(Inc. VAT): </span>
            </p>
            <p
              style={{
                marginLeft: '5px',
                border: '1px solid #E0E0E0',
                width: '100px',
              }}
            >
              £ {parseString((parseFloat(orderDetails.total_order_amount) / 100).toFixed(2) || '0.00')}
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            <p
              style={{
                marginLeft: '5px',
                width: '100px',
                height: '20px',
              }}
            ></p>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            <p style={{ textTransform: 'capitalize' }}>Graun's Fees: </p>
            <p
              style={{
                marginLeft: '5px',
                border: '1px solid #E0E0E0',
                width: '100px',
              }}
            >
              £{' '}
              {parseFloat(
                orderDetails.order_commission
                  ? parseFloat(orderDetails.order_commission?.order_commission).toFixed(2)
                  : '0.00',
              )}
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            <p>
              VAT <span style={{ fontSize: 12 }}>(20%)</span>:{' '}
            </p>
            <p
              style={{
                marginLeft: '5px',
                border: '1px solid #E0E0E0',
                width: '100px',
              }}
            >
              £{' '}
              {orderDetails.order_commission
                ? (
                    (parseFloat(orderDetails.order_commission.order_commission) *
                      orderDetails.order_commission.tax_rate) /
                    100
                  ).toFixed(2)
                : '0.00'}
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            <p style={{ textTransform: 'capitalize' }}>Total: </p>
            <p
              style={{
                marginLeft: '5px',
                border: '1px solid #E0E0E0',
                width: '100px',
              }}
            >
              £
              {orderDetails.order_commission
                ? // orderDetails.total_order_amount / 100 +
                  (
                    parseFloat(orderDetails.order_commission.order_commission) +
                    (parseFloat(orderDetails.order_commission.order_commission) *
                      orderDetails.order_commission.tax_rate) /
                      100
                  ).toFixed(2)
                : (parseFloat(orderDetails.total_order_amount) / 100).toFixed(2) || '0.00'}
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            marginBottom: '20px',
          }}
        >
          <Box
            sx={{
              padding: '10px',
              border: '1px solid #E0E0E0',
              borderRadius: '10px',
              width: '100%',
              marginTop: '10px',
              boxShadow: '0px 0px 5px 0px #E0E0E0',
            }}
          >
            <div
              style={{
                display: 'flex',
              }}
            >
              <div
                style={{
                  marginRight: '5px',
                  marginTop: '3px',
                }}
              >
                <IoIosInformationCircleOutline />
              </div>
              Instruction from customer
            </div>
            {orderDetails.notes.order_notes && orderDetails.notes.order_notes != '' ? (
              <>
                <p
                  style={{
                    color: 'grey',
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}
                >
                  Order Note:
                </p>
                <p
                  style={{
                    color: 'grey',
                    fontSize: 15,
                    textAlign: 'justify',
                  }}
                >
                  {orderDetails.notes.order_notes}
                </p>
              </>
            ) : (
              <></>
            )}
            {orderDetails.notes.cutlery_notes && orderDetails.notes.cutlery_notes != '' ? (
              <>
                <p
                  style={{
                    color: 'grey',
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}
                >
                  Cutlery Notes:
                </p>
                <p
                  style={{
                    color: 'grey',
                    fontSize: 15,
                  }}
                >
                  {orderDetails.notes.cutlery_notes}
                </p>
              </>
            ) : (
              <></>
            )}
            {orderDetails.notes.delivery_notes && orderDetails.notes.delivery_notes != '' ? (
              <>
                <p
                  style={{
                    color: 'grey',
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}
                >
                  Delivery Notes:
                </p>
                <p
                  style={{
                    color: 'grey',
                    fontSize: 15,
                  }}
                >
                  {orderDetails.notes.delivery_notes}
                </p>
              </>
            ) : (
              <></>
            )}
          </Box>
        </div>
      </Box>
    ) : (
      <></>
    );

  const MyRoot = styled('div')(
    ({ theme }) => `
        table {
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 0.875rem;
          width: 100%;
          background-color: ${theme.palette.mode === 'dark' ? theme.palette.grey[900] : '#fff'};
          box-shadow: 0px 4px 16px ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.3)' : theme.palette.grey[200]};
          border-radius: 12px;
          border: 1px solid ${theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200]};
          overflow: hidden;
        }
      
        td,
        th {
          padding: 16px;
        }
      
        th {
          background-color: ${theme.palette.mode === 'dark' ? theme.palette.grey[900] : '#fff'};
        }
        `,
  );

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setActivePage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setActivePage(0);
  };
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setActivePage(0);
  };

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: '15px',
        boxShadow: '0px 0px 10px 0px #0000000D',
        width: '110%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          height: '70px',
          borderBottom: '1px solid #E0E0E0',
        }}
      >
        <p
          style={{
            fontSize: '20px',
            margin: 'auto 0',
            padding: '0 20px',
          }}
        >
          Customer Deliveries
        </p>
        {/* <button
          style={{
            color: '#1B81E9',
            marginTop: '3px',
          }}
          onClick={() => {
            fetchOrders();
          }}
        >
          <RefreshIcon
            sx={{
              marginBottom: '-6px',
            }}
          />
          Just Now
        </button> */}
        <AnimatedButton onClick={fetchOrders} />
        <Search
          sx={{
            marginLeft: 'auto',
            display: 'none',
            alignItems: 'center',
            position: 'absolute',
            top: '15px',
            right: '35px',
            border: '1px solid #E0E0E0',
            borderRadius: '20px',
          }}
        >
          <SearchIconWrapper>
            <SearchIcon
              sx={{
                color: 'grey',
              }}
            />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search here…" inputProps={{ 'aria-label': 'search' }} />
        </Search>
        <IconButton
          size="medium"
          aria-label="account of current user"
          color="inherit"
          sx={{
            position: 'absolute',
            top: '15px',
            right: '-80px',
            border: '1px solid #E0E0E0',
            borderRadius: '20px',
            width: '120px',
          }}
          aria-controls={filterOpen ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={filterOpen ? 'true' : undefined}
          onClick={handleClick}
        >
          <CiFilter />
          <p
            style={{
              fontSize: '1rem',
              marginLeft: '5px',
              color: 'grey',
            }}
          >
            Filter
          </p>
        </IconButton>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={filterOpen}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <div
            style={{
              padding: '10px',
              display: 'flex',
              gap: '10px',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                padding: '10px',
              }}
            >
              <p>Calender</p>
              <div
                style={{
                  display: 'flex',
                  border: '1px solid grey',
                  borderRadius: '20px',
                  justifyContent: 'space-between',
                  height: '40px',
                }}
              >
                <input
                  type="date"
                  placeholder="Start Date"
                  style={{
                    border: 'none',
                    position: 'relative',
                    left: '10px',
                    height: '30px',
                    top: '5px',
                  }}
                  value={tempFilterStartDate}
                  onChange={(e) => handleStartDateChange(e)}
                />
                <p
                  style={{
                    position: 'relative',
                    top: '10px',
                  }}
                >
                  TO
                </p>
                <input
                  type="date"
                  style={{
                    border: 'none',
                    position: 'relative',
                    right: '10px',
                    height: '30px',
                    top: '5px',
                  }}
                  value={tempFilterEndDate}
                  onChange={(e) => handleEndDateChange(e)}
                />
              </div>
            </div>

            {validationError && (
              <p style={{ color: 'red', marginLeft:'14px', fontSize:'14px' }}>{validationError}</p>
            )}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {/* <div
                style={{
                  padding: '10px',
                }}
              >
                <p>Payment Status</p>
                <select
                  name="payment_status"
                  id="p_status"
                  style={{
                    width: '150px',
                    height: '35px',
                    borderRadius: '20px',
                    padding: '5px',
                  }}
                  value={tempFilterPaymentStatus}
                  onChange={(e) => setTempFilterPaymentStatus(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                </select>
              </div> */}
              {/* <div
                style={{
                  padding: '10px',
                }}
              >
                <p>Delivery fee status</p>
                <select
                  name="delivery_fee_status"
                  id="d_fee_status"
                  style={{
                    width: '150px',
                    height: '35px',
                    borderRadius: '20px',
                    padding: '5px',
                  }}
                  value={tempFilterDeliveryFeePaymentStatus}
                  onChange={(e) => setTempFilterDeliveryFeePaymentStatus(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                </select>
              </div> */}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  padding: '10px',
                }}
              >
                <p>Aggregator</p>
                <select
                  name="aggregators"
                  id="aggregators"
                  style={{
                    width: '150px',
                    height: '35px',
                    borderRadius: '20px',
                    padding: '5px',
                  }}
                  value={tempFilterAggregator}
                  onChange={(e) => setTempFilterAggregator(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="deliveroo">Deliveroo</option>
                  <option value="justeats">Just Eats</option>
                  <option value="uber eats">Uber Eats</option>
                  <option value="graun foods">Graun Foods</option>
                </select>
              </div>
              <div
                style={{
                  padding: '10px',
                }}
              >
                <p>Driver Name</p>
                <div>
                  <input
                    type="text"
                    placeholder="Type here"
                    style={{
                      border: '1px solid grey',
                      borderRadius: '20px',
                      height: '30px',
                      width: '100%',
                      padding: '5px',
                    }}
                    value={tempFilterDriverName}
                    onChange={(e) => setTempFilterDriverName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* <div
              style={{
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p>Delivery location</p>
                <input
                  type="text"
                  placeholder="Type here"
                  style={{
                    border: '1px solid grey',
                    borderRadius: '20px',
                    height: '30px',
                    padding: '5px',
                    width: '22rem',
                  }}
                  value={tempFilterLocation}
                  onChange={(e) => setTempFilterLocation(e.target.value)}
                />
              </div>
            </div> */}
            <div>
              <button
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  padding: '10px',
                  borderRadius: '20px',
                  width: '100px',
                  height: '40px',
                  marginTop: '15px',
                  marginLeft: '8px',
                  marginRight: '10px',
                }}
                onClick={clearFilters}
              >
                Clear Filter
              </button>
              <button
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  padding: '10px',
                  borderRadius: '20px',
                  width: '100px',
                  height: '40px',
                  marginTop: '15px',
                }}
                onClick={setFilters}
              >
                Filter
              </button>
            </div>
          </div>
        </Menu>
      </Box>

      <Box
    sx={{
      padding: '0px',
      borderBottom: '1px solid #E0E0E0',
      textAlign: 'center',
      marginTop: '30px',
      marginBottom: '20px',
      width: '100%',
    }}
  >
    <Grid container spacing={0} display="flex" justifyContent="space-between" justifyItems="center">
      {renderTabs()}
    </Grid>
  </Box>

      <TableContainer
        sx={{
          topBorder: '1px solid #E0E0E0',
        }}
      >
        <MyRoot>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    position: 'relative',
                    padding: '10px',
                    width: '20%',
                  }}
                >
                  <img
                    src={UberEats}
                    alt="UberEats"
                    style={{
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      backgroundColor: 'green',
                      padding: '5px',
                      position: 'absolute',
                      top: '5px',
                    }}
                  />
                  <img
                    src={deliveroo}
                    alt="Deliveroo"
                    style={{
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      backgroundColor: '#9FFFFE',
                      // padding: '5px',
                      position: 'absolute',
                      top: '25px',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '14px',
                      left: '80px',
                      fontSize:15
                    }}
                  >
                    Order ID
                  </div>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', marginTop: '-2px', fontSize:15 }}>Dispatch ID</div>
                </TableCell>
                <TableCell>
                  <button
                    style={{
                      display: 'flex',
                      marginTop: '5px',
                      fontSize:15
                    }}
                  >
                    Order Date
                    <div
                      style={{
                        marginTop: '-4px',
                      }}
                    >
                      {/* <SwapVertIcon /> */}
                    </div>
                  </button>
                </TableCell>

                <TableCell>
                  <div style={{ display: 'flex', marginTop: '-2px', fontSize:15 }}>Delivery Fee</div>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', marginTop: '-4px', fontSize:15 }}>Driver Name</div>
                </TableCell>
                <TableCell
                  style={{
                    width: '20%',
                  }}
                >
                  <div style={{ display: 'flex', marginTop: '-2px', fontSize:15 }}>Status</div>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', marginTop: '-3px', fontSize:15 }}>Actions</div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders ? (
                orders.map((order: Order, index: React.Key | null | undefined) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '10px',
                          position: 'relative',
                          top: '7px',
                        }}
                      >
                        <img
                          src={order.source_image}
                          alt="Deliveroo"
                          style={{
                            marginRight: '5px',
                            width: '35px',
                            borderRadius: '50%',
                          }}
                        />{' '}
                        {order.sos_order_number}
                        {order.order_type_id === 2 && (
                          <div
                            style={{
                              color: 'red',
                              marginLeft: '10px',
                              fontSize: '1rem',
                            }}
                          >
                            <RiCalendarScheduleLine />
                          </div>
                        )}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{
                          height: '30px',
                          alignItems: 'center',
                          padding: '10px',
                        }}
                      >
                        #{order?.dispatch_id || ' N/A'}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{
                          display: 'flex',
                          padding: '10px',
                          position: 'relative',
                          bottom: '7px',
                        }}
                      >
                        {dateConversion(order.order_date, order.order_time)}
                      </StyledTableCell>
                      <StyledTableCell
                        style={{
                          height: '50px',
                          padding: '10px',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                          }}
                        >
                          <div
                            style={{
                              color: 'black',
                            }}
                          >
                            £{' '}
                            {parseFloat(
                              order.order_commission ? parseFloat(order.order_commission).toFixed(2) : '0.00',
                            )}
                          </div>
                          {order.customer_paid_status ? (
                            <IoCheckmarkCircleOutline
                              size={20}
                              style={{
                                color: 'green',
                                marginLeft: '5px',
                                marginTop: '-2px',
                              }}
                            />
                          ) : (
                            <IoIosCloseCircleOutline
                              size={20}
                              style={{
                                color: 'red',
                                marginLeft: '5px',
                              }}
                            />
                          )}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell>{order?.driver_name || 'N/A'}</StyledTableCell>
                      <StyledTableCell
                        style={{
                          height: '50px',
                          textTransform: 'capitalize',
                        }}
                      >
                        <div
                          style={{
                            color:
                              order.order_status === 'pending'
                                ? '#FF734D'
                                : order.order_status === 'in prep'
                                ? '#1D7FBB'
                                : order.order_status === 'ready for collection'
                                ? '#734EC5'
                                : order.order_status === 'cancelled'
                                ? '#A7A7A7'
                                : order.order_status === 'waiting for prep'
                                ? '#E5B405'
                                : order.order_status === 'collected'
                                ? '#2BAA76'
                                : order.order_status === 'rejected'
                                ? '#BA0000'
                                : order.order_status === 'ready for deliver'
                                ? '#734EC5'
                                : order.order_status === 'in transit'
                                ? '#4B5563'
                                : order.order_status === 'delivered'
                                ? '#1E9D4F'
                                : 'black',

                            backgroundColor:
                              order.order_status === 'pending'
                                ? '#FF734D1A'
                                : order.order_status === 'in prep'
                                ? '#1D7FBB1A'
                                : order.order_status === 'ready for collection'
                                ? '#734EC51A'
                                : order.order_status === 'cancelled'
                                ? '##A7A7A71A'
                                : order.order_status === 'waiting for prep'
                                ? '#E5B4051A'
                                : order.order_status === 'collected'
                                ? '#2BAA761A'
                                : order.order_status === 'rejected'
                                ? '#BA00001A'
                                : order.order_status === 'ready for deliver'
                                ? '#734EC51A'
                                : order.order_status === 'in transit'
                                ? '#4B55631A'
                                : order.order_status === 'delivered'
                                ? '#1E9D4F1A'
                                : 'none',
                            border:
                              order.order_status === 'pending'
                                ? '1px solid #FF734D'
                                : order.order_status === 'in prep'
                                ? '1px solid #1D7FBB'
                                : order.order_status === 'ready for collection'
                                ? '1px solid #734EC5'
                                : order.order_status === 'cancelled'
                                ? '1px solid #A7A7A7'
                                : order.order_status === 'waiting for prep'
                                ? '1px solid #E5B405'
                                : order.order_status === 'collected'
                                ? '1px solid #2BAA76'
                                : order.order_status === 'rejected'
                                ? '1px solid #BA0000'
                                : order.order_status === 'ready for deliver'
                                ? '1px solid #734EC5'
                                : order.order_status === 'in transit'
                                ? '1px solid #4B5563'
                                : order.order_status === 'delivered'
                                ? '1px solid #1E9D4F'
                                : 'none',

                            width:
                              order.order_status === 'pending'
                                ? '100px'
                                : order.order_status === 'in prep'
                                ? '100px'
                                : order.order_status === 'ready for collection'
                                ? '150px'
                                : order.order_status === 'cancelled'
                                ? '100px'
                                : order.order_status === 'waiting for prep'
                                ? '150px'
                                : order.order_status === 'collected'
                                ? '100px'
                                : order.order_status === 'rejected'
                                ? '100px'
                                : order.order_status === 'ready for deliver'
                                ? '150px'
                                : order.order_status === 'in transit'
                                ? '100px'
                                : order.order_status === 'delivered'
                                ? '100px'
                                : 'none',

                            borderRadius: '2px',
                            textAlign: 'center',
                          }}
                        >
                          {order.order_status === 'ready for deliver' && order.driver_id !== null
                            ? 'Driver Assigned'
                            : order.order_status}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <button
                          className="view_order"
                          onClick={() => {
                            showOrderDetail(order.order_id, false);
                            toggleDrawer1(index);
                          }}
                        >
                          View Order
                        </button>
                        <Drawer
                          open={openDrawerId === index}
                          onClose={() => toggleDrawer1(index) as void}
                          anchor="right"
                          // slotProps={{ backdrop: { style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' } } }}
                          slotProps={{ backdrop: { style: { opacity: 0.5 } } }}
                        >
                          {DrawerList}
                        </Drawer>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })
              ) : (
                <>
                  <StyledTableRow>
                    <StyledTableCell>No Order Data</StyledTableCell>
                  </StyledTableRow>
                </>
              )}
            </TableBody>
          </Table>
        </MyRoot>
      </TableContainer>
      <div
        aria-label="custom pagination table"
        style={{
          display: 'flex',
          justifyContent: 'start',
          width: '100%',
          backgroundColor: 'white',
          borderBottomLeftRadius: '15px',
          borderBottomRightRadius: '15px',
        }}
      >
        <TableRow>
        <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            colSpan={1}
            count={totalNumberOfOrders}
            rowsPerPage={rowsPerPage}
            page={adjustedPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={({ from, to, count }) =>
              totalNumberOfOrders === 0 ? `0-0 of 0` : `${from}-${to} of ${count}`
            }
          />
        </TableRow>
      </div>
    </Box>
  );
};

export default OrderTable;
function gradient(arg0: any, arg1: any) {
  throw new Error('Function not implemented.');
}
