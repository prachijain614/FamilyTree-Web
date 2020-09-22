import React, { useState, useEffect } from 'react'
import FTButton from '../../Components/FTButton';
import FTModal from '../../Components/FTModal';
import WebService from '../../utils/webService';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getFamily } from '../../redux/Family/action';

const FamilyListing = props => {
    let { families } = props
    let [show, showModal] = useState(false)

    useEffect(() => {
       getFamilyList()
    }, [])

    const getFamilyList = async (family) => {
        try {
            props.getFamily([], true)
            let action = WebService.WebRequest.API.getFamily
            let response = await WebService.get(action)
            if (response.status) {
                props.getFamily(response.data, true)
            } else {
                props.getFamily([], false)
            }
        } catch (error) {
            props.getFamily([], false)
        }
    }

    const deleteFamily = async (family) => {
        try {
            //  props.getFamily([], true)
            let action = WebService.WebRequest.API.deleteFamily
            let param = {
                _id: family._id
            }
            let response = await WebService.put(action, param)
            if (response.status) {
                alert(response.msg)
                getFamilyList()
            } else {
                alert(response.msg)
                // props.getFamily([], false)
            }
        } catch (error) {
            //props.getFamily([], false)
        }
    }

    const onCellPress = (family) => {
        props.history.push('/familyTree', { familyId: family._id })
    }

    return (
        <div>
            <FTButton title="Add Family" onClick={() => showModal(true)} />
            <FTModal formName="AddFamily" headerTitle={"Add Family"} show={show} onHide={() => showModal(false)} />
            {
                families.map((family) => {
                    return <div style={{
                        margin: 20,
                        width: '100%',
                        float: 'left',
                        flexDirection: 'row',
                        display: 'flex',

                    }} onClick={(e) => {
                        e.stopPropagation()
                        onCellPress(family)
                    }}>
                        <p style={{ margin: 10 }} >{family.familyId}</p>
                        <p style={{ margin: 10 }}>{family.familyName}</p>
                        <p style={{ margin: 10 }}>{family.members}</p>
                        <FTButton title="Delete" onClick={(e) => {
                            e.stopPropagation()
                            deleteFamily(family)
                        }} />
                    </div>
                })
            }
        </div>

    )
}

FamilyListing.defaultProps = {
}


const mapStateToProps = state => ({
    families: state.familyReducer.data,
    loading: state.familyReducer.loading
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getFamily: getFamily
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FamilyListing);
