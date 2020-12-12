import React from 'react'
import {Link} from 'react-router-dom'

function CardItem(props) {
    if(props.label == 'Tinduet Gold'){
        return (
            <>
                <li className="cards__item">
                    <Link className="cards__item__link" to={props.path}>
                        <figure className="cards__item__pic-wrap2" data-category={props.label}>
                            <img src={props.src} className="cards__item__img"/>
                        </figure>
                        <div className="cards__item__info">
                            <h5 className="cards__item__text">{props.text}</h5>
                        </div>
                    </Link>
                </li>
            </>
        )
    } else if(props.label == 'Tinduet Plus'){
        return (
            <>
                <li className="cards__item">
                    <Link className="cards__item__link" to={props.path}>
                        <figure className="cards__item__pic-wrap1" data-category={props.label}>
                            <img src={props.src} className="cards__item__img"/>
                        </figure>
                        <div className="cards__item__info">
                            <h5 className="cards__item__text">{props.text}</h5>
                        </div>
                    </Link>
                </li>
            </>
        )
    } else{
        return (
            <>
                <li className="cards__item">
                    <Link className="cards__item__link" to={props.path}>
                        <figure className="cards__item__pic-wrap3" data-category={props.label}>
                            <img src={props.src} className="cards__item__img"/>
                        </figure>
                        <div className="cards__item__info">
                            <h5 className="cards__item__text">{props.text}</h5>
                        </div>
                    </Link>
                </li>
            </>
        )
    }
}

export default CardItem