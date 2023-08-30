import { useMemo } from 'react';
import { useTable, useGlobalFilter, useFilters } from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './columns';
import './table.css';
import { GlobalFilter } from './GlobalFilter';

function FilteringTable() {

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);


    const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow, state, setGlobalFilter } = useTable({
        columns,
        data,
    },
    useFilters,
    useGlobalFilter)

    const { globalFilter } = state;

    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table {...getTableProps()}>
                <thead >
                    {
                        headerGroups.map(headerGroup => (
                            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map(column => (
                                        <th key={column.id} {...column.getHeaderProps()}>{column.render('Header')}
                                            <div>{column.canFilter ? column.render('Filter') : null}</div>
                                        </th>
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

export default FilteringTable;