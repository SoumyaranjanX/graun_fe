import React, { ReactNode, useCallback, useEffect, useState } from 'react';
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
import { useTheme } from '@/hooks';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import uberEats from '@/assets/icons/uber-eats.png';
import deliveroo from '@/assets/icons/Deliveroo.png';
import justEat from '@/assets/icons/Just-eat.png';
import printer from '@/assets/icons/printer.png';
import AnimatedButton from '@/components/AnimatedButton';
import SingleInputDateRangePicker from '@/components/rangeDatePicker';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';

import Button from '@mui/material/Button';
//import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const rejectModalstyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

//<IoCheckmarkCircleOutline />
//<IoIosCloseCircleOutline />
interface Order {
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
  '&:first-type-of': {
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

import getAllOrderAPI from '@/services/order/API/getAllOrders';
import getTempOrdersAPI from '@/services/order/API/getTempOrders';
import getOrdersAPI from '@/services/order/API/getOrders';
import getOrderDetailsAPI from '@/services/order/API/getOrderDetails';
import acceptOrderAPI from '@/services/order/API/acceptOrder';
import rejectOrderAPI from '@/services/order/API/rejectOrder';
import cancelOrderAPI from '@/services/order/API/cancelOrder';
import updateOrderStatusAPI from '@/services/order/API/updateOrderStatus';
import setPrepTimeAPI from '@/services/order/API/setPrepTime';
import confirmScheduledOrderAPI from '@/services/order/API/confirmScheduledOrder';
import getOrderCountAPI from '@/services/order/API/getOrderCount';
import getDeliveryCountAPI from '@/services/order/API/getDeliveryCount';

import { Filter, Opacity } from '@mui/icons-material';
import { clear, error } from 'console';
import { set } from 'react-hook-form';

import './notificaciones';
import { parseString } from '@/utils';
import RejectOrderModal from '@/components/order/RejectOrderModal';
import CancelOrderModal from '@/components/order/CancelOrderModal';

const OrderTable: React.FC = () => {
  const [activePage, setActivePage] = useState(0);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [totalNumberOfOrders, setTotalNumberOfOrders] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [orders, setOrders] = useState<any>([]);
  const [allOrderCount, setAllOrderCount] = useState(0);
  const [orderDetails, setOrderDetails] = useState<any>({});
  const [orderSource, setOrderSource] = useState('');
  const [activeTab, setActiveTab] = useState<string>('order_waiting');

  const [orderWaitingOrderCount, setOrderWaitingOrderCount] = useState(0);
  const [waitingForPrepOrderCount, setWaitingForPrepOrderCount] = useState(0);
  const [inPrepOrderCount, setInPrepOrderCount] = useState(0);
  const [readyForCollectionOrderCount, setReadyForCollectionOrderCount] = useState(0);
  const [collectedOrderCount, setCollectedOrderCount] = useState(0);
  const [rejectedOrderCount, setRejectedOrderCount] = useState(0);
  const [cancelledOrderCount, setCancelledOrderCount] = useState(0);

  const [selectedMenuValue, setSelectedMenuValue] = useState('');
  const [selectedPrepTime, setSelectedPrepTime] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [rejectNote, setRejectNote] = useState('');

  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [filterAmountFrom, setFilterAmountFrom] = useState('');
  const [filterAmountTo, setFilterAmountTo] = useState('');
  const [filterPaymentStatus, setFilterPaymentStatus] = useState('');
  const [filterAggregator, setFilterAggregator] = useState('');
  const [filterFulfilmentType, setFilterFulfilmentType] = useState('');

  const [tempFilterStartDate, setTempFilterStartDate] = useState('');
  const [tempFilterEndDate, setTempFilterEndDate] = useState('');
  const [tempFilterAmountFrom, setTempFilterAmountFrom] = useState('');
  const [tempFilterAmountTo, setTempFilterAmountTo] = useState('');
  const [tempFilterPaymentStatus, setTempFilterPaymentStatus] = useState('');
  const [tempFilterAggregator, setTempFilterAggregator] = useState('');
  const [tempFilterFulfilmentType, setTempFilterFulfilmentType] = useState('');
  const [orderReject, setOrderReject] = useState([]);

  const [currentOrderCancellable, setCurrentOrderCancellable] = useState(false);

  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);

  // const handleDateChange = (newDateRange) => {
  //   const [newStartDate, newEndDate] = newDateRange;
  //   setFilterStartDate(newStartDate.toISOString());
  //   setFilterStartDate(newEndDate.toISOString());
  //   console.log('newStartDate: ', filterStartDate);
  // };

  const [openDrawerId, setOpenDrawerId] = useState(null);

  const [openRejectModal, setOpenRejectModal] = useState(false);
  const handleOpenRejectModal = () => setOpenRejectModal(true);
  const handleCloseRejectModal = () => setOpenRejectModal(false);

  // Función para abrir o cerrar el Drawer de una fila específica
  const toggleDrawer1 = (index) => {
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

  const adjustedPage = totalNumberOfOrders === 0 ? 0 : activePage;

  // Adjust rowsPerPage to show all items if totalNumberOfOrders is selected
  const adjustedRowsPerPage = rowsPerPage === -1 ? totalNumberOfOrders : rowsPerPage;

  const { showAlert } = useTheme();
  const { mutate: getAllOrderAPICall } = getAllOrderAPI();
  const { mutate: getTempOrdersCall } = getTempOrdersAPI();
  const { mutate: getOrdersCall } = getOrdersAPI();
  const { mutate: getOrderDetailsCall } = getOrderDetailsAPI();
  const { mutate: acceptOrderCall } = acceptOrderAPI();
  const { mutate: rejectOrderCall } = rejectOrderAPI();
  const { mutate: cancelOrderCall } = cancelOrderAPI();
  const { mutate: updateOrderStatusCall } = updateOrderStatusAPI();
  const { mutate: setPrepTimeCall } = setPrepTimeAPI();
  const { mutate: confirmScheduledOrderCall } = confirmScheduledOrderAPI();
  const { mutate: getOrderCountCall } = getOrderCountAPI();
  const { mutate: getDeliveryCount } = getDeliveryCountAPI();

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
            <p>Order ID: #${orderDetails.order_id}</p>
            <p>${orderDetails.order_source.order_source}</p>
            </div>
        
            <div style="position: relative; top: -30px; font-size: small">
                <p>Order received:
                ${new Date(
                  activeTab === 'order_waiting'
                    ? `${orderDetails.order_date}T${orderDetails.order_time}`
                    : `${orderDetails.order_date.split('T')[0]}T${orderDetails.order_time}`,
                ).toLocaleString('en-US', {
                  month: 'numeric',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: false,
                })}
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
                    <div key={index} style="display: flex; justify-content: space-between">
                        <p style="font-weight: bold">${item.quantity} x ${item.item_name}</p>
                        <p>${((parseFloat(item.unit_price) * item.quantity) / 100).toFixed(2)}</p>
                    </div>
                    ${item.modifiers
                      .map(
                        (modifier: Item) => `
                        <div key={index} style="display: flex; justify-content: space-between">
                            <p style="margin-left: 10px">${modifier.quantity} x ${modifier.item_name}</p>
                            <p>${((parseFloat(modifier.unit_price) * item.quantity) / 100).toFixed(
                              2,
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
                <p>${(parseFloat(orderDetails.delivery_charge) / 100).toFixed(2)}</p>
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
            <p> ${orderSource == 'deliveroo' ? 'Deliveroo' : 'Uber'} Acces Code: ${
        orderDetails.customer?.contact_access_code || 'N/A'
      }</p>
        
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
    waiting_for_prep: 'waiting for prep',
    in_prep: 'in prep',
    ready_for_collection: 'ready for collection',
    collected: 'collected',
    rejected: 'rejected',
    cancelled: 'cancelled',
  };

  const fetchOrders = async () => {
    try {
      const payload: any = {
        pageNumber: activePage + 1,
        recordsPerPage: rowsPerPage,
      };

      if (activeTab == 'all_orders') {
        if (filterPaymentStatus) {
          payload.payment_status = filterPaymentStatus;
        }

        if (filterFulfilmentType) {
          // no filter for temp order now
          payload.fulfilment_type = filterFulfilmentType;
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

        if (filterAmountFrom && filterAmountTo) {
          payload.priceRange = {
            from: parseFloat(filterAmountFrom) * 100,
            to: parseFloat(filterAmountTo) * 100,
          };
        }

        getAllOrderAPICall(payload, {
          onSuccess: (data) => {
            setOrders(data.data);
            setTotalNumberOfPages(data.totalPages);
            setTotalNumberOfOrders(parseInt(data.totalCount));
            setAllOrderCount(parseInt(data.totalCount));
          },
          onError: (error) => {
            console.error('Error:', error);
            throw new Error('Failed to fetch orders');
          },
        });
      } else if (activeTab == 'order_waiting' || activeTab == 'rejected') {
        if (filterPaymentStatus) {
          payload.payment_status = filterPaymentStatus === 'paid' ? 1 : 0;
        }

        if (filterAggregator) {
          payload.source_id =
            filterAggregator == 'deliveroo'
              ? 1
              : filterAggregator == 'justeats'
              ? 2 
              : filterAggregator == 'ubereats'
              ? 3
              : 0;
        }

        if (filterStartDate && filterEndDate) {
          payload.orderDate = {
            from: filterStartDate,
            to: filterEndDate,
          };
        }

        if (filterAmountFrom && filterAmountTo) {
          payload.priceRange = {
            from: parseFloat(filterAmountFrom) * 100,
            to: parseFloat(filterAmountTo) * 100,
          };
        }

        if (activeTab === 'order_waiting') {
          payload.isPending = true;
        } else {
          payload.temp_order_status_id = 3;
        }
        getTempOrdersCall(payload, {
          onSuccess: (data) => {
            // Handle successful response
            const tempData = data.data;
            const orders: Order[] = [];
            // Iterate over each temp order
            tempData.forEach((tempOrder: any) => {
              // Extract DMSOrder object from the temp order
              const dmsOrder = tempOrder.dms_order_object;

              // Create an order object conforming to the Order interface
              const order: Order = {
                temp_order: tempOrder.temp_order_id,
                order_id: dmsOrder.order_id,
                sos_order_number: dmsOrder.aggregator_order_number,
                order_date: dmsOrder.order_date,
                order_time: dmsOrder.order_time,
                total_order_amount: dmsOrder.total_price,
                delivery_mode: dmsOrder.delivery_mode,
                order_status: tempOrder.temp_order_status,
                source_image: tempOrder.source_image,
                customer_paid_status: dmsOrder.customer_paid_status,
                order_type_id: dmsOrder.asap ? 1 : 2,
              };

              // Push the order object into the orders array
              orders.push(order);
            });
            setOrders(orders);
            setTotalNumberOfPages(data.totalPages);
            setTotalNumberOfOrders(parseInt(data.totalCount));
            activeTab === 'order_waiting'
              ? setOrderWaitingOrderCount(parseInt(data.totalCount))
              : setRejectedOrderCount(parseInt(data.totalCount));
          },
          onError: (error) => {
            // Handle error
            console.error('Error:', error);
            throw new Error('Failed to fetch orders');
          },
        });
      } else {
        //filters:
        if (filterPaymentStatus) {
          payload.customer_paid_status = filterPaymentStatus === 'paid';
        }

        if (filterFulfilmentType) {
          payload.delivery_mode = filterFulfilmentType;
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

        if (filterAmountFrom && filterAmountTo) {
          payload.priceRange = {
            from: parseFloat(filterAmountFrom) * 100,
            to: parseFloat(filterAmountTo) * 100,
          };
        }

        payload.order_status = orderStatusList[activeTab];
        getOrdersCall(payload, {
          onSuccess: (data) => {
            // Handle successful response
            setOrders(data.data);
            setTotalNumberOfPages(data.totalPages);
            setTotalNumberOfOrders(parseInt(data.totalCount));
            if (activeTab == 'waiting_for_prep') {
              setWaitingForPrepOrderCount(parseInt(data.totalCount));
            } else if (activeTab == 'in_prep') {
              setInPrepOrderCount(parseInt(data.totalCount));
            } else if (activeTab == 'ready_for_collection') {
              setReadyForCollectionOrderCount(parseInt(data.totalCount));
            } else if (activeTab == 'collected') {
              setCollectedOrderCount(parseInt(data.totalCount));
            } else if (activeTab == 'rejected') {
              setRejectedOrderCount(parseInt(data.totalCount));
            } else if (activeTab == 'cancelled') {
              setCancelledOrderCount(parseInt(data.totalCount));
            }
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
    console.log('active Tab: ', activeTab);
    try {
      const payload: any = {};

      if (filterPaymentStatus) {
        payload.payment_status = filterPaymentStatus;
      }

      if (filterFulfilmentType) {
        // no filter for temp order now
        payload.fulfilment_type = filterFulfilmentType;
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

      if (filterAmountFrom && filterAmountTo) {
        payload.priceRange = {
          from: parseFloat(filterAmountFrom) * 100,
          to: parseFloat(filterAmountTo) * 100,
        };
      }

      getOrderCountCall(payload, {
        onSuccess: (data) => {
          const count = data.data;

          setOrderWaitingOrderCount(count.TempOrderCount);
          setWaitingForPrepOrderCount(count.waiting_for_prep);
          setInPrepOrderCount(count.in_prep);
          setReadyForCollectionOrderCount(count.ready_for_collection);
          setCollectedOrderCount(count.collected);
          setRejectedOrderCount(count.rejectedCount);
          setCancelledOrderCount(count.cancelled);
          setAllOrderCount(count.allOrderCount);
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

  const clearFilters = () => {
    setFilterStartDate('');
    setFilterEndDate('');
    setFilterAmountFrom('');
    setFilterAmountTo('');
    setFilterPaymentStatus('');
    setFilterAggregator('');
    setFilterFulfilmentType('');
    setTempFilterStartDate('');
    setTempFilterEndDate('');
    setTempFilterAmountFrom('');
    setTempFilterAmountTo('');
    setTempFilterPaymentStatus('');
    setTempFilterAggregator('');
    setTempFilterFulfilmentType('');
    handleClose();
  };

  const setFilters = () => {
    setFilterStartDate(tempFilterStartDate);
    setFilterEndDate(tempFilterEndDate);
    setFilterAmountFrom(tempFilterAmountFrom);
    setFilterAmountTo(tempFilterAmountTo);
    setFilterPaymentStatus(tempFilterPaymentStatus);
    setFilterAggregator(tempFilterAggregator);
    setFilterFulfilmentType(tempFilterFulfilmentType);
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
            setOpen(true);
            tempData.source_name == 'uber eats' ? setCurrentOrderCancellable(true) : setCurrentOrderCancellable(false)
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
            setOrderDetails(data);
            setOrderSource(data.order_source.order_source);
            data.order_source.order_source == 'uber eats' ? setCurrentOrderCancellable(true) : setCurrentOrderCancellable(false)
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
    if (activeTab == 'order_waiting') {
      acceptOrderCall(
        {
          temp_order_id: tempOrderId,
        },
        {
          onSuccess: (data) => {
            // Handle successful response
            // alert('Order Accepted!');
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

  const rejectOrder = async (tempOrderId: number | null, rejectNote: any, rejectReason: any) => {
    if (tempOrderId == null) {
      // alert('Unable to accept order with null temp order id!');
      showAlert({ message: 'Unable to accept order with null temp order id!', type: 'error' });
      return;
    }
    if (rejectReason == null || rejectReason == '' || rejectNote == null || rejectNote == '') {
      // alert('Provide a valid Rejection Reason and a note!');
      showAlert({ message: 'Provide a valid Rejection Reason and a note!', type: 'error' });
      return;
    }
    if (activeTab == 'order_waiting') {
      rejectOrderCall(
        {
          temp_order_id: tempOrderId,
          reason: rejectReason,
          note: rejectNote,
        },
        {
          onSuccess: (data) => {
            showAlert({ message: 'Order Rejected!', type: 'success' });
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
  const cancelOrder = async (orderId: number | null, cancelNote: any, cancelReason: any) => {
    if (orderId == null) {
      // alert('Unable to accept order with null  order id!');
      showAlert({ message: 'Unable to cancel order with null order id!', type: 'error' });
      return;
    }
    if (rejectReason == null || rejectReason == '' || rejectNote == null || rejectNote == '') {
      // alert('Provide a valid Rejection Reason and a note!');
      showAlert({ message: 'Provide a valid Rejection Reason and a note!', type: 'error' });
      return;
    }
    if (activeTab == 'order_waiting') {
      cancelOrderCall(
        {
          order_id: orderId,
          reason: cancelReason,
          note: cancelNote,
        },
        {
          onSuccess: (data) => {
            showAlert({ message: 'Order Cancelled!', type: 'success' });
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
    if (activeTab == 'order_waiting' || activeTab == 'rejected') {
      console.log('Waiting Orders are not allowed to update status!');
      return;
    }

    if (selectedMenuValue == null || selectedMenuValue == '') {
      alert('Please select order status to update');
      return;
    }

    if (!orderDetails.confirmed) {
      confirmOrder(orderId);
    }

    updateOrderStatusCall(
      {
        order_id: orderId,
        new_order_status: selectedMenuValue,
      },
      {
        onSuccess: (data) => {
          // Handle successful response
          // alert('Order Status Updated!');
          showAlert({ message: 'Order Status Updated!', type: 'success' });
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

  const confirmOrder = async (orderId: number) => {
    confirmScheduledOrderCall(
      {
        order_id: orderId,
      },
      {
        onSuccess: (data) => {
          // Handle successful response
          fetchOrders();
          setOpen(false);
        },
        onError: (error: any) => {
          // Handle error
          console.error('Error:', error);
          // alert(error.message);
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
    filterAmountFrom,
    filterAmountTo,
    filterPaymentStatus,
    filterAggregator,
    filterFulfilmentType,
  ]);

  // const [open, setOpen] = React.useState(false);

  const [openPop, setOpenPop] = useState(false);
  const functionOpenPopup = () => setOpenPop(true);
  const closePopup = () => setOpenPop(false);

  const [openCancelPop, setOpenCancelPop] = useState(false);
  const functionOpenCancelPopup = () => setOpenCancelPop(true);
  const closeCancelPopup = () => setOpenCancelPop(false);

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
      label: 'Ready to Deliver',
    },
    {
      value: 'ready for collection',
      label: 'Ready to Collect',
    },
    {
      value: 'collected',
      label: 'Collected',
    },
    {
      value: 'cancel',
      label: 'cancel',
    },
  ];

  useEffect(() => {
    if (orderDetails && orderDetails.order_source && orderDetails.order_source.order_source) {
      if (orderDetails.order_source.order_source == 'deliveroo') {
        setOrderReject([
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
        ]);
      } else if (orderDetails.order_source.order_source == "uber eats") {
        setOrderReject([
          { value: 'ITEM_ISSUE', label: 'Item Issue' },
          { value: 'KITCHENCLOSED', label: 'Kitchen Closed' },
          { value: 'CUSTOMER_CALLED_TO_CANCEL', label: 'Customer Called to Cancel' },
          { value: 'RESTAURANT_TOO_BUSY', label: 'Restaurant Too Busy' },
          { value: 'ORDER_VALIDATION', label: 'Order Validation' },
          { value: 'STORE_CLOSED', label: 'Store Closed' },
          { value: 'TECHNICAL_FAILURE', label: 'Technical Failure' },
          { value: 'POS_NOT_READY', label: 'POS Not Ready' },
          { value: 'POS_OFFLINE', label: 'POS Offline' },
          { value: 'CAPACITY', label: 'Capacity' },
          { value: 'ADDRESS', label: 'Address Issue' },
          { value: 'SPECIAL_INSTRUCTIONS', label: 'Special Instructions' },
          { value: 'PRICING', label: 'Pricing Issue' },
          { value: 'UNKNOWN', label: 'Unknown Issue' },
          { value: 'OTHER', label: 'Other' },
        ]);
      }
    } 

  }, [orderDetails])

 

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
          padding: '20px',
          overflowX: 'hidden',
        }}
        role="presentation"
        onClick={() => toggleDrawer(false)}
      >
        <div style={{ display: 'flex' }}>
          <div
            style={{
              backgroundColor: '#EAEAEA',
              padding: '5px',
              marginRight: '10px',
              borderRadius: '20px',
              fontWeight: 600,
              position: 'relative',
              top: -4,
            }}
            className="list-coustom"
          >
            {/* <MdFastfood /> */} GRAUN
          </div>
          Order ID: #{orderDetails.sos_order_number}
        </div>
        <div
          style={{
            fontSize: '0.9rem',
            marginLeft: '5px',
            textTransform: 'capitalize',
            color:
              (orderDetails.order_status?.order_status || orderDetails.order_status) == 'pending'
                ? '#FF734D'
                : (orderDetails.order_status?.order_status || orderDetails.order_status) == 'in prep'
                ? '#1D7FBB'
                : (orderDetails.order_status?.order_status || orderDetails.order_status) == 'ready for collection'
                ? '#734EC5'
                : (orderDetails.order_status?.order_status || orderDetails.order_status) == 'cancelled'
                ? '#A7A7A7'
                : (orderDetails.order_status?.order_status || orderDetails.order_status) == 'waiting for prep'
                ? '#E5B405'
                : (orderDetails.order_status?.order_status || orderDetails.order_status) == 'collected'
                ? '#2BAA76'
                : (orderDetails.order_status?.order_status || orderDetails.order_status) == 'rejected'
                ? '#BA0000'
                : 'black',
          }}
        >
          {orderDetails.order_status?.order_status || orderDetails.order_status}
        </div>

        <Grid
          container
          spacing={1}
          justifyContent={'space-between'}
          sx={{
            padding: '10px',
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
                  fontSize: '0.8rem',
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
                fontSize: '0.8rem',
                marginTop: '10px',
              }}
            >
              <p>{orderDetails.customer.customer_name}</p>
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
                <p className="contact_number">{orderDetails.customer.contact_number}</p>
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
                  {orderSource == 'deliveroo' ? 'Deliveroo' : 'Uber'} Acces Code:
                </p>{' '}
                <p className="email">{orderDetails.customer?.contact_access_code || 'N/A'}</p>
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
                  fontSize: '0.8rem',
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
                  fontSize: '0.8rem',
                  marginTop: '10px',
                }}
              >
                <p className="flatNum">{orderDetails.address.line1}, </p>
                <p className="street">{orderDetails.address.line2}, </p>
                <p className="city">{orderDetails.address.city}</p>
                <p className="postalCode">{orderDetails.address.postcode}</p>
              </div>
            ) : (
              <div
                className="deliveryDetails"
                style={{
                  fontSize: '0.8rem',
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
          <img
            src={orderDetails.source_image}
            alt="Order Source"
            style={{ width: '35px', height: '35px', borderRadius: '20px' }}
          />
          <div style={{ marginLeft: '10px', fontSize: '0.8rem' }}>
            <div style={{ display: 'flex', gap: 5 }}>
              Order Placed time :{' '}
              <p className="order_placed_time" style={{ fontSize: '0.8rem', color: 'grey' }}>
                {new Date(
                  activeTab === 'order_waiting'
                    ? `${orderDetails.order_date}T${orderDetails.order_time}`
                    : `${orderDetails.order_date.split('T')[0]}T${orderDetails.order_time}`,
                ).toLocaleString('en-US', {
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
              Start Preparation time :{' '}
              <p style={{ fontSize: '0.8rem', color: 'grey' }}>
                {new Date(orderDetails.start_preparing_at).toLocaleString('en-US', {
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
              <p style={{ fontSize: '0.8rem', color: 'grey' }}>
                {new Date(orderDetails.prepare_for).toLocaleString('en-US', {
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'unset',
              fontSize: '0.8rem',
              marginLeft: 70,
            }}
          >
            <div style={{ display: 'flex', gap: 5 }}>
              Payment Status :{' '}
              <p style={{ fontSize: '0.8rem', color: 'grey' }}>
                {orderDetails.customer_paid_status ? 'Paid' : 'Unpaid'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 5 }}>
              Order Preparation :{' '}
              <p style={{ fontSize: '0.8rem', color: 'grey', textTransform: 'capitalize' }}>
                {orderDetails.order_type?.order_type || ''}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 5 }}>
              Fullfillment Type :{' '}
              <p style={{ fontSize: '0.8rem', color: 'grey', textTransform: 'capitalize' }}>
                {orderDetails.delivery_mode?.delivery_mode || ''}
              </p>
            </div>
          </div>
        </Box>

        <div
          style={{
            marginTop: '10px',
            display: 'flex',
            fontSize: '0.8rem',
            justifyContent: 'end',
            marginBottom: '10px',
          }}
        >
          {/* {' '}
          <div
            style={{
              marginRight: '5px',
              marginTop: '3px',
            }}
          >
            <GoPencil />
          </div>
          Edit Order */}
        </div>

        <div
          style={{
            border: '1px solid #E0E0E0',
            borderRadius: '10px',
            boxShadow: '0px 0px 5px 0px #E0E0E0',
          }}
        >
          <TableContainer sx={{}}>
            <Table sx={{ minWidth: 200 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>Items</TableCell>
                  <TableCell>Qty</TableCell>
                  <TableCell>Unit Price</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderDetails.items.map((item: Item, index: React.Key | null | undefined) => (
                  <>
                    <StyledTableRow key={index}>
                      <StyledTableCell>{item.item_name}</StyledTableCell>
                      <StyledTableCell>{item.quantity}</StyledTableCell>
                      <StyledTableCell>£ {parseFloat((parseFloat(item.unit_price) / 100).toFixed(2))}</StyledTableCell>
                      <StyledTableCell>£ {parseFloat((parseFloat(item.item_total) / 100).toFixed(2))}</StyledTableCell>
                    </StyledTableRow>
                    {item.modifiers &&
                      item.modifiers.map((modifier: Item, modifierIndex: number) => (
                        <StyledTableRow key={modifierIndex}>
                          <StyledTableCell
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
                          <StyledTableCell>{modifier.quantity}</StyledTableCell>
                          <StyledTableCell>
                            £ {parseFloat((parseFloat(modifier.unit_price) / 100).toFixed(2))}
                          </StyledTableCell>
                          <StyledTableCell>
                            £ {parseFloat((parseFloat(modifier.modifier_total) / 100).toFixed(2))}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </>
                ))}
                <StyledTableRow>
                  <TableCell>Subtotal</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>£ {parseFloat((parseFloat(orderDetails.subtotal_amount) / 100).toFixed(2))}</TableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {orderSource == 'deliveroo' ? (
            <></>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'end',
              }}
            >
              <p>SERVICE CHARGE</p>
              <p
                style={{
                  marginLeft: '5px',
                  border: '1px solid #E0E0E0',
                  width: '100px',
                }}
              >
                £ 5
              </p>
            </div>
          )}

          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            <p>BAG CHARGE</p>
            <p
              style={{
                marginLeft: '5px',
                border: '1px solid #E0E0E0',
                width: '100px',
              }}
            >
              £ {parseFloat((parseFloat(orderDetails?.bag_fee || '0') / 100).toFixed(2))}
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            <p>CUSTOMER DELIVERY FEE</p>
            <p
              style={{
                marginLeft: '5px',
                border: '1px solid #E0E0E0',
                width: '100px',
              }}
            >
              £ {parseFloat((parseFloat(orderDetails?.delivery_charge || '0') / 100).toFixed(2))}
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            <p>DISCOUNT</p>
            <p
              style={{
                marginLeft: '5px',
                border: '1px solid #E0E0E0',
                width: '100px',
              }}
            >
              £ {parseFloat((parseFloat(orderDetails?.discounts || '0') / 100).toFixed(2))}
            </p>
          </div>

          {orderSource == 'deliveroo' ? (
            <></>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'end',
              }}
            >
              <p>VAT 20%</p>
              <p
                style={{
                  marginLeft: '5px',
                  border: '1px solid #E0E0E0',
                  width: '100px',
                }}
              >
                £ 5
              </p>
            </div>
          )}

          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            <p>ORDER TOTAL</p>
            <p
              style={{
                marginLeft: '5px',
                border: '1px solid #E0E0E0',
                width: '100px',
              }}
            >
              £ {parseFloat(parseString((parseFloat(orderDetails.total_order_amount) / 100).toFixed(2)) || '0.0')}
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
          }}
        >
          <Box
            sx={{
              padding: '10px',
              border: '1px solid #E0E0E0',
              borderRadius: '10px',
              width: '80%',
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
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                  }}
                >
                  Order Note:
                </p>
                <p
                  style={{
                    color: 'grey',
                    fontSize: '0.8rem',
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
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                  }}
                >
                  Cutlery Notes:
                </p>
                <p
                  style={{
                    color: 'grey',
                    fontSize: '0.8rem',
                  }}
                >
                  {orderDetails.notes.cutlery_notes}
                </p>
              </>
            ) : (
              <></>
            )}
          </Box>
          <button
            style={{
              padding: '23px',
              width: '20%',
              marginBottom: '50px',
              marginLeft: '10px',
              fontSize: '0.8rem',
              backgroundColor: 'black',
              color: 'white',
              borderRadius: '20px',
              height: '20px',
              marginTop: '10px',
              border: '1px solid #E0E0E0',
              display: 'flex',
              alignItems: 'center',
              boxShadow: '0px 0px 10px 0px #E0E0E0',
              transition: 'background-color 0.3s ease',
            }}
            onClick={printOrder}
            onMouseOut={(e) => {
              const target = e.target as HTMLElement;
              target.style.backgroundColor = 'black';
              target.style.color = 'white';
            }}
            onMouseOver={(e) => {
              const target = e.target as HTMLElement;
              target.style.backgroundColor = 'white';
              target.style.color = 'black';
            }}
          >
            Print Order
          </button>
        </div>

        {(orderDetails.order_status?.order_status || orderDetails.order_status) == 'cancelled' ||
        (orderDetails.order_status?.order_status || orderDetails.order_status) == 'rejected' ||
        (orderDetails.order_status?.order_status || orderDetails.order_status) == 'collected' ? (
          <></>
        ) : (orderDetails.order_status?.order_status || orderDetails.order_status) === 'pending' ? (
          orderDetails.prepare_for == '' || orderDetails.prepare_for == null ? (
            <div
              style={{
                marginTop: '10px',
              }}
            >
              <p>Select Prep Time</p>

              <FormControl
                style={{
                  width: '60%',
                  height: '40px',
                  marginTop: '10px',
                }}
              >
                <TextField
                  id="outlined-select-time"
                  select
                  placeholder="Select Prep Time"
                  value={selectedPrepTime}
                  onChange={handlePrepTimeChange}
                  style={{
                    width: '70%',
                    height: '40px',
                    marginTop: '10px',
                  }}
                >
                  {/* order_waiting */}
                  {activeTab === 'order_waiting' &&
                    (orderDetails.order_status?.order_status || orderDetails.order_status) == 'waiting for prep' &&
                    time.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                </TextField>
              </FormControl>
            </div>
          ) : (
            <></>
          )
        ) : (
          <div
            style={{
              marginTop: '10px',
            }}
          >
            <p>Update Order Status</p>

            <FormControl
              style={{
                width: '60%',
                height: '40px',
                marginTop: '10px',
              }}
            >
              <TextField
                id="outlined-select-time"
                select
                placeholder="Select Prep Time"
                value={selectedMenuValue}
                onChange={handleMenuChange}
                style={{
                  width: '70%',
                  height: '40px',
                  marginTop: '10px',
                }}
              >
                
                {/* waiting_for_prep */}
                {(orderDetails.order_status?.order_status || orderDetails.order_status) == 'waiting for prep' &&
                  orderStatus.map((option) => {
                    if (option.value === 'in prep') {
                      return (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      );
                    } else {
                      return <></>;
                    }
                  })}

                {/* in_prep */}
                {(orderDetails.order_status?.order_status || orderDetails.order_status) == 'in prep' &&
                  orderStatus.map((option) => {
                    if (orderDetails.delivery_mode?.delivery_mode == 'restaurant') {
                      if (option.value === 'ready for deliver') {
                        return (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        );
                      } else {
                        return <></>;
                      }
                    } else {
                      if (option.value === 'ready for collection') {
                        return (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        );
                      } else {
                        return <></>;
                      }
                    }
                  })}
                {/* ready_for_collection */}
                {(orderDetails.order_status?.order_status || orderDetails.order_status) == 'ready for collection' &&
                  orderStatus.map((option) => {
                    if (option.value === 'collected') {
                      return (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      );
                    } else {
                      return <></>;
                    }
                  })
                }
                
                {(currentOrderCancellable && orderStatus.map((option) => {
                    if (option.value === 'cancel') {
                      return (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      );
                    } else {
                      return <></>;
                    }
                  }))}
              </TextField>
            </FormControl>
          </div>
        )}

        {(orderDetails.order_status?.order_status || orderDetails.order_status) == 'pending' ? (
          <div
            style={{
              display: 'flex',
              position: 'relative',
              top: '30px',
              left: '60%',
              padding: '10px',
            }}
          >
            <button
              style={{
                backgroundColor: 'red',
                color: 'white',
                padding: '10px',
                borderRadius: '20px',
                width: '15%',
                height: '30px',
                fontSize: '0.7rem',
                lineHeight: '0.5rem',
                marginRight: '10px',
              }}
              onClick={() => {
                functionOpenPopup();
              }}
            >
              Reject
            </button>

            <RejectOrderModal
              orderReject={orderReject}
              rejectOrder={rejectOrder}
              orderDetails={orderDetails}
              openPop={openPop}
              closePopup={closePopup}
            />

            <button
              style={{
                backgroundColor: 'black',
                color: 'white',
                padding: '10px',
                borderRadius: '20px',
                width: '20%',
                height: '30px',
                fontSize: '0.7rem',
                lineHeight: '0.5rem',
              }}
              onClick={() => {
                acceptOrder(orderDetails.temp_order_id || null),
                  showAlert({ message: 'Order Accepted!', type: 'success' });
                toggleDrawer(false);
              }}
            >
              Accept Order
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              position: 'relative',
              top: '30px',
              left: '60%',
              padding: '10px',
            }}
          >
            <button
              style={{
                backgroundColor: 'black',
                color: 'white',
                padding: '10px',
                borderRadius: '20px',
                width: '40%',
                height: '30px',
                fontSize: '0.7rem',
                lineHeight: '0.5rem',
                display:
                  activeTab === 'cancelled' ||
                  activeTab === 'rejected' ||
                  (orderDetails.order_status?.order_status || orderDetails.order_status) == 'cancelled' ||
                  (orderDetails.order_status?.order_status || orderDetails.order_status) == 'rejected' ||
                  (orderDetails.order_status?.order_status || orderDetails.order_status) == 'collected'
                    ? 'none'
                    : 'block',
              }}
              onClick={() => {
                (selectedMenuValue == 'cancel' && currentOrderCancellable)
                ? functionOpenCancelPopup()
                : updateOrderStatus(orderDetails.order_id);
              }}
            >
              {(selectedMenuValue == 'cancel' && currentOrderCancellable)? 'Cancel Order' : 'Update Order Status'}
            </button>
            <CancelOrderModal
              cancelOrder={cancelOrder}
              orderDetails={orderDetails}
              openPop={openCancelPop}
              closePopup={closeCancelPopup}
            />
          </div>
          
        )}
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
          Customer Orders
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
              marginBottom: '-7px',
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
          //   aria-controls="menu-appbar"
          //   aria-haspopup="true"
          color="inherit"
          sx={{
            position: 'absolute',
            top: '15px',
            right: '-80px',
            border: '1px solid #E0E0E0',
            borderRadius: '20px',
            width: '120px',
          }}
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
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
              <p>Calende r</p>
              <div
                style={{
                  display: 'flex',
                  border: '1px solid grey',
                  borderRadius: '20px',
                  justifyContent: 'space-between',
                  height: '45px',
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
                  onChange={(e) => setTempFilterStartDate(e.target.value)}
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
                  onChange={(e) => setTempFilterEndDate(e.target.value)}
                />
              </div>
            </div>

            <div
              style={{
                padding: '10px',
              }}
            >
              <p>Amount</p>
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                }}
              >
                <input
                  type="number"
                  placeholder="From"
                  style={{
                    border: '1px solid grey',
                    borderRadius: '20px',
                    height: '30px',
                    width: '150px',
                    padding: '5px',
                  }}
                  value={tempFilterAmountFrom}
                  onChange={(e) => setTempFilterAmountFrom(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="To"
                  style={{
                    border: '1px solid grey',
                    borderRadius: '20px',
                    height: '30px',
                    width: '150px',
                    padding: '5px',
                  }}
                  value={tempFilterAmountTo}
                  onChange={(e) => setTempFilterAmountTo(e.target.value)}
                />
              </div>
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
              </div>
              <div
                style={{
                  padding: '10px',
                }}
              >
                <p>Aggregators</p>
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
                  <option value="ubereats">Uber Eats</option>
                </select>
              </div>
            </div>

            <div
              style={{
                padding: '10px',
              }}
            >
              <p>Order Mode</p>
              <select
                name="order_mode"
                id="order_mode"
                style={{
                  width: '150px',
                  height: '35px',
                  borderRadius: '20px',
                  padding: '5px',
                }}
                value={tempFilterFulfilmentType}
                onChange={(e) => setTempFilterFulfilmentType(e.target.value)}
              >
                <option value="">Select</option>
                <option value="deliveroo">Deliveroo</option>
                <option value="restaurant">Restaurants</option>
              </select>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px',
              }}
            >
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
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Grid container spacing={0} display={'flex'}>
          <Grid
            item
            xs={1}
            style={{
              borderBottom: activeTab === 'all_orders' ? '3px solid black' : 'none',
            }}
          >
            <button
              className=""
              style={{
                position: 'relative',
              }}
              onClick={(e) => {
                handleTabChange('all_orders');
              }}
            >
              <div
                id="n_allOrder"
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  width: '23px',
                  height: '20px',
                  borderRadius: '50%',
                  textAlign: 'center',
                  position: 'absolute',
                  top: '-15px',
                  left: '105%',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {allOrderCount}
              </div>
              All Orders
            </button>
          </Grid>
          <Grid
            item
            xs={2}
            style={{
              borderBottom: activeTab === 'order_waiting' ? '3px solid black' : 'none',
            }}
          >
            <button
              className=""
              style={{
                position: 'relative',
              }}
              onClick={(e) => {
                handleTabChange('order_waiting');
              }}
            >
              <div
                id="n_WaitingOrder"
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  width: '23px',
                  height: '20px',
                  borderRadius: '50%',
                  textAlign: 'center',
                  position: 'absolute',
                  top: -15,
                  left: '102%',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {orderWaitingOrderCount}
              </div>
              Order waiting
            </button>
          </Grid>
          <Grid
            item
            xs={2}
            style={{
              borderBottom: activeTab === 'waiting_for_prep' ? '3px solid black' : 'none',
            }}
          >
            <button
              className=""
              style={{
                position: 'relative',
              }}
              onClick={(e) => {
                handleTabChange('waiting_for_prep');
              }}
            >
              <div
                id="n_WaitingPrep"
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  width: '23px',
                  height: '20px',
                  borderRadius: '50%',
                  textAlign: 'center',
                  position: 'absolute',
                  top: -15,
                  left: '102%',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {waitingForPrepOrderCount}
              </div>
              Waiting for Prep
            </button>
          </Grid>
          <Grid
            item
            xs={1}
            style={{
              borderBottom: activeTab === 'in_prep' ? '3px solid black' : 'none',
              textAlign: 'center',
            }}
          >
            <button
              className=""
              style={{
                position: 'relative',
              }}
              onClick={(e) => {
                handleTabChange('in_prep');
              }}
            >
              <div
                id="n_InPrep"
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  width: '23px',
                  height: '20px',
                  borderRadius: '50%',
                  textAlign: 'center',
                  position: 'absolute',
                  top: -15,
                  left: '99%',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {inPrepOrderCount}
              </div>
              In Prep
            </button>
          </Grid>
          <Grid
            item
            xs={2}
            style={{
              borderBottom: activeTab === 'ready_for_collection' ? '3px solid black' : 'none',
            }}
          >
            <button
              className=""
              style={{
                position: 'relative',
              }}
              onClick={(e) => {
                handleTabChange('ready_for_collection');
              }}
            >
              <div
                id="n_ReadyForCollection"
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  width: '23px',
                  height: '20px',
                  borderRadius: '50%',
                  textAlign: 'center',
                  position: 'absolute',
                  top: -15,
                  left: '99%',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {readyForCollectionOrderCount}
              </div>
              Ready for collection
            </button>
          </Grid>
          <Grid
            item
            xs={1}
            style={{
              borderBottom: activeTab === 'collected' ? '3px solid black' : 'none',
            }}
          >
            <button
              className=""
              style={{
                position: 'relative',
              }}
              onClick={(e) => {
                handleTabChange('collected');
              }}
            >
              <div
                id="n_Collected"
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  width: '23px',
                  height: '20px',
                  borderRadius: '50%',
                  textAlign: 'center',
                  position: 'absolute',
                  top: -15,
                  left: '101%',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {collectedOrderCount}
              </div>
              Collected
            </button>
          </Grid>
          <Grid
            item
            xs={1}
            paddingLeft="2rem"
            style={{
              borderBottom: activeTab === 'rejected' ? '3px solid black' : 'none',
            }}
          >
            <button
              className=""
              style={{
                position: 'relative',
              }}
              onClick={(e) => {
                handleTabChange('rejected');
              }}
            >
              <div
                id="n_Delivered"
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  width: '23px',
                  height: '20px',
                  borderRadius: '50%',
                  textAlign: 'center',
                  position: 'absolute',
                  top: -15,
                  left: '102%',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {rejectedOrderCount}
              </div>
              Rejected
            </button>
          </Grid>
          <Grid
            item
            xs={2}
            style={{
              borderBottom: activeTab === 'cancelled' ? '3px solid black' : 'none',
            }}
          >
            <button
              className=""
              style={{
                position: 'relative',
              }}
              onClick={(e) => {
                handleTabChange('cancelled');
              }}
            >
              <div
                id="n_Cancelled"
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  width: '23px',
                  height: '20px',
                  borderRadius: '50%',
                  textAlign: 'center',
                  position: 'absolute',
                  top: -15,
                  left: '99%',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {cancelledOrderCount}
              </div>
              Cancelled
            </button>
          </Grid>
        </Grid>
      </Box>

      <TableContainer
        sx={{
          topBorder: '1px solid #E0E0E0',
        }}
      >
        <MyRoot>
          <Table>
            <TableHead sx={{height: 60}}>
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
                  {/* <img
                    src={JustEat}
                    alt="JustEat"
                    style={{
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      backgroundColor: '#FFB953',
                      padding: '5px',
                      position: 'absolute',
                      top: '13px',
                      left: '40px',
                    }}
                  /> */}
                  <img
                    src={deliveroo}
                    alt="Deliveroo"
                    style={{
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      // backgroundColor: '#9FFFFE',
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
                    }}
                  >
                    Order ID
                  </div>
                </TableCell>
                <TableCell>
                  <button
                    style={{
                      display: 'flex',
                      // marginLeft: '20px',
                      marginTop: '-5px',
                    }}
                  >
                    Order Date
                    <div
                      style={{
                        // marginLeft: '5px',
                        marginTop: '-5px',
                      }}
                    >
                      <SwapVertIcon />
                    </div>
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    style={{
                      display: 'flex',
                      // marginLeft: '20px',
                      marginTop: '-5px',
                    }}
                  >
                    Order Total
                    <div
                      style={{
                        marginLeft: '5px',
                        marginTop: '-5px',
                      }}
                    >
                      <SwapVertIcon />
                    </div>
                  </button>
                </TableCell>
                <TableCell>
                  <div
                    style={{
                      display: 'flex',
                      marginTop: '-13px',
                    }}
                  >
                    Fullfillment Type
                  </div>
                </TableCell>
                <TableCell
                  style={
                    {
                      // width: '20%',
                    }
                  }
                >
                  <div style={{
                    display: 'flex',
                    marginTop: '-13px',
                  }}>Status</div>
                </TableCell>
                <TableCell>
                  <div style={{
                    display: 'flex',
                    marginTop: '-12px',
                  }}>
                  Actions
                  </div>
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
                          // height: '50px',
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
                        #{order.sos_order_number}
                        {order.order_type_id == 2 ? ( //sheduled order type id
                          <div
                            style={{
                              color: 'red',
                              marginLeft: '10px',
                              fontSize: '1rem',
                            }}
                          >
                            <RiCalendarScheduleLine />
                          </div>
                        ) : (
                          <></>
                        )}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{
                          height: '30px',
                          alignItems: 'center',
                          padding: '10px',
                        }}
                      >
                        {order.order_date && order.order_time
                          ? `${new Date(order.order_date).toLocaleDateString()} - ${order.order_time
                              .split(':')
                              .slice(0, 2)
                              .join(':')}`
                          : 'N/A'}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{
                          display: 'flex',
                          // height: '10px',
                          padding: '10px',
                          position: 'relative',
                          bottom: '7px',
                        }}
                      >
                        <div
                          style={{
                            color: 'black',
                          }}
                        >
                          £ {parseFloat(parseString((parseFloat(order.total_order_amount) / 100).toFixed(2)))}
                        </div>
                        {order.customer_paid_status == true ? (
                          <IoCheckmarkCircleOutline
                            size={20}
                            style={{
                              color: 'green',
                              marginLeft: '5px',
                            }}
                          />
                        ) : (
                          <IoCheckmarkCircleOutline
                            size={20}
                            style={{
                              color: 'red',
                              marginLeft: '5px',
                            }}
                          />
                        )}
                      </StyledTableCell>
                      <StyledTableCell
                        style={{
                          height: '50px',
                          padding: '10px',
                          textTransform: 'capitalize',
                        }}
                      >
                        {order.delivery_mode}
                      </StyledTableCell>
                      <StyledTableCell
                        style={{
                          height: '50px',
                          // padding: '10px',
                        }}
                      >
                        <div
                          style={{
                            // padding: '2px',
                            color:
                              order.order_status == 'pending'
                                ? '#FF734D'
                                : order.order_status == 'in prep'
                                ? '#1D7FBB'
                                : order.order_status == 'ready for collection'
                                ? '#734EC5'
                                : order.order_status == 'cancelled'
                                ? '#A7A7A7'
                                : order.order_status == 'waiting for prep'
                                ? '#E5B405'
                                : order.order_status == 'collected'
                                ? '#2BAA76'
                                : order.order_status == 'rejected'
                                ? '#BA0000'
                                : 'black',

                            backgroundColor:
                              order.order_status == 'pending'
                                ? '#FF734D1A'
                                : order.order_status == 'in prep'
                                ? '#1D7FBB1A'
                                : order.order_status == 'ready for collection'
                                ? '#734EC51A'
                                : order.order_status == 'cancelled'
                                ? '##A7A7A71A'
                                : order.order_status == 'waiting for prep'
                                ? '#E5B4051A'
                                : order.order_status == 'collected'
                                ? '#2BAA761A'
                                : order.order_status == 'rejected'
                                ? '#BA00001A'
                                : 'none',
                            border:
                              order.order_status == 'pending'
                                ? '1px solid #FF734D'
                                : order.order_status == 'in prep'
                                ? '1px solid #1D7FBB'
                                : order.order_status == 'ready for collection'
                                ? '1px solid #734EC5'
                                : order.order_status == 'cancelled'
                                ? '1px solid #A7A7A7'
                                : order.order_status == 'waiting for prep'
                                ? '1px solid #E5B405'
                                : order.order_status == 'collected'
                                ? '1px solid #2BAA76'
                                : order.order_status == 'rejected'
                                ? '1px solid #BA0000'
                                : 'none',

                            width:
                              order.order_status == 'pending'
                                ? '100px'
                                : order.order_status == 'in prep'
                                ? '100px'
                                : order.order_status == 'ready for collection'
                                ? '150px'
                                : order.order_status == 'cancelled'
                                ? '100px'
                                : order.order_status == 'waiting for prep'
                                ? '150px'
                                : order.order_status == 'collected'
                                ? '100px'
                                : order.order_status == 'rejected'
                                ? '100px'
                                : 'none',

                            borderRadius: '2px',
                            textAlign: 'center',
                            textTransform: 'capitalize',
                          }}
                        >
                          {order.order_status}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <button
                          className="view_order"
                          onClick={() => {
                            if (activeTab === 'order_waiting' || activeTab === 'rejected') {
                              showOrderDetail(order.temp_order, true);
                            } else if (activeTab === 'all_orders') {
                              if (order.temp_order) {
                                showOrderDetail(order.temp_order, true);
                              } else {
                                showOrderDetail(order.order_id, false);
                              }
                            } else {
                              showOrderDetail(order.order_id, false);
                            }
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
            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: totalNumberOfOrders }]}
            colSpan={1}
            count={totalNumberOfOrders}
            rowsPerPage={adjustedRowsPerPage}
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
