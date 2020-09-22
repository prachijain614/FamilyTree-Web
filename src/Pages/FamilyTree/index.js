import React, { useState, useEffect } from 'react'
import Tree from '@naisutech/react-tree'

import FTButton from '../../Components/FTButton';
import FTModal from '../../Components/FTModal';
import WebService from '../../utils/webService';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getMember } from '../../redux/Family/action';

const FamilyTree = props => {
    let { members } = props
    let [show, showModal] = useState(false)
    let [parent, setParent] = useState(false)

    useEffect(() => {
        getMemberList()
    }, [])

    const getMemberList = async () => {
        try {
            props.getMember([], true)
            let action = WebService.WebRequest.API.getMember
            let param = {
                familyId: props.history.location.state.familyId || undefined
            }
            let response = await WebService.post(action, param)
            if (response.status) {
                props.getMember(response.data, true)
            } else {
                props.getMember([], false)
            }
        } catch (error) {
            props.getMember([], false)
        }
    }

    const addMember = async (values) => {
        if (values.memberName && values.gender) {
            try {
                let action = WebService.WebRequest.API.addMember
                let param = {
                    memberName: values.memberName,
                    gender: values.gender,
                    parentId: parent,
                    familyId: props.history.location.state.familyId || undefined
                }
                let response = await WebService.post(action, param)
                if (response.status) {
                    alert(response.msg)
                    getMemberList()
                    showModal(false)
                } else {
                    alert(response.msg)
                }
            } catch (error) {
            }
        }
    }

    const onSelect = (member) => {
        setParent(member.id)
        showModal(true)
    }
//
    return (
        <div>
            <FTModal
                formName="AddMember"
                headerTitle={"Add Member"}
                show={show}
                onHide={() => showModal(false)}
                onSubmit={async (values) => await addMember(values)} />
            <Tree nodes={members} onSelect={(obj) => onSelect(obj)} />

        </div>

    )
}

FamilyTree.defaultProps = {
}


const mapStateToProps = state => ({
    members: state.familyReducer.data,
    loading: state.familyReducer.loading
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getMember: getMember
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FamilyTree);
