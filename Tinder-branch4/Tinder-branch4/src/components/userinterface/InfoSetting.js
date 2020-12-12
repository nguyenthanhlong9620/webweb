import React, { useState, useMemo } from 'react'
import './InfoSetting.css'
import { Link } from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close'
import { Avatar, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

var today = new Date();
var nowYear = today.getFullYear();
const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    img: {
        width: theme.spacing(28),
        height: theme.spacing(35),
    },
    photo: {
        '&:hover': {
            border: '2px solid #ec5e6f',
            cursor: 'pointer',
        },
        border: '2px solid #62b4f9',
        width: theme.spacing(13),
        height: theme.spacing(18),
    }
}));


function InfoSetting() {
    let history = useHistory();
    const [imgUpload, setImgUpload] = useState('');
    const [birthday, setBirthday] = useState('2000-09-11');
    const [name, setName] = useState(localStorage.getItem('name'));
    const [des, setDes] = useState(localStorage.getItem('des'));
    const [age, setAge] = useState(localStorage.getItem('age'));
    const [sex, setSex] = useState(localStorage.getItem('sex'));
    const [like, setLike] = useState(localStorage.getItem('like'));

    const classes = useStyles();

    const handleSubmit = async (event) => {
        setAge(nowYear - birthday.substr(0, 4))
        localStorage.setItem("name", name);
        localStorage.setItem("age", age);
        localStorage.setItem("sex", sex);
        localStorage.setItem("des", des);
        localStorage.setItem("like", like);
        history.push(`/user?id=${localStorage.getItem('id')}`);

        event.preventDefault();
        const dataSignIn = await
            axios({
                method: 'post',
                url: 'http://localhost:1000/edit_profile',
                data: {
                    user_id: localStorage.getItem('id'),
                    name: name,
                    age: age,
                    sex: sex,
                    description: des,
                    partner_sexual_type: like,
                }
            });
            
    }


    return (

        <div className='infoSetting'>
            <div className='infoSetting__title'>
                Information Setting
            </div>
            <div className='infoSetting__changeInfo'>
                <div>
                    <TextField label="Name" onChange={(event) => setName(event.target.value)} />
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-controlled-open-select-label">Sex</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            onChange={(event) => setSex(event.target.value)}
                        >
                            <MenuItem value={'male'}>Male</MenuItem>
                            <MenuItem value={'female'}>Female</MenuItem>
                            <MenuItem value={'complex'}>Complex</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-controlled-open-select-label">Like</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            onChange={(event) => setLike(event.target.value)}
                        >
                            <MenuItem value={'male'}>Male</MenuItem>
                            <MenuItem value={'female'}>Female</MenuItem>
                            <MenuItem value={'both'}>Both</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <TextField
                        id="date"
                        label="Birthday"
                        type="date"
                        defaultValue="YYYY-MM-DD"
                        onChange={(event) => setBirthday(event.target.value)}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div>
                    <TextField
                        label="Information"
                        multiline
                        rows={3}
                        fullWidth
                        onChange={(event) => setDes(event.target.value)}
                    />
                </div>
            </div>
            <div className="bt">
                <Button className="bt__swipeButtons__star" onClick={handleSubmit}>
                    <h2>Done</h2>
                </Button>
            </div>
        </div>
    )
}

export default InfoSetting
