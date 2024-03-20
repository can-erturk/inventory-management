import HeaderCell from './ui/HeaderCell'

function SortingHeader() {
  return (
    <thead className="border-b border-zinc-200 select-none max-md:hidden">
      <tr>
        <HeaderCell title="Product name" column="name" iconAlign="right" />
        <HeaderCell title="Category" column="category" />
        <HeaderCell title="Quantity" column="inStock" />
        <HeaderCell title="Last Update" column="lastUpdate" />
        <th
          scope="col"
          className="table-col cursor-default text-right pr-6 pl-0"
        >
          Action
        </th>
      </tr>
    </thead>
  )
}

export default SortingHeader
