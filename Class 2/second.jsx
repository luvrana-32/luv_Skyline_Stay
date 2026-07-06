import { useState, useEffect } from "react";
export function ProductsListings(){
    let [current,setCurrent]=useState(0);
    let [totalCount,setTotalCount]=useState(0)
    let PAGE_SIZE=33;
    let url=`https://demohotelsapi.pythonanywhere.com/hotels?limit=${PAGE_SIZE}&skip=${PAGE_SIZE*current}`
    let [data,setData]=useState([]);
    async function dataFetch(){
        let res=await fetch(url)
        let hotelsData=await res.json()
        // console.log(hotelsData.count)
        setTotalCount(hotelsData.count)
        setData(hotelsData.data);
    }
    useEffect(()=>{
        dataFetch()
    },[current])
    console.log(data);
    console.log(totalCount)

    let no_of_pages=Math.ceil(totalCount/PAGE_SIZE)
    console.log(no_of_pages)

    let start=current*PAGE_SIZE;
    let end=start+PAGE_SIZE
    return(
        <>
            <div style={{display:"flex",flexDirection:"column",gap:"30px"}}>
                {
                    data.map((el)=>(
                        <Product all={el} id={el.id} name={el.name} thumbnail={el.thumbnail} des={el.description} location={el.location} rating={el.rating} price={el.price}/>
                    ))
                }
            </div>
              <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "20px",
                    flexWrap: "wrap",
                }}
            >
                <button
                    onClick={() => setCurrent((prev) => prev - 1)}
                    disabled={current === 0}
                >
                    Previous
                </button>

                {/* First Page */}
                <button
                    onClick={() => setCurrent(0)}
                    style={{
                        backgroundColor: current === 0 ? "blue" : "white",
                        color: current === 0 ? "white" : "black",
                    }}
                >
                    1
                </button>

                {/* Left Dots */}
                {current > 2 && <span>...</span>}

                {/* Previous Page */}
                {current > 1 && (
                    <button onClick={() => setCurrent(current - 1)}>
                        {current}
                    </button>
                )}

                {/* Current Page */}
                {current !== 0 && current !== no_of_pages - 1 && (
                    <button
                        style={{
                            backgroundColor: "blue",
                            color: "white",
                        }}
                    >
                        {current + 1}
                    </button>
                )}

                {/* Next Page */}
                {current < no_of_pages - 2 && (
                    <button onClick={() => setCurrent(current + 1)}>
                        {current + 2}
                    </button>
                )}

                {/* Right Dots */}
                {current < no_of_pages - 3 && <span>...</span>}

                {/* Last Page */}
                {no_of_pages > 1 && (
                    <button
                        onClick={() => setCurrent(no_of_pages - 1)}
                        style={{
                            backgroundColor:
                                current === no_of_pages - 1
                                    ? "blue"
                                    : "white",
                            color:
                                current === no_of_pages - 1
                                    ? "white"
                                    : "black",
                        }}
                    >
                        {no_of_pages}
                    </button>
                )}

                <button
                    onClick={() => setCurrent((prev) => prev + 1)}
                    disabled={current === no_of_pages - 1}
                >
                    Next
                </button>
            </div>
        </>
    );
}

export function Product({all,id,name,thumbnail,des,location,rating,price}){
 const navigate=useNavigate()
  function toDetail(id){
    navigate(`/detail/${id}`)
  }
  let dispatch=useDispatch()
    return(
        <div style={{display:"flex",gap:"20px",border:"2px solid white",padding:"30px",borderRadius:"30px"}}>
            <div onClick={()=>{toDetail(id)}}>
                <img width="300px" height="250px"  src={thumbnail} alt="" />
            </div>
            <div style={{display:"flex",gap:"20px",flexDirection:"column",textAlign:"left"}}>
                <h2 onClick={()=>{toDetail(id)}}>{name}</h2>
                <p onClick={()=>{toDetail(id)}}>{des.slice(0,200)}...</p>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                    <p>Location : {location}</p>
                    <p><StarRating rating={rating}/></p>
                </div>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                    <p>Price :{price}</p>
                    <button style={{backgroundColor:"white",color:"black",border:"none",padding:"10px 20px"}}
                    onClick={()=>{
                            dispatch(addToWish(all))
                            navigate("/wishlist")
                    }}
                    >Move to WishList</button>
                </div>
            </div>
        </div>
 )
}

import { IoStarSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addToWish } from "./Redux/Slicer/WishlistSlicer";
function StarRating({rating}){
    let stars=[];
    for(let i=1;i<=Math.ceil(rating);i++){
        stars.push(<IoStarSharp color="yellow"/>)
    }

    return stars;
}

export function SearchHotel(){
  const {state}=useLocation()
  const [hotels, sethotels] = useState([]);
  const [price, setPrice] = useState("");
 const [rating, setRating] = useState("");
  let url=`https://demohotelsapi.pythonanywhere.com/hotels?search=${state.location}&price=${price}&rating=${rating}&order_by=-rating`
  console.log(state)
  async function searchFetch() {
    const res=await fetch(url)
    const result=await res.json()
    console.log(result);
    sethotels(result.data);
  }
  console.log(hotels);
  useEffect(()=>{
      searchFetch();
  },[price, rating]);
    return(
        <>
        <h1>Searched Hotel</h1>
        <div  style={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "25px",
    marginTop: "30px",
  }}>
        {hotels.map((hotel) => (
  <div 
  style={{
    width: "800px",
    padding: "40px",
    background: "black",
    color: "white",
    border: "1px solid white",
    borderRadius: "100px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    margin: "20px auto",
    display:"flex",
    alignItems:"center",
    gap:"20px"
  }}
  key={hotel.id}>
    <img src={hotel.thumbnail} width="200" alt={hotel.name}
      style={{
    width: "250px",
    height: "180px",
    objectFit: "cover",
    borderRadius: "10px",
  }}
 />
   <div style={{textAlign:"left"}}>
    <h2 style={{
    marginTop: "15px",
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom:"10px"
  }}>{hotel.name}</h2>
    <p style={{ color: "#d1d5db", fontSize: "18px",margin:"8px 0px" }}>{hotel.location}</p>
    <p style={{ color: "#22c55e", fontSize: "22px", fontWeight: "bold", margin:"8px 0px" }}>₹{hotel.price}</p>
    <p  style={{ color: "#facc15", fontSize: "20px", margin:"8px 0px" }}>{hotel.rating}</p>
    </div>
  </div>
))}
</div>

        </>
    )
} 