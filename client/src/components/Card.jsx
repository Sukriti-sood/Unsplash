import React from "react";

function GridCard(props)
{
    function ondelete()
    {
        props.onDelete(props.id);
    }
    return(
        <>
         <div className="onegrid">
      <img src={props.imgsrc} alt="images"/>
      <div className="overlay">
      <span className="label">{props.label}</span>
      <span className="del" onClick={ondelete}><i class="fa fa-trash" aria-hidden="true"></i></span>
     </div>
    </div>
        </>
    )
}


export default GridCard;