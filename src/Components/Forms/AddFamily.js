import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import FTButton from '../FTButton';
import WebService from '../../utils/webService';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {getFamily} from '../../redux/Family/action';

let AddFamilyForm = {
    familyName: {
        name: "familyName",
        validate: {
            required: {
                value: true,
                message: "Family name is required"
            },
        }
    },
    familyHead: {
        name: "familyHead",
        validate: {
            required: {
                value: true,
                message: "familyHead is required"
            }
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

const AddFamily = props => {
    let { handleSubmit, register, errors,reset } = useForm({
        mode: "onChange",
        defaultValues: { familyName: "", familyHead: "", gender: "" },
        criteriaMode: "all"
    });

    let familyName = AddFamilyForm.familyName;
    let familyHead = AddFamilyForm.familyHead;
    let gender = AddFamilyForm.gender;

    const onSubmit =async (values) => {
        try {
            let action = WebService.WebRequest.API.addFamily
            let param = {
                familyName: values.familyName,
                familyHead: values.familyHead,
                gender: values.gender,
            }
            let response = await WebService.post(action,param)
            if (response.status) {
                  reset()
                  props.families.push(response.data)
                  props.getFamily(props.families, false)
                  props.onHide()
            } else {
            }
        } catch (error) {
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Family Name</label>
            <input name={familyName.name} ref={register(familyName.validate)} />
            {errors[familyName.name] && <p>{errors[familyName.name].message}</p>}
            <label>Family Head</label>
            <input name={familyHead.name} ref={register(familyHead.validate)} />
            {errors[familyHead.name] && <p>{errors[familyHead.name].message}</p>}
            <label>Gender</label>
            <input name={gender.name} ref={register(gender.validate)} />
            {errors[gender.name] && <p>{errors[gender.name].message}</p>}
            <FTButton title="Add" />
        </form>

    )
}

AddFamily.defaultProps = {
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
)(AddFamily );

