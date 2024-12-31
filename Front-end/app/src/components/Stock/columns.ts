import { createColumnHelper } from '@tanstack/react-table';
import { API_ENDPOINTS } from '../types/Stock';

const columnHelper = createColumnHelper<any>();

export const columns = [
  columnHelper.accessor('type', {
    header: 'Type',
    cell: info => (
      <div className={`${info.getValue() === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
        {info.getValue().toUpperCase()}
      </div>
    )
  }),
  columnHelper.accessor('stockSymbol', {
    header: 'Symbol',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('stockName', {
    header: 'Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('quantity', {
    header: 'Quantity',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('price', {
    header: 'Price',
    cell: info => `$${info.getValue().toFixed(2)}`,
  }),
  columnHelper.accessor(row => row.quantity * row.price, {
    id: 'total',
    header: 'Total',
    cell: info => `$${info.getValue().toFixed(2)}`,
  }),
  columnHelper.accessor('timestamp', {
    header: 'Date',
    cell: info => new Date(info.getValue()).toLocaleString(),
  }),
];