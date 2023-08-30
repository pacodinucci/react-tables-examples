import { useMemo } from 'react';
import { useTable, useColumnOrder } from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './columns';
import './table.css';

function ColumnOrder() {

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);

    const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow, setColumnOrder } = useTable({
        columns,
        data
    },
    useColumnOrder)

    const changeOrder = () => {
        setColumnOrder(['id', 'first_name','last_name','phone','country','date_of_birth'])
    }

    return (
        <>
            <button onClick={changeOrder}>Change Column Order</button>
            <table {...getTableProps()}>
                <thead >
                    {
                        headerGroups.map(headerGroup => (
                            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map(column => (
                                        <th key={column.id} {...column.getHeaderProps()}>{column.render('Header')}</th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map(row => {
                            prepareRow(row)
                            return (
                                <tr key={row.id} {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {
                                            return <td key={cell.id} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    {
                        footerGroups.map(footerGroup => (
                            <tr key={footerGroup.id} {...footerGroup.getFooterGroupProps()}>
                                {
                                    footerGroup.headers.map(column => (
                                        <td key={column.id} {...column.getFooterGroupProps}>
                                            {
                                                column.render('Footer')
                                            }
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tfoot>
            </table>
        </>
    )
}

export default ColumnOrder;