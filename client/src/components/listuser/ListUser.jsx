import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApiBase, host } from '../../api/api.base';
import { TRUE } from '../../contants/notify/status.notify';
import { ERROR, WARNING } from '../../contants/notify/type.notify';
import useNotifyFunc from '../../hooks/notify.func';
import './index.css'
import SettingsIcon from '@mui/icons-material/Settings';
import { setDialogEdit } from '../../redux/features/show.slice';
import { setId } from '../../redux/features/id.slice';
import DialogEdit from '../dialoguser/DialogEdit';
import { Pagination, Stack } from '@mui/material';
function ListUser(props) {

    const open = useSelector(state => state.show.dialogEdit) ;
    const dispatch = useDispatch()
    const [notifyFunc] = useNotifyFunc() 
    const [listUser , setListUser] = useState()
    const [searchKey , setSearchKey] = useState() 
    const [filter , setFilter] = useState()
    const [page , setPage] = useState(1)
    const [totalPage , setTotalPage] = useState(1)
    const [reRender , setReRender] = useState()
    const refSearch = useRef(null)

    const setTing = () =>{
        dispatch(setDialogEdit(true))
    }
    const handleSelectId = (id)=>{
        dispatch(setId(id))
    }
    const handleRerender = () =>{
        setReRender(Date.now())
    }
    const handChangeSearchKey = (e) =>{
        setFilter(undefined)
        if(!searchKey)
        setPage(1)

        let value = e.target.value ;

        if(refSearch.current)
        clearTimeout(refSearch.current)

        refSearch.current = setTimeout(() =>{

            if(searchKey != ''){

                setSearchKey(value)

            }else{

                setSearchKey('')

            }
        },1000)



    }

    const handleChangePage = (e , page)=>{
        setPage(page)
    }
    const handleChangeFilter = (e) =>{
        setSearchKey(undefined) 
        setPage(1)
        setFilter(e.target.value)
    }

    useEffect(() =>{
    let urlGetListUser = `/users/${page}` ;
    
    if(searchKey !== undefined && searchKey !== '')
    urlGetListUser += `?search=${searchKey}`

    if(filter !== undefined)
    urlGetListUser += `?isActive=${filter}`


    ApiBase.get(urlGetListUser)
        .then(res =>{
            if(res.status === 200){
                setListUser(res.data.listUser)
                setTotalPage(Math.ceil(res.data.total / 8))
            }
        })
        .catch(e =>{
            if(e){
            notifyFunc(ERROR , e.response.data.message , TRUE)
            }
        })

    },[reRender , searchKey ,page , filter])


    return (
        <div className='table-user'>
            <p className='header-list-user'>Qu???n l?? t??i kho???n</p>
            <div className="header-page" >

            <input id='search' type="text" name='search' placeholder='T??m t??i kho???n ho???c t??n ng?????i d??ng ...' onChange={handChangeSearchKey}/>
            <select id='select-filter' onChange={handleChangeFilter} name="filter">
                <option selected={searchKey && searchKey ? true : false}>Tr???ng th??i</option>
                <option value="true">Ho???t ?????ng</option>
                <option value="false">Ng???ng</option>
            </select>
            </div>
            <table className='list-user'>
                <thead>
                <th>H??? v?? t??n</th>
                <th>Email</th>
                <th>?????a ch???</th>
                <th>Ch???c v???</th>
                <th>Avatar</th>
                <th>Tr???ng th??i</th>
                <th>T??y ch???nh</th>
                </thead>
                <tbody>
                    {listUser && listUser.length >0 ? 
                    
                    listUser.map((e , index) =>{
                        return <tr className='tr-list-user' key={e.id} 
                            style={{
                                backgroundColor : e && e.isActive ? '' : "#374151",
                                color : e && e.isActive ? '' : "white"
                            }}
                         >
                            <td>{e && e.name}</td>
                            <td>{e && e.email}</td>
                            <td>{e && e.address}</td>
                            <td>{e && e.role}</td>
                            <td className='align-center'><img className='user-list-avatar' src={e &&host + e.background} alt="" /></td>
                            <td>{e && e.isActive == true ? "Ho???t ?????ng" : 'D???ng'}</td>
                            <td className='align-center cursor-pointer'><SettingsIcon color="secondary" onClick={() => {handleSelectId(e.id) ; setTing()}} sx={{fontSize : '30px'}}/></td>
                        </tr>
                    })
                    : ''}
                </tbody>
            </table>
            {open && open ? <DialogEdit handleReRender={handleRerender}/> : ''}
            
            <div className="pagani-page">
            <Stack spacing={2}>
                <Pagination count={totalPage && totalPage} variant="outlined" color="primary" onChange={handleChangePage} />
            </Stack> 
            </div>
        </div>
    );
}

export default ListUser;