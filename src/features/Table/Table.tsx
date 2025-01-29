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
import { computed } from 'mobx'
import { observer } from 'mobx-react-lite'
import { RowType } from '@/features/Table/service.ts'
import { SelectionStore } from '@/features/Table/store.ts'

const TableComponent = observer(
  ({ selectionStore }: { selectionStore: SelectionStore }) => {
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
                  selectionStore={selectionStore}
                  key={row.id}
                  row={row}
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

const TableRowComponent = observer(
  ({
    selectionStore,
    row,
  }: {
    selectionStore: SelectionStore
    row: RowType
  }) => {
    const isSelectedComputed = computed(() =>
      selectionStore.isSelected(row.id),
    ).get()

    return (
      <TableRow selected={isSelectedComputed}>
        <TableCell padding="checkbox">
          <Checkbox
            checked={isSelectedComputed}
            onChange={() => selectionStore.handleSelect(row.id)}
          />
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.age}</TableCell>
        <TableCell>{row.city}</TableCell>
      </TableRow>
    )
  },
)
