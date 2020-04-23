import React from 'react'
import propTypes from 'prop-types'
import {connect} from 'react-redux'

const Alert = ({alerts}) => alerts!== null && alerts.length > 0 && alerts.map(alert => (
    <div key = {alert.id} className={` text-center alert p-0 d-inline text-light bg-${alert.alertType}`}>
       <small>{alert.msg}</small> 
    </div>
))

Alert.propTypes = {
    
}

const mapStateToProps = state =>({
    alerts: state.alert
})
export default connect(mapStateToProps)(Alert);
