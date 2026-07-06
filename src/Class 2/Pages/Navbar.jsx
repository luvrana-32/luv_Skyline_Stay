import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'
export default function Navbar(){
const data=useSelector((state)=>state.wishlist);
console.log(data)
return(
<div style={{display:"flex",justifyContent:"space-between", alignItems:"center"}}>
<h1><Link to="/" style={{textDecoration:"none", color:"blue"}}>Logo</Link></h1>
<div style={{display:"flex", gap:"30px", fontSize:"1.4rem"}}>
<Link to="/allHotels" style={{textDecoration:"none", color:"blue"}} >Hotels</Link>
<Link to="/wishlist" style={{textDecoration:"none", color:"blue"}}>Wishlist<span style={{padding:" 5px 10px",background:"black",borderRadius:"50%"}}>{data.length}</span></Link>
<Link to="/contact" style={{textDecoration:"none", color:"blue"}}>Contact</Link>
</div>
</div>
)
} 