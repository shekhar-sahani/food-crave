import React from 'react'

export default function FoodList({toggleFoodListModal, foodListModal, list, deleteFoodList }) {
  return (
    <div id="modal-container" className={foodListModal ? 'four' : ''}>
    <div class="modal-background">
      <div class="modal" style={{padding:"50px 18px", width:'100%'}} >
        <button className='button' onClick={()=> toggleFoodListModal()} style={{ marginBottom: '0px', display:"inline", height:'26px',  }} ><span  >Close</span></button>
        <div style={{  zIndex: '1', minHeight:"100vh", maxHeight:'100vh',overflowY:'scroll',  }} >
          {list.map((item, id) => (
            <ul key={id} className="toDoList">
              <li style={{ width: '60%', display: 'inline-block', }} > {item.food_name}  </li>
              <button onClick={() => deleteFoodList(item)} className="button"><span> Dispose </span></button>
            </ul>
          ))}
        </div>
      </div>
    </div>
  </div>
  )
}
