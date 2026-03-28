// import React, { useEffect, useState } from "react";

// const PromptsPage = () => {

// const [prompts,setPrompts] = useState([]);
// const [search,setSearch] = useState("");

// useEffect(()=>{

// fetch("http://localhost:5000/api/prompts")
// .then(res=>res.json())
// .then(data=>setPrompts(data))

// },[])

// const filtered = prompts.filter(p =>
// p.prompt.toLowerCase().includes(search.toLowerCase())
// )

// return (

// <div style={{padding:"120px 40px"}}>

// <h1 style={{color:"white",marginBottom:"20px"}}>
// Browse Prompts
// </h1>

// <input
// placeholder="Search prompts..."
// value={search}
// onChange={(e)=>setSearch(e.target.value)}
// style={{
// padding:"10px",
// width:"300px",
// borderRadius:"8px"
// }}
// />

// <div style={{
// display:"grid",
// gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",
// gap:"20px",
// marginTop:"40px"
// }}>

// {filtered.map(prompt => (

// <div
// key={prompt._id}
// style={{
// background:"#111",
// padding:"20px",
// borderRadius:"12px",
// color:"white"
// }}
// >

// <p>{prompt.prompt}</p>

// <button style={{
// marginTop:"10px"
// }}>
// Copy Prompt
// </button>

// </div>

// ))}

// </div>

// </div>

// )

// }

// export default PromptsPage

import React, { useEffect, useState } from "react";
import "./PromptsPage.css";

const PromptsPage = () => {

const [prompts,setPrompts] = useState([]);
const [search,setSearch] = useState("");

useEffect(()=>{

fetch("http://localhost:5000/api/prompts")
.then(res=>res.json())
.then(data=>setPrompts(data))

},[])

const filtered = prompts.filter(p =>
p.prompt.toLowerCase().includes(search.toLowerCase())
)

const copyPrompt = (text)=>{
navigator.clipboard.writeText(text)
alert("Prompt Copied!")
}

return (

<div className="prompts-page">

<h1 className="page-title">Browse AI Prompts</h1>

<input
className="search-input"
placeholder="Search prompts..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<div className="prompts-grid">

{filtered.map(prompt => (

<div className="prompt-card" key={prompt._id}>

<div className="prompt-card-header">

<span className="category">
{prompt.category || "General"}
</span>

<button className="fav-btn">⭐</button>

</div>

<h3 className="prompt-title">
{prompt.title || "AI Prompt"}
</h3>

<p className="prompt-preview">
{prompt.prompt.substring(0,120)}...
</p>

<button
className="copy-btn"
onClick={()=>copyPrompt(prompt.prompt)}
>
Copy Prompt
</button>

</div>

))}

</div>

</div>

)

}

export default PromptsPage