import { useContext } from 'react'
import { DataContext } from '../store/GlobalState'
import Loading from './Loading'
import Toast from './Toast'


const Notify = () => {
    const { state, dispatch } = useContext(DataContext)
    const { notify } = state
  return (
    <>
        {notify.loading && <Loading />}
        {notify.error && <Toast msg={{ msg: notify.error, type: 'error', color: 'red' }} handleShow={ ()=> dispatch({ type: 'NOTIFY', payload: {} }) } />}
        {notify.success && <Toast  msg={{ msg: notify.success, type: 'success', color: 'green'}} handleShow={ ()=> dispatch({ type: 'NOTIFY', payload: {} }) } />}
    </>    
  )
}

export default Notify
