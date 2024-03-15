import { FaGithub } from 'react-icons/fa6'

function GithubBtn() {
  return (
    <a
      href="https://github.com/can-erturk/inventory-management"
      target="_blank"
      rel="noreferrer"
      className="w-9 h-9 rounded-full hover:bg-zinc-100 max-lg:hidden flex items-center justify-center text-lighten"
    >
      <FaGithub size={20} />
    </a>
  )
}

export default GithubBtn
