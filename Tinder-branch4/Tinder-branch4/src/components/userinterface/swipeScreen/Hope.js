import React, {useState,useMemo,useEffect} from 'react'
import TinderCard from "react-tinder-card"
import SwipeButtonBar from './SwipeButtonBar'
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

function Hope ({click}) {
    useEffect(() => {
        click()
        
    });

    return (

        <div>
        </div>
    )
}

export default Hope
