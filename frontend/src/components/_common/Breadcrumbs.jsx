import { FiHome } from 'react-icons/fi'
import { LiaAngleRightSolid } from 'react-icons/lia'

function Breadcrumbs({ path }) {
  return (
    <div className="my-5 py-4 px-8 max-md:p-4 bg-default border border-zinc-200 rounded-xl text-sm select-none">
      <ul className="text-lighten flex items-center gap-2">
        <li className="-mt-px">
          <FiHome size={14} />
        </li>

        {path.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <LiaAngleRightSolid size={12} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Breadcrumbs
