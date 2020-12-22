import React, {useState,useMemo} from 'react'
import TinderCard from "react-tinder-card"
import SwipeButtonBar from './SwipeButtonBar'
import './TinderCards.css'
import axios from 'axios';

// const db = [
//     {
//         name: 'Tâm Tâm',
//         url: 'https://scontent.fhan4-1.fna.fbcdn.net/v/t1.0-9/70474929_2605391283021763_2733760195871113216_n.jpg?_nc_cat=104&_nc_sid=09cbfe&_nc_ohc=UEI3eNMSwa4AX9r60Cu&_nc_ht=scontent.fhan4-1.fna&oh=b8865597cb43b2b226f29a0919a4b273&oe=5FABAD1D',
//     },
//     {
//         name: 'Mia Lee',
//         url: 'https://scontent.fhan3-2.fna.fbcdn.net/v/t1.0-9/87172929_900890173698773_2027380359355695104_o.jpg?_nc_cat=107&_nc_sid=174925&_nc_ohc=3RV_yypf39IAX-b4hm_&_nc_ht=scontent.fhan3-2.fna&oh=3e1844a9ca60efca75e66bd5e8289d11&oe=5FAE9E93',
//     },
//     {
//         name: 'Cẩm Nhung',
//         url: 'https://scontent.fhan4-1.fna.fbcdn.net/v/t1.0-9/93679806_540891779906309_2397043989749432320_o.jpg?_nc_cat=105&_nc_sid=09cbfe&_nc_ohc=exMUqrr0RKcAX_Ha4ZT&_nc_ht=scontent.fhan4-1.fna&oh=6980396a667b8209c10de2aed8142180&oe=5FAB9C21',
//     },
//     {
//         name: 'Bông',
//         url: 'https://scontent.fhan4-1.fna.fbcdn.net/v/t1.0-9/120931967_1237348799976032_8668395272701109830_n.jpg?_nc_cat=104&_nc_sid=09cbfe&_nc_ohc=m5JF6ykX3QkAX8gJ2Wv&_nc_ht=scontent.fhan4-1.fna&oh=0e4c2dd013b8478d94b6834e36b0da6c&oe=5FAB633A',
//     },
//     {
//         name: 'Nguyến Thị Hải Yến',
//         url: 'https://scontent.fhan3-1.fna.fbcdn.net/v/t1.0-9/67811245_2378785795734703_7959774147062530048_o.jpg?_nc_cat=110&_nc_sid=174925&_nc_ohc=ZQUkH_IBGiIAX8g1q71&_nc_ht=scontent.fhan3-1.fna&oh=fd0c075d702a3e4f5da2f49ecbdde1f1&oe=5FB0C777',
//     },
//     {
//         name: 'Phạm Thị Lisa',
//         url: 'https://headlineplanet.com/home/wp-content/uploads/2019/07/Lisa-Instagram-e1562252580131.jpg',
//     },
// ]

// const alredyRemoved = []
// let charactersState = db // This fixes issues with updating characters state forcing it to use the current state and not the state that was active when the card was created.

// function getData() {
//     const article = { id: '41' };
//         axios.post('http://localhost:1000/listUser', article)
//             .then(response => {return response.data});
//     return 0    
// }
// db = {
//   {id: xxx ...},{id: yyy ...},{id zzz ...}
// }

function TinderCards ({dataListUser}) {
  const db = dataListUser
  const alredyRemoved = []
  let charactersState = db
  const [characters, setCharacters] = useState(db)
  const [lastDirection, setLastDirection] = useState()
//   const getData = () =>{
//     const article = { id: '41' };
//             axios.post('http://localhost:1000/listUser', article)
//                 .then(response => (db = response.data));
//   }
//   getData()

  const childRefs = useMemo(() => Array(db.length).fill(0).map(i => React.createRef()), [])

//   const handleSubmit = async(event) => {
//     event.preventDefault();
//     const dataList = await
//     axios({
//       method: 'post',
//       url: 'http://localhost:1000/listUser',
//       data: {
//         id: '41'
//       }
//     });
//   //   localStorage.setItem('listCardTinder', dataList)
//   //   console.log('list' + localStorage.getItem('listCardTinder'))
//   setCharacters(dataList.data)
//   console.log(dataList.data)
//   console.log(characters)
// }


  const swiped = (direction, nameToDelete, id) => {
    console.log(nameToDelete + ' ' + direction)
    setLastDirection(direction)
    alredyRemoved.push(nameToDelete)
    if(direction == 'right' || direction == 'up'){
      const article = { userLogin_id: localStorage.getItem('id'), resUser_id: id };
        axios.post('http://localhost:1000/matchReact', article)
            .then(response => console.log(response));
            console.log(localStorage.getItem('id') + 'da thich' + id)
    }
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
    charactersState = charactersState.filter(character => character.name !== name)
    setCharacters(charactersState)
  }

  const swipe = (dir) => {
    try {
      const cardsLeft = characters.filter(person => !alredyRemoved.includes(person.name))
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].name // Find the card object to be removed
      const index = db.map(person => person.name).indexOf(toBeRemoved) // Find the index of which to make the reference to
      childRefs[index].current.swipe(dir) // Swipe the card!
    }
      
    } catch (error) {
      console.log(error)
    }
  }
    return (
        <div>
          {console.log(db)}
            <div className="tinderCards__cardContainer">
            {characters.map((character, index) =>(
              <>
                    <TinderCard
                        ref={childRefs[index]}

                        className='swipe'
                        key={character.name}
                        onSwipe={(dir) => swiped(dir, character.name, character.user_id)}
                        onCardLeftScreen={() => outOfFrame(character.name)}>
                        {/* <div style={{backgroundImage: `url(${character.url})`}} */}
                        <div style={{backgroundImage: `url(${character.file_name})` }}
                        className='card'
                    >
                            <div className='info'>
                                <h3>{character.name}</h3>
                            </div>
                        </div>
                    </TinderCard>
                    <SwipeButtonBar
                    left={() => swipe('left')}
                    right={() => swipe('right')}
                    db = {character}
                    />
              </>
                ))}
                {/* <button onClick={handleSubmit}>click</button> */}
            </div>
        </div>
    )
}

export default TinderCards
