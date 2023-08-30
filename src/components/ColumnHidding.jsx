import { useMemo } from 'react';
import { useTable } from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './columns';
import { CheckBox } from './CheckBox';
import './table.css';

function ColumnHidding() {

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);

    const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow, allColumns, getToggleHideAllColumnsProps } = useTable({
        columns,
        data
    })



    return (
        <>
            <div>
                <div>
                    <CheckBox {...getToggleHideAllColumnsProps()} /> Toggle All
                </div>
                {
                    allColumns.map((column) => (
                        <div key={column.id}>
                            <label>
                                <input type="checkbox" {...column.getToggleHiddenProps()} />
                                {column.Header}
                            </label>
                        </div>
                    ))
                }
            </div>
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

export default ColumnHidding;