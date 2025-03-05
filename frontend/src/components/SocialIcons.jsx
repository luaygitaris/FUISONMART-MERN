import { Link } from "react-router-dom"
import {RiYoutubeFill, RiInstagramFill, RiTwitterFill, RiLinkedinFill, RiDribbbleFill, RiGithubFill} from 'react-icons/ri'
const SocialIcons = () => {
  return (
    <div className="flex gap-6 pr-4 justify-center">
      <Link to={''} className="text-[#08d9d6] text-2xl hover:translate-y-1 transition-all duration-500"><RiYoutubeFill/></Link>
      <Link to={''} className="text-[#08d9d6] text-2xl hover:translate-y-1 transition-all duration-500"><RiInstagramFill/></Link>
      <Link to={''} className="text-[#08d9d6] text-2xl hover:translate-y-1 transition-all duration-500"><RiTwitterFill/></Link>
      <Link to={''} className="text-[#08d9d6] text-2xl hover:translate-y-1 transition-all duration-500"><RiLinkedinFill/></Link>
      <Link to={''} className="text-[#08d9d6] text-2xl hover:translate-y-1 transition-all duration-500"><RiDribbbleFill/></Link>
      <Link to={''} className="text-[#08d9d6] text-2xl hover:translate-y-1 transition-all duration-500"><RiGithubFill/></Link>
    </div>
  )
}

export default SocialIcons