import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import FoodList from './FoodList'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const [item, setItem] = useState('')
  const [list, setList] = useState([])
  const [randomItem, setRandomItem] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [modalShow, setModalShow] = useState(false)
  const [foodListModal, setFoodListModal] = useState(false)


  const url = 'http://15.206.84.96:8000'
  // const url  = 'http://127.0.0.1:8000'

  const handleList = (e) => {
    e.preventDefault()
    if (item.length > 0) {
      addFoodList(item)
    } else {
      alert('Invalid Input!')
    }
    // setList([...list, { ['food_name']: item }])

  }

  const handleWheel = () => {
    setLoaded(true)
    console.log('random', Math.random() * list.length)
    setRandomItem(list[Math.floor(Math.random() * list.length)])
    setTimeout(() => {
      setLoaded(false)
      toggleModal()
    }, 2000)
  }

  console.log('list', list)
  console.log('random', randomItem)

  const toggleModal = () => {
    if (!modalShow) {
      document.body.classList.add('modal-active')
      setModalShow(true)
    } else {
      document.body.classList.remove('modal-active')
      setModalShow(false)
    }
  }

  const toggleFoodListModal = () => {
    if (!foodListModal) {
      document.body.classList.add('modal-active')
      setFoodListModal(true)
    } else {
      document.body.classList.remove('modal-active')
      setFoodListModal(false)
    }
  }

  const getFoodList = async () => {
    const response = await fetch(`${url}/food_list/`);
    const responseData = await response.json();
    console.log('res', responseData, response.status)
    if (response.status === 200) {
      setList(responseData)
    }
  }

  const addFoodList = async (item) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ food_name: item })
    };
    const response = await fetch(`${url}/food_list/`, requestOptions);
    const responseData = await response.json();
    console.log('res', responseData, response.status)
    if (response.status === 201) {
      toast.success(`Added ${item}`, {
        });
      getFoodList()
      setItem('')

    }
  }

  const deleteFoodList = async (item) => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(`${url}/food_list/delete/${item.id}/`, requestOptions);
    console.log('res', response)
    getFoodList()
    toast.error(`deleted ${item.food_name}`, {
    });
  }

  useEffect(() => {
    getFoodList()
  }, [])


  return (
    <>
  <ToastContainer 
  position="top-right"
  autoClose={2000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover />
      <FoodList deleteFoodList={deleteFoodList} list={list} toggleFoodListModal={toggleFoodListModal} foodListModal={foodListModal} />
      <div id="modal-container" className={modalShow ? 'four' : ''}>
        <div class="modal-background">
          <div class="modal"  >
            <button className='button' onClick={() => toggleModal()} style={{ marginBottom: '0px', display: "inline", height: '26px', }} ><span  >Close</span></button>
            <h2>Your Crave Choice is!!</h2>
            <p>{randomItem?.food_name} </p>
          </div>
        </div>
      </div>
      <div className="App"><section className="container">

        <div className="heading">
          <img className="heading__img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/756881/laptop.svg" />
          <h1 className="heading__title">It's Craving Time!</h1>
        </div>
        <form onSubmit={(e) => handleList(e)} className="form">
          <div style={{ textAlign: 'center' }} >
            <label className="form__label" htmlFor="todo">~ Today I want to eat ~</label>
            <input value={item} placeholder='Add Food Items' onChange={(e) => setItem(e.target.value)} className="form__input" type="text" id="todo" name="to-do" size={30} />
            <button className="button" type='submit'  ><span  >Submit</span></button>
          </div>
        </form>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: "baseline" }} >
          <p style={{ marginBottom: '0px' }} >Added Items:</p>
          <button className='button' onClick={() => toggleFoodListModal()} style={{ marginBottom: '0px', display: "inline", height: '26px', }} ><span style={{ padding: "0.5rem 0.4rem" }} >Veiw All Items</span></button>
        </div>
        <div style={{ maxHeight: "280px", overflowY: 'scroll', minHeight: '280px', zIndex: '1' }} >
          {list.map((item, id) => (
            <ul key={id} className="toDoList">
              <li style={{ width: '65%', display: 'inline-block' }} > {item.food_name}  </li>
              <button onClick={() => deleteFoodList(item)} className="button"><span> Dispose </span></button>
            </ul>
          ))}
        </div>
        <div >
          <button style={{ width: '80%', marginTop: "15px", marginLeft: '15px', transform: 'rotate(0deg)' }} onClick={() => handleWheel()} className="button"><span> Lets Roll </span></button>
        </div>
        {loaded ? <div id="container">
          <div class="circle1">
          </div>
          <div class="circle2">
          </div>
          <div class="circle3">
          </div>
        </div> : ''}
      </section></div>
    </>


  )
}

export default App
