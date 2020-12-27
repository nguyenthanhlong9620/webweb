import React from 'react'
import CardItem from './CardItem'
import './Cards.css'

function Cards() {
    return (
        <div className='cards'>
            <h1>Các cặp đôi đã được chúng tôi ghép đôi thành công!</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem
                        src='images/hao.jpg'
                        text='Chúng tôi đến với nhau nhờ Tinduet, cảm ơn các bạn đã phát triển ra một ứng dụng thần kì như vậy'
                        label='Tinduet Gold'
                        />
                        <CardItem
                        src='/images/hieu.jpg'
                        text='Tôi không nghĩ rằng giữa cuộc sống đầy tấp lập nhưng xã hội hiện nay tôi có thể tìm thấy một nửa của mình, cảm ơn Tinduet'
                        label='Tinduet Plus'
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards