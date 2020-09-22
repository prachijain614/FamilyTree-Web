import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import FTButton from '../FTButton';
import WebService from '../../utils/webService';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {getFamily} from '../../redux/Family/action';

let AddMemberForm = {
    memberName: {
        name: "memberName",
        validate: {
            required: {
                value: true,
                message: "Member name is required"
            },
        }
    },
    gender: {
        name: "gender",
        validate: {
            required: {
                value: true,
                message: "Gender is required"
            }
        }
    }
};

const AddMember = props => {
    let { handleSubmit, register, errors,reset } = useForm({
        mode: "onChange",
        defaultValues: { memberName: "",  gender: "" },
        criteriaMode: "all"
    });

    let memberName = AddMemberForm.memberName;
    let gender = AddMemberForm.gender;

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <label>Family Member Name</label>
            <input name={memberName.name} ref={register(memberName.validate)} />
            {errors[memberName.name] && <p>{errors[memberName.name].message}</p>}
            <label>Gender</label>
            <input name={gender.name} ref={register(gender.validate)} />
            {errors[gender.name] && <p>{errors[gender.name].message}</p>}
            <FTButton title="Add Member" />
        </form>

    )
}

AddMember.defaultProps = {
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
)(AddMember );

