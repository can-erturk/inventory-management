import { useInventoryStore } from '@zustand/inventoryStore'
import SortingIcon from './SortingIcon'
import classNames from 'classnames'
import { setSortConfigs } from '../helpers/setSortConfigs'

function HeaderCell({ title, column, iconAlign = 'left' }) {
  const table = useInventoryStore()

  // Conditional styles for header cell
  const cellStyles = classNames({
    'table-col-sorting': true,
    'justify-end': iconAlign === 'left',
  })

  return (
    <th
      scope="col"
      className="table-col first-of-type:pl-6"
      onClick={() => setSortConfigs(column)}
    >
      <div className={cellStyles}>
        {iconAlign === 'right' && <span>{title}</span>}

        <SortingIcon
          active={table.sortColumn === column}
          direction={table.sortDirection}
        />

        {iconAlign === 'left' && <span>{title}</span>}
      </div>
    </th>
  )
}

export default HeaderCell
