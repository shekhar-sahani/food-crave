import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'


function App() {
  const [item, setItem] = useState('')
  const [list, setList] = useState([])
  const [randomItem, setRandomItem] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [modalShow, setModalShow] = useState(false)


  const url = 'https://crave-database.herokuapp.com'

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
    const response = await fetch(`${url}/create/food_list`, requestOptions);
    const responseData = await response.json();
    console.log('res', responseData, response.status)
    if(response.status === 201) {
      getFoodList()
    }
  }

  const deleteFoodList = async (id) => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
  };
    const response = await fetch(`${url}/delete/food_list/${id}`, requestOptions);
    console.log('res', response)
    getFoodList()
  }

  useEffect(() => {
    getFoodList()
  }, [])


  return (
    <>

      <div id="modal-container" className={modalShow ? 'four' : ''}>
        <div class="modal-background">
          <div class="modal"  >
            <button onClick={() => toggleModal()} > close </button>
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
          <div style={{textAlign:'center'}} >
            <label className="form__label" htmlFor="todo">~ Today I want to eat ~</label>
            <input onChange={(e) => setItem(e.target.value)} className="form__input" type="text" id="todo" name="to-do" size={30} />
            <button className="button" type='submit'  ><span>Submit</span></button>
          </div>
        </form>
        <p style={{ marginBottom: '0px' }} >Added Items:</p>
        <div style={{ maxHeight: "280px", overflowY: 'scroll', minHeight: '280px', zIndex: '1' }} >
          {list.map((item, id) => (
            <ul key={id} className="toDoList">
              <li style={{ width: '65%', display: 'inline-block' }} > {item.food_name}  </li>
              <button onClick={() => deleteFoodList(item.id)} className="button"><span> Dispose </span></button>
            </ul>
          ))}
        </div>
        <div>
          <button onClick={() => handleWheel()} className="button"><span> Lets Roll </span></button>
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
