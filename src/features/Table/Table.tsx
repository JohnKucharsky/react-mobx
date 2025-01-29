import { memo, useCallback } from 'react'
import {
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { observer } from 'mobx-react-lite'
import { RowType } from '@/features/Table/service.ts'
import { SelectionStore } from '@/features/Table/store.ts'

const TableComponent = observer(
  ({ selectionStore }: { selectionStore: SelectionStore }) => {
    const handleSelect = useCallback(
      (id: number) => {
        selectionStore.handleSelect(id)
      },
      [selectionStore],
    )

    return (
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <CheckboxEl selectionStore={selectionStore} />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>City</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectionStore.data.map((row) => (
                <TableRowComponent
                  key={row.id}
                  row={row}
                  isSelected={selectionStore.isSelected(row.id)}
                  handleSelect={handleSelect}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    )
  },
)

export default TableComponent

const CheckboxEl = observer(
  ({ selectionStore }: { selectionStore: SelectionStore }) => {
    return (
      <Checkbox
        indeterminate={selectionStore.indeterminate}
        checked={selectionStore.checked}
        onChange={(e) => selectionStore.setSelected(e.target.checked)}
      />
    )
  },
)

const TableRowComponent = memo(
  ({
    row,
    isSelected,
    handleSelect,
  }: {
    row: RowType
    isSelected: boolean
    handleSelect: (id: number) => void
  }) => {
    return (
      <TableRow selected={isSelected}>
        <TableCell padding="checkbox">
          <Checkbox
            checked={isSelected}
            onChange={() => handleSelect(row.id)}
          />
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.age}</TableCell>
        <TableCell>{row.city}</TableCell>
      </TableRow>
    )
  },
)
