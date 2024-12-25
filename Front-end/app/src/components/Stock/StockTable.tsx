import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Stock } from '../types/Stock';
import { ArrowUpDown } from 'lucide-react';

const columnHelper = createColumnHelper<Stock>();

const columns = [
  columnHelper.accessor('symbol', {
    header: () => <span>Symbol</span>,
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: () => <span>Name</span>,
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('price', {
    header: () => <span>Price</span>,
    cell: info => `$${info.getValue().toFixed(2)}`,
  }),
  columnHelper.accessor('quantity', {
    header: () => <span>Quantity</span>,
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('lastUpdated', {
    header: () => <span>Last Updated</span>,
    cell: info => new Date(info.getValue()).toLocaleString(),
  }),
];

interface StockTableProps {
  stocks: Stock[];
}

export const StockTable: React.FC<StockTableProps> = ({ stocks }) => {
  const navigate = useNavigate();
  const table = useReactTable({
    data: stocks,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div className="flex items-center space-x-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className="hover:bg-gray-50 cursor-pointer"
            >
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  onClick={() => navigate(`/buy/${row.original.id}`)}
                  className="text-green-600 hover:text-green-900"
                >
                  Buy
                </button>
                <button
                  onClick={() => navigate(`/sell/${row.original.id}`)}
                  className="text-red-600 hover:text-red-900"
                >
                  Sell
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;