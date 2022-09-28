import {React, useState, useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

import Loading from './Loading'
import Toast from './Toast'

const Notify = () => {
    const { alert } = useSelector(state => state)
    const dispatch = useDispatch()
    const [ isAlertVisible, setIsAlertVisible ] = useState(false)

    useEffect(() => {
        let timer = setTimeout(() => setIsAlertVisible(true), 0)
        timer = setTimeout(() => setIsAlertVisible(false), 1000);
        return () => clearTimeout(timer);
    }, [alert]);

    return (
        <div>
            {alert.loading && <Loading />}

            {
                alert.error && isAlertVisible &&
                <Toast msg={{title: 'Error', body: alert.error}}
                handleShow={() => dispatch({type: GLOBALTYPES.ALERT, payload: {}})} 
                bgColor="bg-danger" />
            }

            {
                alert.success && isAlertVisible &&
                <Toast msg={{title: 'Success', body: alert.success}} 
                handleShow={() => dispatch({type: GLOBALTYPES.ALERT, payload: {}})}
                bgColor="bg-success" />
            }
        </div>
    )
}

export default Notify
