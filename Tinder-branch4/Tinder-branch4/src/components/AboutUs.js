import React from 'react'
import CardItem from './CardItem'
import './Cards.css'

function AboutUs() {
    return (
        <div className='cards'>
            <h1>About Us</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem
                        src='https://scontent.fhan3-1.fna.fbcdn.net/v/t1.0-9/73504881_955838294783855_7983513054077779968_o.jpg?_nc_cat=102&ccb=2&_nc_sid=174925&_nc_ohc=gREkgqhYkuUAX9zzBtQ&_nc_ht=scontent.fhan3-1.fna&oh=c2f0dcb04e9000bec88e878a1120e862&oe=600E9FCC'
                        text='Phạm Việt Hoàng cánh tay phải của Huy Sơn'
                        label='Tay Phải'
                        />
                        <CardItem
                        src='https://scontent.fhan4-1.fna.fbcdn.net/v/t1.0-9/100634157_1634470313374123_2285698203846180864_o.jpg?_nc_cat=104&ccb=2&_nc_sid=84a396&_nc_ohc=1dhjg36_byYAX-bbtmh&_nc_ht=scontent.fhan4-1.fna&oh=20ec561b0eedcd42d8885921b1589642&oe=60100FA2'
                        text='Phù Thủy Nguyễn Huy Sơn'
                        label='Phù Thủy'
                        />
                        <CardItem
                        src='https://lh3.googleusercontent.com/RoNqiuIs9jPKaKRz7pzwzTZYC4xMfS69MONmCpVd-zrqcb9jvE6bAqJXpGL2YMFY_iCy1Y3QTUJ8MuMsSqhtHnAlFGW-3CQHZDss0GR2J6uW7cQaVwI07ox0SC42jhcX1fqQLw0Mnk5pW_RcP25sJpn79mVrUlfwIoDT0sNqpLl3YBgUaqMPckSCZ7FVuDLQv-I1P94GCSv22Xzhj2bPvbtvLfopZLNcvkYs4g7Xfww6_kV7Bbe3s7-wmZd9JMzzN8ZM8kCLuGnuh2bNzOmbCM7FisfANABJa6fbt4Lq3Xcz8trls5kKbOt8SlvhllV0j7P9WTwOhAfjGBL2XuR5UeXE9-k_bqtHl6vNUIRkpnKbSbobSrTI6IFY_ZEl0lIS4LsSC2aGL_6Vbwdul6enoGLvgBtuG485nCiARendilfb9MxTCSwr22hY7ORkmQNTfehVLL03lPgiS3pV7Kjrsx29RFFov2CrK531vimb3jM1iA_bq5tEqB5ajco7uUZAobFU3iwy58bKJtiGHUlNZSv4I_t9QofaGr6aduNFsCpLVibNLlRd20xqHubkW1kKoewTpCRj4L5Q2AJYhDhhlyrTXB7JTyFPZDgRAOZyZcHSkocUwAEThAiavicW_e90I9xcox0R0yuNpclUoOQ2Z-uk_7Oy9zVGjrLsQWiauCZJv7-z8msAerw1O-O03A=w1220-h832-no?authuser=0'
                        text='Nguyễn Thành Long cánh tay trái của Huy Sơn'
                        label='Tay Trái'
                        />
                    </ul>
                    <ul className="cards__items">
                        <CardItem
                        src='https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-9/100690311_3042316345884247_2985484698626555904_o.jpg?_nc_cat=100&ccb=2&_nc_sid=174925&_nc_ohc=VK_JMrFCdhMAX93Ump7&_nc_ht=scontent.fhan3-3.fna&oh=06799075f61fe423acc99c4eebb29ead&oe=600D5F7D'
                        text='Nguyễn Đăng Hà cái chân phải của Huy Sơn'
                        label='Chân Phải'
                        />
                        <CardItem
                        src='https://scontent.fhan3-3.fna.fbcdn.net/v/t1.0-9/82884816_1451349508375101_2386524536804737024_n.jpg?_nc_cat=106&ccb=2&_nc_sid=174925&_nc_ohc=gmkV14w84g4AX8L9FOc&_nc_ht=scontent.fhan3-3.fna&oh=d5c6ccca138ef638ac1730e552b5b54d&oe=6010118B'
                        text='Công Minh Sơn cái chân trái của Huy Sơn'
                        label='Chân Trái'
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AboutUs