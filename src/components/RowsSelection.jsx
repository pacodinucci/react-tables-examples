import { useMemo } from 'react';
import { useTable, useRowSelect } from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './columns';
import { CheckBox } from './CheckBox';
import './table.css';

function RowsSelection() {

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);

    const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow, selectedFlatRows } = useTable({
        columns,
        data
    }, 
    useRowSelect,
    (hooks) => {
        hooks.visibleColumns.push((columns) => {
            return [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <CheckBox {...getToggleAllRowsSelectedProps()} />
                    ),
                    Cell: ({ row }) => (
                        <CheckBox {...row.getToggleRowSelectedProps()} />
                    )
                },
                ...columns
            ]
        })
    })

    const firstPageRows = rows.slice(0, 10)



    return (
        <>
        
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
                        firstPageRows.map(row => {
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
            <pre>
                <code>
                    {JSON.stringify(
                        {
                        selectedFlatRows: selectedFlatRows.map((row) => row.original),
                        },
                        null,
                        2
                    )}
                </code>
            </pre>
        </>
    )
}

export default RowsSelection;